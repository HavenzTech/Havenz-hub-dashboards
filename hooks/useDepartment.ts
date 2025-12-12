"use client";

import { useState, useEffect, useCallback } from "react";
import { bmsApi } from "@/services/bms-api";
import { useAuth } from "@/providers";
import type { DepartmentDto, DepartmentMemberDto } from "@/types/bms";

interface DepartmentWithMembers extends DepartmentDto {
  members: DepartmentMemberDto[];
}

interface UseDepartmentResult {
  department: DepartmentWithMembers | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useDepartment(id: string | null): UseDepartmentResult {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [department, setDepartment] = useState<DepartmentWithMembers | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDepartment = useCallback(async () => {
    if (!isAuthenticated || !id) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Fetch department and members in parallel
      const [deptData, membersData] = await Promise.all([
        bmsApi.departments.getById(id),
        bmsApi.departments.getMembers(id).catch(() => [] as DepartmentMemberDto[]),
      ]);

      console.log('[Department] API response:', deptData);
      console.log('[Department] budgetUtilizationPercentage:', deptData.budgetUtilizationPercentage, 'type:', typeof deptData.budgetUtilizationPercentage);
      setDepartment({
        ...deptData,
        members: membersData || [],
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch department";
      setError(message);
      console.error("Error fetching department:", err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, id]);

  useEffect(() => {
    if (!authLoading) {
      fetchDepartment();
    }
  }, [authLoading, fetchDepartment]);

  return { department, isLoading: isLoading || authLoading, error, refetch: fetchDepartment };
}
