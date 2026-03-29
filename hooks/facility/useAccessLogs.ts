"use client";

import { useCallback } from "react";
import { bmsApi } from "@/services/bms-api";
import type { AccessLogDto } from "@/types/bms";
import { usePollingData } from "./usePollingData";
import { DEFAULT_REFRESH_INTERVAL } from "@/lib/facility/constants";

interface UseAccessLogsResult {
  logs: AccessLogDto[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Fetches access logs for a property.
 */
export function useAccessLogs(
  propertyId: string | null,
  intervalMs: number = DEFAULT_REFRESH_INTERVAL
): UseAccessLogsResult {
  const fetchFn = useCallback(async () => {
    if (!propertyId) return [];
    return bmsApi.accessLogs.getByProperty(propertyId);
  }, [propertyId]);

  const { data, isLoading, error, refetch } = usePollingData(
    fetchFn,
    intervalMs,
    [propertyId],
    !!propertyId
  );

  return {
    logs: data || [],
    isLoading,
    error,
    refetch,
  };
}

/**
 * Fetches anomalous access events across the facility.
 */
export function useAnomalousAccessLogs(
  intervalMs: number = DEFAULT_REFRESH_INTERVAL
): UseAccessLogsResult {
  const fetchFn = useCallback(async () => {
    return bmsApi.accessLogs.getAnomalous();
  }, []);

  const { data, isLoading, error, refetch } = usePollingData(fetchFn, intervalMs);

  return {
    logs: data || [],
    isLoading,
    error,
    refetch,
  };
}

/**
 * Fetches denied access events across the facility.
 */
export function useDeniedAccessLogs(
  intervalMs: number = DEFAULT_REFRESH_INTERVAL
): UseAccessLogsResult {
  const fetchFn = useCallback(async () => {
    return bmsApi.accessLogs.getDenied();
  }, []);

  const { data, isLoading, error, refetch } = usePollingData(fetchFn, intervalMs);

  return {
    logs: data || [],
    isLoading,
    error,
    refetch,
  };
}
