import { api } from "../client";
import type { LinkedInPost, PaginatedResponse, PaginationParams } from "@/types";

export const linkedinService = {
  getPosts: (params?: PaginationParams) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.pageSize) searchParams.set("pageSize", params.pageSize.toString());
    const query = searchParams.toString();
    return api.get<PaginatedResponse<LinkedInPost>>(`/linkedin/posts${query ? `?${query}` : ""}`);
  },

  getPostById: (id: string) => {
    return api.get<LinkedInPost>(`/linkedin/posts/${id}`);
  },
};
