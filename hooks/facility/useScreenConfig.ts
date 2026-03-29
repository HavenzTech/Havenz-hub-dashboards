"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/providers";
import { facilityApi } from "@/lib/facility/api";
import type { ScreenConfig } from "@/types/facility";
import { CONFIG_POLL_INTERVAL } from "@/lib/facility/constants";

interface UseScreenConfigResult {
  config: ScreenConfig | null;
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
}

/**
 * Polls the backend for this screen's configuration.
 * Detects changes via `updatedAt` to avoid unnecessary re-renders.
 */
export function useScreenConfig(screenId: string): UseScreenConfigResult {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [config, setConfig] = useState<ScreenConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const lastUpdatedAtRef = useRef<string | null>(null);

  const fetchConfig = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const response = await facilityApi.getScreenConfig(screenId);

      // Only update state if config actually changed
      if (response.updatedAt !== lastUpdatedAtRef.current) {
        lastUpdatedAtRef.current = response.updatedAt;
        setConfig(response);
      }

      setError(null);
      setIsConnected(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch screen config";
      setError(message);
      setIsConnected(false);
      console.error(`[Screen ${screenId}] Config fetch error:`, err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, screenId]);

  // Initial fetch
  useEffect(() => {
    if (!authLoading) {
      fetchConfig();
    }
  }, [authLoading, fetchConfig]);

  // Polling
  useEffect(() => {
    if (!isAuthenticated || authLoading) return;

    const interval = setInterval(fetchConfig, CONFIG_POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [isAuthenticated, authLoading, fetchConfig]);

  return {
    config,
    isLoading: isLoading || authLoading,
    error,
    isConnected,
  };
}
