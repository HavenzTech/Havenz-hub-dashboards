"use client";

import { useState, useEffect, useCallback } from "react";
import { bmsApi } from "@/services/bms-api";
import { useAuth } from "@/providers";
import type { CompanyDto } from "@/types/bms";

// UI-friendly company type with computed fields
export interface CompanyWithDetails extends CompanyDto {
  employeeCount?: number;
  location: string; // Combined location string
}

interface UseCompanyResult {
  company: CompanyWithDetails | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Helper to format location from separate fields
function formatLocation(company: CompanyDto): string {
  const parts = [company.locationCity, company.locationProvince].filter(Boolean);
  return parts.join(", ") || "Unknown";
}

export function useCompany(id: string | null): UseCompanyResult {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [company, setCompany] = useState<CompanyWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompany = useCallback(async () => {
    // Don't fetch if not authenticated or no id
    if (!isAuthenticated || !id) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const companyData = await bmsApi.companies.getById(id);

      // Fetch staff count
      let employeeCount = 0;
      try {
        const staff = await bmsApi.companies.getStaff(id);
        employeeCount = staff?.length || 0;
      } catch {
        console.warn(`Could not fetch staff for company ${id}`);
      }

      setCompany({
        ...companyData,
        employeeCount,
        location: formatLocation(companyData),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch company";
      setError(message);
      console.error("Error fetching company:", err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, id]);

  useEffect(() => {
    // Wait for auth to complete before fetching
    if (!authLoading) {
      fetchCompany();
    }
  }, [authLoading, fetchCompany]);

  return { company, isLoading: isLoading || authLoading, error, refetch: fetchCompany };
}
