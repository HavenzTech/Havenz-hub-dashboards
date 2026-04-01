// API Client
export { api, ApiClient, ApiError } from "./client";

// Services
export {
  usersService,
  projectsService,
  departmentsService,
  companiesService,

} from "./services";

// Re-export types from @/types for convenience
export type {
  User,
  Project,
  ProjectStatus,
  Department,
  Company,

  PaginatedResponse,
  PaginationParams,
} from "@/types";
