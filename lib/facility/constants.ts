// lib/facility/constants.ts - Facility Display System Constants

import type { ScreenTemplate } from "@/types/facility";

// ============================================
// Polling & Refresh Intervals
// ============================================

/** How often screens poll for config changes (ms) */
export const CONFIG_POLL_INTERVAL = 5000;

/** How often screens send heartbeat to backend (ms) */
export const HEARTBEAT_INTERVAL = 10000;

/** Default data refresh interval for templates (ms) */
export const DEFAULT_REFRESH_INTERVAL = 10000;

/** Default auto-rotate interval between templates (ms) */
export const DEFAULT_ROTATE_INTERVAL = 30000;

// ============================================
// Template Metadata
// ============================================

export interface TemplateMetadata {
  id: ScreenTemplate;
  label: string;
  description: string;
  icon: string; // lucide icon name
  category: "overview" | "monitoring" | "security" | "operations";
}

export const TEMPLATE_REGISTRY: Record<ScreenTemplate, TemplateMetadata> = {
  "engine-room": {
    id: "engine-room",
    label: "Engine Room",
    description: "Mechanical health — engine status, performance metrics, fuel efficiency, and predictive alerts",
    icon: "Cog",
    category: "monitoring",
  },
  "engine-room-visual": {
    id: "engine-room-visual",
    label: "Engine Room — Visual",
    description: "Real-time visual monitoring — cameras, 3D facility model, and maintenance schedule",
    icon: "Eye",
    category: "monitoring",
  },
  "power-platform": {
    id: "power-platform",
    label: "Power Platform",
    description: "Generation performance — output, load, efficiency, fuel input, and trend analysis",
    icon: "Zap",
    category: "monitoring",
  },
  "grid-interconnection": {
    id: "grid-interconnection",
    label: "Battery + Substation + Grid",
    description: "Grid boundary monitoring — BESS, substation status, and grid interconnection",
    icon: "Cable",
    category: "monitoring",
  },
  "energy-flow": {
    id: "energy-flow",
    label: "Energy Flow",
    description: "Animated energy ecosystem — generation, storage, distribution, and grid exchange",
    icon: "Workflow",
    category: "overview",
  },
  "operations-maintenance": {
    id: "operations-maintenance",
    label: "Operations + Maintenance",
    description: "Command center — staff, tasks, maintenance schedule, spare parts, and alerts",
    icon: "ClipboardList",
    category: "operations",
  },
  "power-market": {
    id: "power-market",
    label: "Power Market",
    description: "AESO trading intelligence — pool price, demand, forecasts, and export signals",
    icon: "TrendingUp",
    category: "overview",
  },
  "revenue-margin": {
    id: "revenue-margin",
    label: "Revenue & Margin",
    description: "Live profitability — revenue, costs, margin analysis, and trend charts",
    icon: "DollarSign",
    category: "overview",
  },
  "esg-compliance": {
    id: "esg-compliance",
    label: "ESG & Compliance",
    description: "Emissions tracking, compliance deadlines, regulatory status, and audit readiness",
    icon: "Leaf",
    category: "operations",
  },
  "security-command": {
    id: "security-command",
    label: "Security Command",
    description: "Camera grid, AI detection, motion alerts, and perimeter monitoring",
    icon: "Shield",
    category: "security",
  },
  "access-personnel": {
    id: "access-personnel",
    label: "Access & Personnel",
    description: "Facial recognition, badge scans, personnel on site, and access control",
    icon: "UserCheck",
    category: "security",
  },
  "external-intel": {
    id: "external-intel",
    label: "External Intelligence",
    description: "Weather alerts, grid stability, and external factors affecting operations",
    icon: "Globe",
    category: "overview",
  },
  "campus-health": {
    id: "campus-health",
    label: "Campus Health",
    description: "Infrastructure monitoring — network, water, HVAC, environmental, and tenant usage",
    icon: "Building",
    category: "operations",
  },
  "facility-overview": {
    id: "facility-overview",
    label: "Facility Overview",
    description: "High-level facility status, device health, and alert summary",
    icon: "LayoutDashboard",
    category: "overview",
  },
  "alerts-board": {
    id: "alerts-board",
    label: "Alerts Board",
    description: "Active alerts across all equipment, severity-coded with live updates",
    icon: "AlertTriangle",
    category: "monitoring",
  },
  "equipment-monitor": {
    id: "equipment-monitor",
    label: "Equipment Monitor",
    description: "Real-time sensor readings and metrics for equipment groups",
    icon: "Gauge",
    category: "monitoring",
  },
  "heat-plant-overview": {
    id: "heat-plant-overview",
    label: "Heat Plant Overview",
    description: "Heat plant efficiency, sensors, and maintenance schedule",
    icon: "Flame",
    category: "monitoring",
  },
  "environmental": {
    id: "environmental",
    label: "Environmental",
    description: "Temperature, humidity, and air quality across facility zones",
    icon: "Thermometer",
    category: "monitoring",
  },
  "security": {
    id: "security",
    label: "Security",
    description: "Camera feeds, anomaly detection, and security alerts",
    icon: "Shield",
    category: "security",
  },
  "access-control": {
    id: "access-control",
    label: "Access Control",
    description: "Entry/exit logs, denied access, and verification methods",
    icon: "DoorOpen",
    category: "security",
  },
  "occupancy": {
    id: "occupancy",
    label: "Occupancy",
    description: "Zone capacity, current occupancy, and floor-by-floor breakdown",
    icon: "Users",
    category: "operations",
  },
  "maintenance": {
    id: "maintenance",
    label: "Maintenance",
    description: "Scheduled maintenance, overdue tasks, and warranty tracking",
    icon: "Wrench",
    category: "operations",
  },
  "metrics-dashboard": {
    id: "metrics-dashboard",
    label: "Metrics Dashboard",
    description: "IoT metric charts and trend analysis over time",
    icon: "LineChart",
    category: "monitoring",
  },
  "power-energy": {
    id: "power-energy",
    label: "Power & Energy",
    description: "Power output, efficiency trends, and capacity utilization",
    icon: "Zap",
    category: "monitoring",
  },
  "custom": {
    id: "custom",
    label: "Custom",
    description: "Configurable widget grid with selectable data panels",
    icon: "LayoutGrid",
    category: "overview",
  },
};

// ============================================
// Screen API Endpoints
// ============================================

export const FACILITY_API = {
  screenConfig: (screenId: string) => `/api/havenzhub/screens/${screenId}/config`,
  allScreenConfigs: "/api/havenzhub/screens/configs",
  screenHeartbeat: (screenId: string) => `/api/havenzhub/screens/${screenId}/heartbeat`,
  allScreenStatuses: "/api/havenzhub/screens/status",
} as const;
