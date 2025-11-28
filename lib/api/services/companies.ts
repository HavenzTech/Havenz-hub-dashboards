import { api } from "../client";
import type { Company, PaginatedResponse, PaginationParams } from "@/types";

export const companiesService = {
  getAll: (params?: PaginationParams) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.pageSize) searchParams.set("pageSize", params.pageSize.toString());
    const query = searchParams.toString();
    return api.get<PaginatedResponse<Company>>(`/companies${query ? `?${query}` : ""}`);
  },

  getById: (id: string) => {
    return api.get<Company>(`/companies/${id}`);
  },

  create: (data: Omit<Company, "id" | "createdAt" | "updatedAt">) => {
    return api.post<Company>("/companies", data);
  },

  update: (id: string, data: Partial<Company>) => {
    return api.put<Company>(`/companies/${id}`, data);
  },

  delete: (id: string) => {
    return api.delete<void>(`/companies/${id}`);
  },
};
