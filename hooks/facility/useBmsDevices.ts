"use client";

import { useCallback } from "react";
import { bmsApi } from "@/services/bms-api";
import type { BmsDeviceDto } from "@/types/bms";
import { usePollingData } from "./usePollingData";
import { DEFAULT_REFRESH_INTERVAL } from "@/lib/facility/constants";

interface UseBmsDevicesResult {
  devices: BmsDeviceDto[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Fetches BMS devices for a specific property.
 */
export function useBmsDevicesByProperty(
  propertyId: string | null,
  intervalMs: number = DEFAULT_REFRESH_INTERVAL
): UseBmsDevicesResult {
  const fetchFn = useCallback(async () => {
    if (!propertyId) return [];
    return bmsApi.bmsDevices.getByProperty(propertyId);
  }, [propertyId]);

  const { data, isLoading, error, refetch } = usePollingData(
    fetchFn,
    intervalMs,
    [propertyId],
    !!propertyId
  );

  return {
    devices: data || [],
    isLoading,
    error,
    refetch,
  };
}

/**
 * Fetches BMS devices filtered by type (camera, sensor, access-control, etc.).
 */
export function useBmsDevicesByType(
  type: string | null,
  intervalMs: number = DEFAULT_REFRESH_INTERVAL
): UseBmsDevicesResult {
  const fetchFn = useCallback(async () => {
    if (!type) return [];
    return bmsApi.bmsDevices.getByType(type);
  }, [type]);

  const { data, isLoading, error, refetch } = usePollingData(
    fetchFn,
    intervalMs,
    [type],
    !!type
  );

  return {
    devices: data || [],
    isLoading,
    error,
    refetch,
  };
}

/**
 * Fetches BMS devices filtered by status (online, offline, maintenance, error).
 */
export function useBmsDevicesByStatus(
  status: string | null,
  intervalMs: number = DEFAULT_REFRESH_INTERVAL
): UseBmsDevicesResult {
  const fetchFn = useCallback(async () => {
    if (!status) return [];
    return bmsApi.bmsDevices.getByStatus(status);
  }, [status]);

  const { data, isLoading, error, refetch } = usePollingData(
    fetchFn,
    intervalMs,
    [status],
    !!status
  );

  return {
    devices: data || [],
    isLoading,
    error,
    refetch,
  };
}

/**
 * Fetches BMS devices that require maintenance.
 */
export function useBmsDevicesMaintenanceRequired(
  intervalMs: number = DEFAULT_REFRESH_INTERVAL
): UseBmsDevicesResult {
  const fetchFn = useCallback(async () => {
    return bmsApi.bmsDevices.getMaintenanceRequired();
  }, []);

  const { data, isLoading, error, refetch } = usePollingData(fetchFn, intervalMs);

  return {
    devices: data || [],
    isLoading,
    error,
    refetch,
  };
}
