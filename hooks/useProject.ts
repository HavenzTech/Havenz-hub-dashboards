"use client";

import { useState, useEffect, useCallback } from "react";
import { bmsApi } from "@/services/bms-api";
import { useAuth } from "@/providers";
import type { ProjectDto, ProjectMemberDto, ProjectDepartmentDto, TaskDto } from "@/types/bms";

interface ProjectWithDetails extends ProjectDto {
  members: ProjectMemberDto[];
  departments: ProjectDepartmentDto[];
  myTasks: TaskDto[];
}

interface UseProjectResult {
  project: ProjectWithDetails | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProject(id: string | null): UseProjectResult {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [project, setProject] = useState<ProjectWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = useCallback(async () => {
    if (!isAuthenticated || !id) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Fetch project, members, departments, and user's tasks in parallel
      const [projectData, membersData, departmentsData, myTasksData] = await Promise.all([
        bmsApi.projects.getById(id),
        bmsApi.projects.getMembers(id).catch(() => [] as ProjectMemberDto[]),
        bmsApi.projects.getDepartments(id).catch(() => [] as ProjectDepartmentDto[]),
        bmsApi.tasks.getMyTasks().catch(() => [] as TaskDto[]),
      ]);

      // Filter tasks to only show those belonging to this project
      const projectTasks = (myTasksData || []).filter(task => task.projectId === id);

      setProject({
        ...projectData,
        members: membersData || [],
        departments: departmentsData || [],
        myTasks: projectTasks,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch project";
      setError(message);
      console.error("Error fetching project:", err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, id]);

  useEffect(() => {
    if (!authLoading) {
      fetchProject();
    }
  }, [authLoading, fetchProject]);

  return { project, isLoading: isLoading || authLoading, error, refetch: fetchProject };
}
