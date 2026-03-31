"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/providers";

interface UsePollingDataResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  lastUpdated: Date | null;
}

/**
 * Generic auto-polling hook for facility data.
 * Wraps any async fetch function with interval-based polling and auth guard.
 *
 * @param fetchFn - Async function that returns data
 * @param intervalMs - Polling interval in milliseconds (0 = no polling, fetch once)
 * @param deps - Additional dependencies that trigger a refetch when changed
 * @param enabled - Whether polling is active (default true)
 */
export function usePollingData<T>(
  fetchFn: () => Promise<T>,
  intervalMs: number,
  deps: unknown[] = [],
  enabled: boolean = true
): UsePollingDataResult<T> {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const mountedRef = useRef(true);

  const doFetch = useCallback(async () => {
    if (!isAuthenticated || !enabled) {
      setIsLoading(false);
      return;
    }

    try {
      const result = await fetchFn();
      if (mountedRef.current) {
        setData(result);
        setError(null);
        setLastUpdated(new Date());
      }
    } catch (err) {
      if (mountedRef.current) {
        const message = err instanceof Error ? err.message : "Failed to fetch data";
        setError(message);
        console.error("[usePollingData] Fetch error:", err);
      }
    } finally {
      if (mountedRef.current) {
        setIsLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, enabled, ...deps]);

  // Track mounted state
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Initial fetch
  useEffect(() => {
    if (!authLoading) {
      doFetch();
    }
  }, [authLoading, doFetch]);

  // Polling
  useEffect(() => {
    if (!isAuthenticated || authLoading || !enabled || intervalMs <= 0) return;

    const interval = setInterval(doFetch, intervalMs);
    return () => clearInterval(interval);
  }, [isAuthenticated, authLoading, enabled, intervalMs, doFetch]);

  return {
    data,
    isLoading: isLoading || authLoading,
    error,
    refetch: doFetch,
    lastUpdated,
  };
}
