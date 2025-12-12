"use client";

import { useState, useEffect, useCallback } from "react";
import { bmsApi } from "@/services/bms-api";
import { useAuth } from "@/providers";
import type { DepartmentDto } from "@/types/bms";

interface UseDepartmentsResult {
  departments: DepartmentDto[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useDepartments(): UseDepartmentsResult {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [departments, setDepartments] = useState<DepartmentDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDepartments = useCallback(async () => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await bmsApi.departments.getAll();
      console.log('[Departments] API response:', response);
      console.log('[Departments] First department:', response.data?.[0]);
      setDepartments(response.data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch departments";
      setError(message);
      console.error("Error fetching departments:", err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!authLoading) {
      fetchDepartments();
    }
  }, [authLoading, fetchDepartments]);

  return { departments, isLoading: isLoading || authLoading, error, refetch: fetchDepartments };
}
