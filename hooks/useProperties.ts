"use client";

import { useState, useEffect, useCallback } from "react";
import { bmsApi } from "@/services/bms-api";
import { useAuth } from "@/providers";
import type { PropertyDto } from "@/types/bms";

interface UsePropertiesResult {
  properties: PropertyDto[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProperties(): UsePropertiesResult {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [properties, setProperties] = useState<PropertyDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = useCallback(async () => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await bmsApi.properties.getAll();
      console.log('[Properties] API response:', response);
      setProperties(response.data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch properties";
      setError(message);
      console.error("Error fetching properties:", err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!authLoading) {
      fetchProperties();
    }
  }, [authLoading, fetchProperties]);

  return { properties, isLoading: isLoading || authLoading, error, refetch: fetchProperties };
}
