"use client";

import { useState, useEffect, useCallback } from "react";
import { bmsApi } from "@/services/bms-api";
import { useAuth } from "@/providers";
import type { UserResponse } from "@/types/bms";

interface UseCurrentUserResult {
  user: UserResponse | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCurrentUser(): UseCurrentUserResult {
  const { user: authUser, isAuthenticated, isLoading: authLoading } = useAuth();
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    if (!isAuthenticated || !authUser?.userId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const userData = await bmsApi.users.getById(authUser.userId);
      setUser(userData);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch user";
      setError(message);
      console.error("Error fetching current user:", err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, authUser?.userId]);

  useEffect(() => {
    if (!authLoading) {
      fetchUser();
    }
  }, [authLoading, fetchUser]);

  return { user, isLoading: isLoading || authLoading, error, refetch: fetchUser };
}
