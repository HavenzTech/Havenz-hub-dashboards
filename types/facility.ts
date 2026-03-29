// types/facility.ts - Facility Display System Types

// ============================================
// Screen Template Types
// ============================================

export type ScreenTemplate =
  | "engine-room"
  | "engine-room-visual"
  | "power-platform"
  | "grid-interconnection"
  | "energy-flow"
  | "campus-health"
  | "operations-maintenance"
  | "power-market"
  | "revenue-margin"
  | "esg-compliance"
  | "security-command"
  | "access-personnel"
  | "external-intel"
  | "facility-overview"
  | "alerts-board"
  | "equipment-monitor"
  | "heat-plant-overview"
  | "environmental"
  | "security"
  | "access-control"
  | "occupancy"
  | "maintenance"
  | "metrics-dashboard"
  | "power-energy"
  | "custom";

// ============================================
// Screen Configuration
// ============================================

export interface ScreenAutoRotateConfig {
  enabled: boolean;
  templates: ScreenTemplate[];
  intervalMs: number;
}

export interface ScreenConfig {
  screenId: string;
  template: ScreenTemplate;
  label: string;
  params: Record<string, string>;
  autoRotate: ScreenAutoRotateConfig;
  refreshIntervalMs: number;
  updatedAt: string;
}

// ============================================
// Screen Status (reported by each display)
// ============================================

export interface ScreenHeartbeat {
  screenId: string;
  currentTemplate: ScreenTemplate;
  online: boolean;
  error?: string;
  timestamp: string;
}

export interface ScreenStatus {
  screenId: string;
  online: boolean;
  lastHeartbeat: string;
  currentTemplate: ScreenTemplate;
  error?: string;
}

// ============================================
// Template Props (passed to each template component)
// ============================================

export interface TemplateProps {
  params: Record<string, string>;
  refreshIntervalMs: number;
  screenId: string;
}
