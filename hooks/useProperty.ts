"use client";

import { useState, useEffect, useCallback } from "react";
import { bmsApi } from "@/services/bms-api";
import { useAuth } from "@/providers";
import type { PropertyDto } from "@/types/bms";

interface UsePropertyResult {
  property: PropertyDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProperty(id: string | null): UsePropertyResult {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [property, setProperty] = useState<PropertyDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperty = useCallback(async () => {
    if (!isAuthenticated || !id) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await bmsApi.properties.getById(id);
      setProperty(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch property";
      setError(message);
      console.error("Error fetching property:", err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, id]);

  useEffect(() => {
    if (!authLoading) {
      fetchProperty();
    }
  }, [authLoading, fetchProperty]);

  return { property, isLoading: isLoading || authLoading, error, refetch: fetchProperty };
}
