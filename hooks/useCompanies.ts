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

interface UseCompaniesResult {
  companies: CompanyWithDetails[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Helper to format location from separate fields
function formatLocation(company: CompanyDto): string {
  const parts = [company.locationCity, company.locationProvince].filter(Boolean);
  return parts.join(", ") || "N/A";
}

export function useCompanies(): UseCompaniesResult {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [companies, setCompanies] = useState<CompanyWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanies = useCallback(async () => {
    // Don't fetch if not authenticated
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await bmsApi.companies.getAll();
      const companiesData = response.data || [];

      // Fetch staff count for each company in parallel
      const companiesWithDetails = await Promise.all(
        companiesData.map(async (company): Promise<CompanyWithDetails> => {
          let employeeCount = 0;

          if (company.id) {
            try {
              const staff = await bmsApi.companies.getStaff(company.id);
              employeeCount = staff?.length || 0;
            } catch {
              // Silently handle staff fetch errors
              console.warn(`Could not fetch staff for company ${company.id}`);
            }
          }

          return {
            ...company,
            employeeCount,
            location: formatLocation(company),
          };
        })
      );

      setCompanies(companiesWithDetails);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch companies";
      setError(message);
      console.error("Error fetching companies:", err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Wait for auth to complete before fetching
    if (!authLoading) {
      fetchCompanies();
    }
  }, [authLoading, fetchCompanies]);

  return { companies, isLoading: isLoading || authLoading, error, refetch: fetchCompanies };
}
