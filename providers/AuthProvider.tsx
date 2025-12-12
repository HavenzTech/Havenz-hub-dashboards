'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { bmsApi } from '@/services/bms-api';
import type { LoginResponse } from '@/types/bms';

interface AuthContextType {
  user: LoginResponse | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    console.log('[Auth] Starting login...');
    console.log('[Auth] Email:', email);
    console.log('[Auth] API URL:', process.env.NEXT_PUBLIC_API_URL);
    setIsLoading(true);
    setError(null);
    try {
      console.log('[Auth] Calling bmsApi.auth.login...');
      const response = await bmsApi.auth.login({ email, password });
      console.log('[Auth] Login response:', response);
      if (response.token) {
        bmsApi.setToken(response.token);
        // Set first company as default if available
        if (response.companies && response.companies.length > 0) {
          bmsApi.setCompanyId(response.companies[0].companyId!);
        }
        setUser(response);
        // Store in localStorage for persistence
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('auth_user', JSON.stringify(response));
      }
    } catch (err: unknown) {
      // Log full error details for debugging
      console.error('[Auth] Login error details:', {
        error: err,
        status: (err as { status?: number })?.status,
        details: (err as { details?: unknown })?.details,
      });
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    bmsApi.clearToken();
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  };

  // Auto-login on mount
  useEffect(() => {
    const initAuth = async () => {
      // First, check localStorage for existing session
      const storedToken = localStorage.getItem('auth_token');
      const storedUser = localStorage.getItem('auth_user');

      if (storedToken && storedUser) {
        try {
          const userData = JSON.parse(storedUser) as LoginResponse;
          bmsApi.setToken(storedToken);
          if (userData.companies && userData.companies.length > 0) {
            bmsApi.setCompanyId(userData.companies[0].companyId!);
          }

          // Validate token by making a test API call
          try {
            await bmsApi.companies.getAll({ pageSize: 1 });
            // Token is valid
            setUser(userData);
            setIsLoading(false);
            console.log('[Auth] Restored session from localStorage');
            return;
          } catch (validationError) {
            // Token is invalid/expired, clear it and re-login
            console.log('[Auth] Stored token expired, will re-login');
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            bmsApi.clearToken();
          }
        } catch {
          // Invalid stored data, clear it
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
        }
      }

      // Auto-login with dev credentials if available
      const devEmail = process.env.NEXT_PUBLIC_DEV_USER_EMAIL;
      const devPassword = process.env.NEXT_PUBLIC_DEV_USER_PASSWORD;

      if (devEmail && devPassword) {
        try {
          console.log('[Auth] Auto-login with dev credentials...');
          await login(devEmail, devPassword);
          console.log('[Auth] Auto-login successful');
        } catch (err) {
          console.error('[Auth] Auto-login failed:', err);
          setError('Auto-login failed. Check your dev credentials.');
        }
      } else {
        console.log('[Auth] No dev credentials found, skipping auto-login');
      }

      setIsLoading(false);
    };

    initAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
