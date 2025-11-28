import { api } from "../client";
import type { Department, PaginatedResponse, PaginationParams } from "@/types";

export const departmentsService = {
  getAll: (params?: PaginationParams) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.pageSize) searchParams.set("pageSize", params.pageSize.toString());
    const query = searchParams.toString();
    return api.get<PaginatedResponse<Department>>(`/departments${query ? `?${query}` : ""}`);
  },

  getById: (id: string) => {
    return api.get<Department>(`/departments/${id}`);
  },

  create: (data: Omit<Department, "id" | "createdAt" | "updatedAt">) => {
    return api.post<Department>("/departments", data);
  },

  update: (id: string, data: Partial<Department>) => {
    return api.put<Department>(`/departments/${id}`, data);
  },

  delete: (id: string) => {
    return api.delete<void>(`/departments/${id}`);
  },
};
