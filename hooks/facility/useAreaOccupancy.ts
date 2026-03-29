"use client";

import { useCallback } from "react";
import { bmsApi } from "@/services/bms-api";
import type { AreaDto } from "@/services/bms-api";
import { usePollingData } from "./usePollingData";
import { DEFAULT_REFRESH_INTERVAL } from "@/lib/facility/constants";

interface AreaOccupancyData {
  areas: AreaDto[];
  totalCapacity: number;
  totalOccupancy: number;
  occupancyPercentage: number;
}

interface UseAreaOccupancyResult {
  data: AreaOccupancyData;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Fetches area occupancy data for a property.
 * Aggregates current occupancy vs capacity across all areas.
 */
export function useAreaOccupancy(
  propertyId: string | null,
  intervalMs: number = DEFAULT_REFRESH_INTERVAL
): UseAreaOccupancyResult {
  const fetchFn = useCallback(async (): Promise<AreaOccupancyData> => {
    if (!propertyId) {
      return { areas: [], totalCapacity: 0, totalOccupancy: 0, occupancyPercentage: 0 };
    }

    const areas = await bmsApi.properties.getAreas(propertyId);

    const totalCapacity = areas.reduce((sum, a) => sum + (a.occupancyCapacity || 0), 0);
    const totalOccupancy = areas.reduce((sum, a) => sum + (a.currentOccupancy || 0), 0);
    const occupancyPercentage = totalCapacity > 0
      ? Math.round((totalOccupancy / totalCapacity) * 100)
      : 0;

    return {
      areas,
      totalCapacity,
      totalOccupancy,
      occupancyPercentage,
    };
  }, [propertyId]);

  const { data, isLoading, error, refetch } = usePollingData(
    fetchFn,
    intervalMs,
    [propertyId],
    !!propertyId
  );

  return {
    data: data || { areas: [], totalCapacity: 0, totalOccupancy: 0, occupancyPercentage: 0 },
    isLoading,
    error,
    refetch,
  };
}
