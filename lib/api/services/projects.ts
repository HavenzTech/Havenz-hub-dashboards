import { api } from "../client";
import type { Project, PaginatedResponse, PaginationParams } from "@/types";

export const projectsService = {
  getAll: (params?: PaginationParams) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.pageSize) searchParams.set("pageSize", params.pageSize.toString());
    const query = searchParams.toString();
    return api.get<PaginatedResponse<Project>>(`/projects${query ? `?${query}` : ""}`);
  },

  getById: (id: string) => {
    return api.get<Project>(`/projects/${id}`);
  },

  create: (data: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
    return api.post<Project>("/projects", data);
  },

  update: (id: string, data: Partial<Project>) => {
    return api.put<Project>(`/projects/${id}`, data);
  },

  delete: (id: string) => {
    return api.delete<void>(`/projects/${id}`);
  },
};
