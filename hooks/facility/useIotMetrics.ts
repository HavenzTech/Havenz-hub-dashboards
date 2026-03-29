"use client";

import { useCallback } from "react";
import { bmsApi } from "@/services/bms-api";
import type { IotMetricDto } from "@/types/bms";
import { usePollingData } from "./usePollingData";
import { DEFAULT_REFRESH_INTERVAL } from "@/lib/facility/constants";

interface UseIotMetricsResult {
  metrics: IotMetricDto[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Fetches IoT metrics for a property.
 */
export function useIotMetricsByProperty(
  propertyId: string | null,
  intervalMs: number = DEFAULT_REFRESH_INTERVAL
): UseIotMetricsResult {
  const fetchFn = useCallback(async () => {
    if (!propertyId) return [];
    return bmsApi.iotMetrics.getByProperty(propertyId);
  }, [propertyId]);

  const { data, isLoading, error, refetch } = usePollingData(
    fetchFn,
    intervalMs,
    [propertyId],
    !!propertyId
  );

  return {
    metrics: data || [],
    isLoading,
    error,
    refetch,
  };
}

/**
 * Fetches IoT metrics filtered by type (temperature, humidity, etc.).
 */
export function useIotMetricsByType(
  metricType: string | null,
  intervalMs: number = DEFAULT_REFRESH_INTERVAL
): UseIotMetricsResult {
  const fetchFn = useCallback(async () => {
    if (!metricType) return [];
    return bmsApi.iotMetrics.getByType(metricType);
  }, [metricType]);

  const { data, isLoading, error, refetch } = usePollingData(
    fetchFn,
    intervalMs,
    [metricType],
    !!metricType
  );

  return {
    metrics: data || [],
    isLoading,
    error,
    refetch,
  };
}

/**
 * Fetches all IoT metrics that have triggered alerts.
 */
export function useIotMetricAlerts(
  intervalMs: number = DEFAULT_REFRESH_INTERVAL
): UseIotMetricsResult {
  const fetchFn = useCallback(async () => {
    return bmsApi.iotMetrics.getAlerts();
  }, []);

  const { data, isLoading, error, refetch } = usePollingData(fetchFn, intervalMs);

  return {
    metrics: data || [],
    isLoading,
    error,
    refetch,
  };
}

/**
 * Fetches IoT metrics filtered by alert severity.
 */
export function useIotMetricsBySeverity(
  severity: string | null,
  intervalMs: number = DEFAULT_REFRESH_INTERVAL
): UseIotMetricsResult {
  const fetchFn = useCallback(async () => {
    if (!severity) return [];
    return bmsApi.iotMetrics.getBySeverity(severity);
  }, [severity]);

  const { data, isLoading, error, refetch } = usePollingData(
    fetchFn,
    intervalMs,
    [severity],
    !!severity
  );

  return {
    metrics: data || [],
    isLoading,
    error,
    refetch,
  };
}
