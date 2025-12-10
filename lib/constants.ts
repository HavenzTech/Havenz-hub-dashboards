// API Configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// Company Configuration
export const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "Agritech Haven International";
export const COMPANY_URL = process.env.NEXT_PUBLIC_COMPANY_URL || "https://www.agritechhaven.com";
export const COMPANY_LOGO = "/agritech.svg";

// Display Configuration
export const DISPLAY = {
  width: 2160,
  height: 3840,
  aspectRatio: "9:16",
  orientation: "portrait",
} as const;

// Layout Heights (percentages)
export const LAYOUT_HEIGHTS = {
  header: 8,
  personalInfo: 12,
  projects: 25,
  linkedInFeed: 25,
  mapView: 30,
} as const;

// Refresh Intervals (milliseconds)
export const REFRESH_INTERVALS = {
  clock: 1000,           // 1 second
  linkedIn: 10000,       // 10 seconds (carousel rotation)
  projects: 60000,       // 1 minute
} as const;

// Status Colors mapping
export const STATUS_COLORS = {
  planning: "text-status-info",
  active: "text-status-warning",
  completed: "text-status-success",
  "in-progress": "text-status-warning",
  "on-hold": "text-status-error",
  cancelled: "text-status-error opacity-50",
} as const;

// Status Labels
export const STATUS_LABELS = {
  planning: "Planning",
  active: "Active",
  completed: "Completed",
  "in-progress": "In Progress",
  "on-hold": "On Hold",
  cancelled: "Cancelled",
} as const;

// 3D Scene Configuration
export const SCENE_CONFIG = {
  cameraPosition: [10, 10, 10] as [number, number, number],
  autoRotateSpeed: 0.5,
  ambientLightIntensity: 0.4,
  directionalLightIntensity: 0.8,
} as const;
