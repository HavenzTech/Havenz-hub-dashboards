export type ProjectStatus = "completed" | "in-progress" | "on-hold" | "cancelled";

export interface Project {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  admin: string;
  resource: string;
  progress: number; // 0-100
  hoursLogged: string;
  description?: string;
}
