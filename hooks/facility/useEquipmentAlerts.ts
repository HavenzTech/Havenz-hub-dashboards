"use client";

import { useCallback } from "react";
import { bmsApi } from "@/services/bms-api";
import type { EquipmentAlertDto, AlertsResponse } from "@/services/bms-api";
import { usePollingData } from "./usePollingData";
import { DEFAULT_REFRESH_INTERVAL } from "@/lib/facility/constants";

interface UseEquipmentAlertsResult {
  alerts: EquipmentAlertDto[];
  totalCount: number;
  activeCount: number;
  acknowledgedCount: number;
  resolvedCount: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  acknowledge: (alertId: string) => Promise<void>;
  resolve: (alertId: string) => Promise<void>;
}

/**
 * Fetches alerts for a specific piece of equipment.
 * Includes actions to acknowledge and resolve alerts.
 */
export function useEquipmentAlerts(
  equipmentId: string | null,
  options?: { status?: string },
  intervalMs: number = DEFAULT_REFRESH_INTERVAL
): UseEquipmentAlertsResult {
  const fetchFn = useCallback(async (): Promise<AlertsResponse> => {
    if (!equipmentId) return { alerts: [], totalCount: 0, activeCount: 0, acknowledgedCount: 0, resolvedCount: 0 };
    return bmsApi.equipment.getAlerts(equipmentId, { status: options?.status });
  }, [equipmentId, options?.status]);

  const { data, isLoading, error, refetch } = usePollingData(
    fetchFn,
    intervalMs,
    [equipmentId, options?.status],
    !!equipmentId
  );

  const acknowledge = useCallback(async (alertId: string) => {
    await bmsApi.alerts.acknowledge(alertId);
    await refetch();
  }, [refetch]);

  const resolve = useCallback(async (alertId: string) => {
    await bmsApi.alerts.resolve(alertId);
    await refetch();
  }, [refetch]);

  return {
    alerts: data?.alerts || [],
    totalCount: data?.totalCount || 0,
    activeCount: data?.activeCount || 0,
    acknowledgedCount: data?.acknowledgedCount || 0,
    resolvedCount: data?.resolvedCount || 0,
    isLoading,
    error,
    refetch,
    acknowledge,
    resolve,
  };
}
