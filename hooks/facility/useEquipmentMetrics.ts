"use client";

import { useCallback } from "react";
import { bmsApi } from "@/services/bms-api";
import type { MetricValueDto, MetricHistoryDto } from "@/services/bms-api";
import { usePollingData } from "./usePollingData";
import { DEFAULT_REFRESH_INTERVAL } from "@/lib/facility/constants";

interface UseEquipmentMetricsResult {
  metrics: MetricValueDto[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Fetches real-time metrics for a specific piece of equipment.
 * Auto-polls at the configured interval.
 */
export function useEquipmentMetrics(
  equipmentId: string | null,
  intervalMs: number = DEFAULT_REFRESH_INTERVAL
): UseEquipmentMetricsResult {
  const fetchFn = useCallback(async () => {
    if (!equipmentId) return [];
    return bmsApi.equipment.getMetrics(equipmentId);
  }, [equipmentId]);

  const { data, isLoading, error, refetch } = usePollingData(
    fetchFn,
    intervalMs,
    [equipmentId],
    !!equipmentId
  );

  return {
    metrics: data || [],
    isLoading,
    error,
    refetch,
  };
}

interface UseEquipmentMetricHistoryResult {
  history: MetricHistoryDto[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Fetches metric history for a specific piece of equipment.
 */
export function useEquipmentMetricHistory(
  equipmentId: string | null,
  params?: { metricType?: string; startDate?: string; endDate?: string },
  intervalMs: number = DEFAULT_REFRESH_INTERVAL
): UseEquipmentMetricHistoryResult {
  const fetchFn = useCallback(async () => {
    if (!equipmentId) return [];
    return bmsApi.equipment.getMetricHistory(equipmentId, params);
  }, [equipmentId, params]);

  const { data, isLoading, error, refetch } = usePollingData(
    fetchFn,
    intervalMs,
    [equipmentId, params?.metricType, params?.startDate, params?.endDate],
    !!equipmentId
  );

  return {
    history: data || [],
    isLoading,
    error,
    refetch,
  };
}
