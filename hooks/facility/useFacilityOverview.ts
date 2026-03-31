"use client";

import { useCallback } from "react";
import { bmsApi } from "@/services/bms-api";
import type { PropertyDto, BmsDeviceDto } from "@/types/bms";
import { usePollingData } from "./usePollingData";
import { DEFAULT_REFRESH_INTERVAL } from "@/lib/facility/constants";

interface FacilityOverviewData {
  properties: PropertyDto[];
  devices: BmsDeviceDto[];
  devicesByStatus: {
    online: number;
    offline: number;
    maintenance: number;
    error: number;
  };
  totalProperties: number;
  totalDevices: number;
  maintenanceRequiredCount: number;
}

interface UseFacilityOverviewResult {
  data: FacilityOverviewData;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const EMPTY_OVERVIEW: FacilityOverviewData = {
  properties: [],
  devices: [],
  devicesByStatus: { online: 0, offline: 0, maintenance: 0, error: 0 },
  totalProperties: 0,
  totalDevices: 0,
  maintenanceRequiredCount: 0,
};

/**
 * Composite hook that aggregates facility-wide overview data.
 * Calls multiple APIs in parallel for a high-level facility summary.
 */
export function useFacilityOverview(
  intervalMs: number = DEFAULT_REFRESH_INTERVAL
): UseFacilityOverviewResult {
  const fetchFn = useCallback(async (): Promise<FacilityOverviewData> => {
    const [propertiesResult, devicesResult, maintenanceDevices] = await Promise.all([
      bmsApi.properties.getAll({ pageSize: 100 }),
      bmsApi.bmsDevices.getAll({ pageSize: 500 }),
      bmsApi.bmsDevices.getMaintenanceRequired(),
    ]);

    const properties = propertiesResult.data || [];
    const devices = devicesResult.data || [];

    const devicesByStatus = {
      online: devices.filter((d) => d.status === "online").length,
      offline: devices.filter((d) => d.status === "offline").length,
      maintenance: devices.filter((d) => d.status === "maintenance").length,
      error: devices.filter((d) => d.status === "error").length,
    };

    return {
      properties,
      devices,
      devicesByStatus,
      totalProperties: properties.length,
      totalDevices: devices.length,
      maintenanceRequiredCount: maintenanceDevices.length,
    };
  }, []);

  const { data, isLoading, error, refetch } = usePollingData(fetchFn, intervalMs);

  return {
    data: data || EMPTY_OVERVIEW,
    isLoading,
    error,
    refetch,
  };
}
