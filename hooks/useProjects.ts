"use client";

import { useState, useEffect, useCallback } from "react";
import { bmsApi } from "@/services/bms-api";
import { useAuth } from "@/providers";
import type { ProjectDto } from "@/types/bms";

interface UseProjectsResult {
  projects: ProjectDto[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProjects(): UseProjectsResult {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await bmsApi.projects.getAll();
      console.log('[Projects] API response:', response);
      setProjects(response.data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch projects";
      setError(message);
      console.error("Error fetching projects:", err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!authLoading) {
      fetchProjects();
    }
  }, [authLoading, fetchProjects]);

  return { projects, isLoading: isLoading || authLoading, error, refetch: fetchProjects };
}
