"use client";

import { useState, useEffect, useCallback } from "react";
import { departmentsService } from "@/lib/api";
import type { Department } from "@/types";

interface UseDepartmentsResult {
  departments: Department[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useDepartments(): UseDepartmentsResult {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDepartments = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await departmentsService.getAll();
      setDepartments(response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch departments";
      setError(message);
      console.error("Error fetching departments:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  return { departments, isLoading, error, refetch: fetchDepartments };
}
