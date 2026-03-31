// ============================================
// FACILITY MOCK DATA — DELETE THIS FILE WHEN REAL DATA IS AVAILABLE
// ============================================
// All mock data for facility display templates lives here.
// Each screen's data is exported separately so templates can import what they need.
// When real backend data is available, remove this file and update templates to use hooks.

// ============================================
// SCREEN 1 — ENGINE ROOM (Mechanical Health)
// ============================================

export type EngineStatus = "running" | "standby" | "fault" | "off";

export interface MockEngine {
  id: string;
  name: string;
  status: EngineStatus;
  metrics: {
    rpm: number;
    temperature: number; // °C
    oilPressure: number; // PSI
    vibration: number; // mm/s
    runtimeHours: number;
    loadFactor: number; // %
  };
  fuel: {
    consumption: number; // m³/hr
    efficiency: number; // %
    heatRecovery: number; // %
  };
}

export interface MockPredictiveAlert {
  id: string;
  severity: "critical" | "warning" | "info";
  type: string;
  message: string;
  engineId: string;
  confidence: number; // %
  timestamp: string;
}

export interface MockCamera {
  id: string;
  name: string;
  location: string;
  status: "online" | "offline";
}

export const engineRoomData = {
  engines: [
    {
      id: "eng-1",
      name: "Engine 1",
      status: "running" as EngineStatus,
      metrics: {
        rpm: 1480,
        temperature: 87,
        oilPressure: 45,
        vibration: 0.08,
        runtimeHours: 48250,
        loadFactor: 82,
      },
      fuel: {
        consumption: 12.4,
        efficiency: 94.5,
        heatRecovery: 78,
      },
    },
    {
      id: "eng-2",
      name: "Engine 2",
      status: "standby" as EngineStatus,
      metrics: {
        rpm: 0,
        temperature: 24,
        oilPressure: 0,
        vibration: 0,
        runtimeHours: 31800,
        loadFactor: 0,
      },
      fuel: {
        consumption: 0,
        efficiency: 0,
        heatRecovery: 0,
      },
    },
  ] satisfies MockEngine[],

  cameras: [
    {
      id: "cam-front",
      name: "Front Engine Bay",
      location: "Engine Room — Front",
      status: "online" as const,
    },
    {
      id: "cam-rear",
      name: "Rear Engine Bay",
      location: "Engine Room — Rear",
      status: "online" as const,
    },
  ] satisfies MockCamera[],

  predictiveAlerts: [
    {
      id: "pa-1",
      severity: "warning" as const,
      type: "Bearing Wear",
      message: "Bearing wear approaching threshold — ENG 1 main bearing",
      engineId: "eng-1",
      confidence: 72,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "pa-2",
      severity: "info" as const,
      type: "Vibration Pattern",
      message: "Slight vibration pattern change detected — ENG 1",
      engineId: "eng-1",
      confidence: 58,
      timestamp: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      id: "pa-3",
      severity: "info" as const,
      type: "Airflow",
      message: "Airflow within normal parameters — all engines",
      engineId: "all",
      confidence: 95,
      timestamp: new Date(Date.now() - 1800000).toISOString(),
    },
  ] satisfies MockPredictiveAlert[],
};

// ============================================
// SHARED — Status color helpers
// ============================================

export const ENGINE_STATUS_CONFIG: Record<
  EngineStatus,
  { label: string; color: string; bgColor: string; dotColor: string }
> = {
  running: {
    label: "RUNNING",
    color: "text-green-400",
    bgColor: "bg-green-500/10 border-green-500/30",
    dotColor: "bg-green-500",
  },
  standby: {
    label: "STANDBY",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10 border-yellow-500/30",
    dotColor: "bg-yellow-500",
  },
  fault: {
    label: "FAULT",
    color: "text-red-400",
    bgColor: "bg-red-500/10 border-red-500/30",
    dotColor: "bg-red-500",
  },
  off: {
    label: "OFF",
    color: "text-slate-400",
    bgColor: "bg-slate-500/10 border-slate-500/30",
    dotColor: "bg-slate-500",
  },
};

// ============================================
// SCREEN 2 — ENGINE ROOM VISUAL MONITORING
// ============================================

export interface MockMaintenanceEntry {
  engineId: string;
  engineName: string;
  lastService: string;
  nextService: string;
  assignedTechnician: string;
  status: "on-schedule" | "due-soon" | "overdue";
  notes?: string;
}

export interface MockHeatZone {
  id: string;
  name: string;
  temperature: number; // °C
  status: "normal" | "warm" | "hot";
  x: number; // % position on layout
  y: number;
  width: number;
  height: number;
}

export interface MockAirflow {
  id: string;
  from: string;
  to: string;
  direction: "up" | "down" | "left" | "right";
  strength: "low" | "medium" | "high";
}

export const engineRoomVisualData = {
  cameras: [
    {
      id: "cam-wide",
      name: "Engine Hall — Wide Angle",
      location: "Ceiling Mount, Center",
      status: "online" as const,
    },
    {
      id: "cam-eng1",
      name: "Engine 1 — Zoom",
      location: "Engine Bay 1, East Wall",
      status: "online" as const,
    },
    {
      id: "cam-eng2",
      name: "Engine 2 — Zoom",
      location: "Engine Bay 2, West Wall",
      status: "online" as const,
    },
    {
      id: "cam-corridor",
      name: "Corridor — Motion Detection",
      location: "Main Corridor, Entry",
      status: "online" as const,
    },
  ] satisfies MockCamera[],

  maintenance: [
    {
      engineId: "eng-1",
      engineName: "Engine 1",
      lastService: "2026-02-15",
      nextService: "2026-04-15",
      assignedTechnician: "Bill Johnson",
      status: "on-schedule" as const,
      notes: "Oil filter + turbine blade inspection",
    },
    {
      engineId: "eng-2",
      engineName: "Engine 2",
      lastService: "2026-01-20",
      nextService: "2026-03-30",
      assignedTechnician: "Mike Reynolds",
      status: "due-soon" as const,
      notes: "Coolant flush + belt replacement",
    },
  ] satisfies MockMaintenanceEntry[],

  heatZones: [
    { id: "zone-eng1", name: "Engine 1 Bay", temperature: 87, status: "hot" as const, x: 8, y: 15, width: 35, height: 35 },
    { id: "zone-eng2", name: "Engine 2 Bay", temperature: 24, status: "normal" as const, x: 57, y: 15, width: 35, height: 35 },
    { id: "zone-exhaust", name: "Exhaust Manifold", temperature: 142, status: "hot" as const, x: 20, y: 55, width: 60, height: 12 },
    { id: "zone-corridor", name: "Main Corridor", temperature: 22, status: "normal" as const, x: 8, y: 72, width: 84, height: 18 },
    { id: "zone-maint", name: "Maintenance Area", temperature: 26, status: "normal" as const, x: 57, y: 55, width: 35, height: 12 },
  ] satisfies MockHeatZone[],

  airflows: [
    { id: "af-1", from: "Intake", to: "Engine 1", direction: "right" as const, strength: "high" as const },
    { id: "af-2", from: "Engine 1", to: "Exhaust", direction: "down" as const, strength: "high" as const },
    { id: "af-3", from: "Corridor", to: "Engine Hall", direction: "up" as const, strength: "medium" as const },
  ] satisfies MockAirflow[],

  // Engine positions for the 2D layout overlay
  enginePositions: [
    { id: "eng-1", name: "Engine 1", status: "running" as EngineStatus, x: 18, y: 28 },
    { id: "eng-2", name: "Engine 2", status: "standby" as EngineStatus, x: 67, y: 28 },
  ],
};

export const MAINTENANCE_STATUS_CONFIG: Record<
  "on-schedule" | "due-soon" | "overdue",
  { label: string; color: string; bgColor: string }
> = {
  "on-schedule": {
    label: "On Schedule",
    color: "text-green-400",
    bgColor: "bg-green-500/10 border-green-500/30",
  },
  "due-soon": {
    label: "Due Soon",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10 border-yellow-500/30",
  },
  overdue: {
    label: "Overdue",
    color: "text-red-400",
    bgColor: "bg-red-500/10 border-red-500/30",
  },
};

export const HEAT_ZONE_COLORS: Record<"normal" | "warm" | "hot", string> = {
  normal: "rgba(34, 197, 94, 0.12)",
  warm: "rgba(245, 158, 11, 0.15)",
  hot: "rgba(239, 68, 68, 0.18)",
};

// ============================================
// SCREEN 3 — POWER PLATFORM OVERVIEW
// ============================================

export interface MockTrendPoint {
  time: string;
  value: number;
}

function generateTrend24h(): MockTrendPoint[] {
  const points: MockTrendPoint[] = [];
  const now = Date.now();
  for (let i = 24; i >= 0; i--) {
    const hour = new Date(now - i * 3600000);
    const hourOfDay = hour.getHours();
    const base = hourOfDay >= 6 && hourOfDay <= 20 ? 2.2 : 1.6;
    const noise = (Math.sin(i * 0.7) * 0.15) + (Math.random() * 0.1 - 0.05);
    points.push({
      time: hour.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
      value: Math.round((base + noise) * 100) / 100,
    });
  }
  return points;
}

function generateTrend7d(): MockTrendPoint[] {
  const points: MockTrendPoint[] = [];
  const now = Date.now();
  for (let i = 7; i >= 0; i--) {
    const day = new Date(now - i * 86400000);
    const base = 2.0 + Math.sin(i * 0.9) * 0.3;
    const noise = Math.random() * 0.15;
    points.push({
      time: day.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: Math.round((base + noise) * 100) / 100,
    });
  }
  return points;
}

export interface MockKPI {
  value: number;
  unit: string;
  label: string;
  trend: "up" | "down" | "stable";
  unknown?: boolean; // data source TBD
}

export const powerPlatformData = {
  kpis: {
    totalGeneration: { value: 2.4, unit: "MW", label: "Total Generation", trend: "up" as const },
    systemLoad: { value: 2.1, unit: "MW", label: "System Load", trend: "stable" as const, unknown: true },
    heatRecovery: { value: 78, unit: "%", label: "Heat Recovery", trend: "stable" as const, unknown: true },
    systemEfficiency: { value: 94.5, unit: "%", label: "System Efficiency", trend: "up" as const, unknown: true },
    fuelInput: { value: 12.4, unit: "m³/hr", label: "Gas Flow Rate", trend: "stable" as const },
    operatingMargin: { value: 42.50, unit: "$/MWh", label: "Operating Margin", trend: "up" as const },
  } satisfies Record<string, MockKPI>,
  trend24h: generateTrend24h(),
  trend7d: generateTrend7d(),
};

// ============================================
// SCREEN 7 — OPERATIONS + MAINTENANCE
// ============================================

export interface MockTechnician {
  id: string;
  name: string;
  role: string;
  zone: string;
  status: "on-site" | "on-break" | "off-site";
}

export interface MockTask {
  id: string;
  title: string;
  assignee: string;
  zone: string;
  priority: "critical" | "high" | "medium" | "low";
  status: "in-progress" | "pending" | "overdue" | "completed";
  dueDate: string;
}

export interface MockSparePart {
  name: string;
  category: string;
  inStock: number;
  minRequired: number;
  status: "ok" | "low" | "critical";
}

export interface MockAlert {
  id: string;
  severity: "critical" | "warning" | "info";
  message: string;
  source: string;
  timestamp: string;
  resolved: boolean;
}

export const operationsMaintenanceData = {
  staff: {
    technicians: [
      { id: "t1", name: "Bill Johnson", role: "Lead Mechanic", zone: "Engine Hall", status: "on-site" as const },
      { id: "t2", name: "Mike Reynolds", role: "Electrician", zone: "Substation", status: "on-site" as const },
      { id: "t3", name: "Sarah Kim", role: "HVAC Tech", zone: "Control Room", status: "on-break" as const },
      { id: "t4", name: "Tom Harris", role: "Instrumentation", zone: "Engine Hall", status: "on-site" as const },
    ] satisfies MockTechnician[],
    zonesActive: 4,
    totalZones: 6,
  },

  tasks: [
    { id: "task-1", title: "Turbine blade inspection", assignee: "Bill Johnson", zone: "Engine Hall", priority: "high" as const, status: "in-progress" as const, dueDate: "2026-03-28" },
    { id: "task-2", title: "Coolant flush — Engine 2", assignee: "Mike Reynolds", zone: "Engine Hall", priority: "medium" as const, status: "pending" as const, dueDate: "2026-03-30" },
    { id: "task-3", title: "Replace exhaust filter bank", assignee: "Tom Harris", zone: "Stack", priority: "high" as const, status: "overdue" as const, dueDate: "2026-03-25" },
    { id: "task-4", title: "Calibrate vibration sensors", assignee: "Sarah Kim", zone: "Engine Hall", priority: "medium" as const, status: "pending" as const, dueDate: "2026-04-02" },
    { id: "task-5", title: "UPS battery test", assignee: "Mike Reynolds", zone: "Control Room", priority: "low" as const, status: "pending" as const, dueDate: "2026-04-05" },
    { id: "task-6", title: "Transformer oil sampling", assignee: "Bill Johnson", zone: "Substation", priority: "critical" as const, status: "overdue" as const, dueDate: "2026-03-22" },
  ] satisfies MockTask[],

  maintenanceWindows: [
    { label: "Engine 1 — Major Service", date: "Apr 15, 2026", type: "scheduled" as const },
    { label: "HVAC Filter Swap", date: "Apr 8, 2026", type: "scheduled" as const },
    { label: "Bearing Replacement (Predicted)", date: "Apr 22, 2026", type: "predictive" as const },
  ],

  spareParts: [
    { name: "Oil Filters", category: "Filtration", inStock: 12, minRequired: 5, status: "ok" as const },
    { name: "Drive Belts", category: "Mechanical", inStock: 3, minRequired: 4, status: "low" as const },
    { name: "Temp Sensors", category: "Instrumentation", inStock: 8, minRequired: 3, status: "ok" as const },
    { name: "Vibration Probes", category: "Instrumentation", inStock: 1, minRequired: 2, status: "critical" as const },
    { name: "Air Filters", category: "Filtration", inStock: 6, minRequired: 4, status: "ok" as const },
    { name: "Fuses (HV)", category: "Electrical", inStock: 15, minRequired: 10, status: "ok" as const },
  ] satisfies MockSparePart[],

  alerts: [
    { id: "a1", severity: "critical" as const, message: "Transformer oil temp above threshold", source: "Substation", timestamp: new Date(Date.now() - 1200000).toISOString(), resolved: false },
    { id: "a2", severity: "warning" as const, message: "Vibration probe low stock", source: "Inventory", timestamp: new Date(Date.now() - 3600000).toISOString(), resolved: false },
    { id: "a3", severity: "warning" as const, message: "Exhaust filter overdue for replacement", source: "Engine Hall", timestamp: new Date(Date.now() - 7200000).toISOString(), resolved: false },
    { id: "a4", severity: "info" as const, message: "Scheduled backup completed", source: "System", timestamp: new Date(Date.now() - 14400000).toISOString(), resolved: true },
  ] satisfies MockAlert[],
};

export const TASK_PRIORITY_CONFIG: Record<"critical" | "high" | "medium" | "low", { label: string; color: string; bgColor: string }> = {
  critical: { label: "CRIT", color: "text-red-400", bgColor: "bg-red-500/15 border-red-500/30" },
  high: { label: "HIGH", color: "text-orange-400", bgColor: "bg-orange-500/10 border-orange-500/30" },
  medium: { label: "MED", color: "text-yellow-400", bgColor: "bg-yellow-500/10 border-yellow-500/30" },
  low: { label: "LOW", color: "text-blue-400", bgColor: "bg-blue-500/10 border-blue-500/30" },
};

export const TASK_STATUS_CONFIG: Record<"in-progress" | "pending" | "overdue" | "completed", { label: string; color: string }> = {
  "in-progress": { label: "In Progress", color: "text-accent-primary" },
  pending: { label: "Pending", color: "text-text-muted" },
  overdue: { label: "Overdue", color: "text-red-400" },
  completed: { label: "Done", color: "text-green-400" },
};

export const TECH_STATUS_CONFIG: Record<"on-site" | "on-break" | "off-site", { label: string; color: string; dotColor: string }> = {
  "on-site": { label: "On Site", color: "text-green-400", dotColor: "bg-green-500" },
  "on-break": { label: "Break", color: "text-yellow-400", dotColor: "bg-yellow-500" },
  "off-site": { label: "Off Site", color: "text-text-muted", dotColor: "bg-slate-500" },
};

// ============================================
// SCREEN 5 — ENERGY FLOW DIAGRAM
// ============================================

export type NodeStatus = "normal" | "high-load" | "alert" | "offline" | "future";

export interface EnergyNode {
  id: string;
  label: string;
  subtitle?: string;
  type: "source" | "storage" | "consumer" | "grid" | "future";
  status: NodeStatus;
  power: number; // MW (current)
  capacity?: number; // MW (max)
  icon: string; // lucide icon name
  /** Position on the SVG canvas (% based) */
  x: number;
  y: number;
}

export interface EnergyFlow {
  id: string;
  from: string; // node id
  to: string; // node id
  power: number; // MW flowing
  status: NodeStatus;
  animated: boolean;
}

export const energyFlowData = {
  nodes: [
    // Row 1 — Source (top)
    { id: "power-plant", label: "Power Plant", subtitle: "2.4 MW", type: "source" as const, status: "normal" as NodeStatus, power: 2.4, capacity: 3.0, icon: "Factory", x: 50, y: 6 },
    // Row 2 — Distribution
    { id: "substation", label: "Substation", subtitle: "25 kV", type: "source" as const, status: "normal" as NodeStatus, power: 2.4, icon: "Zap", x: 50, y: 22 },
    // Row 3 — Storage & Grid (flanking)
    { id: "battery", label: "Battery (BESS)", subtitle: "72% • 2.1 MW", type: "storage" as const, status: "normal" as NodeStatus, power: 0.8, capacity: 3.0, icon: "BatteryCharging", x: 22, y: 38 },
    { id: "grid", label: "Grid", subtitle: "Export 1.2 MW", type: "grid" as const, status: "normal" as NodeStatus, power: 1.2, icon: "Globe", x: 78, y: 38 },
    // Row 4 — Consumers
    { id: "data-center", label: "Data Centre", subtitle: "0.5 MW", type: "consumer" as const, status: "normal" as NodeStatus, power: 0.5, capacity: 1.0, icon: "Server", x: 15, y: 58 },
    { id: "vertical-farm", label: "Vertical Farm", subtitle: "0.3 MW", type: "consumer" as const, status: "normal" as NodeStatus, power: 0.3, capacity: 0.5, icon: "Sprout", x: 38, y: 58 },
    { id: "ev-charging", label: "EV Charging", subtitle: "0.15 MW", type: "consumer" as const, status: "high-load" as NodeStatus, power: 0.15, capacity: 0.2, icon: "Car", x: 62, y: 58 },
    { id: "future-1", label: "Future Expansion", subtitle: "Planned", type: "future" as const, status: "future" as NodeStatus, power: 0, icon: "Plus", x: 85, y: 58 },
    // Row 5 — Campus total (bottom)
    { id: "campus", label: "Campus Load", subtitle: "0.95 MW total", type: "consumer" as const, status: "normal" as NodeStatus, power: 0.95, icon: "Building2", x: 50, y: 78 },
  ] satisfies EnergyNode[],

  flows: [
    { id: "f-plant-sub", from: "power-plant", to: "substation", power: 2.4, status: "normal" as NodeStatus, animated: true },
    { id: "f-sub-battery", from: "substation", to: "battery", power: 0.8, status: "normal" as NodeStatus, animated: true },
    { id: "f-sub-grid", from: "substation", to: "grid", power: 1.2, status: "normal" as NodeStatus, animated: true },
    { id: "f-sub-dc", from: "substation", to: "data-center", power: 0.5, status: "normal" as NodeStatus, animated: true },
    { id: "f-sub-farm", from: "substation", to: "vertical-farm", power: 0.3, status: "normal" as NodeStatus, animated: true },
    { id: "f-sub-ev", from: "substation", to: "ev-charging", power: 0.15, status: "high-load" as NodeStatus, animated: true },
    { id: "f-dc-campus", from: "data-center", to: "campus", power: 0.5, status: "normal" as NodeStatus, animated: true },
    { id: "f-farm-campus", from: "vertical-farm", to: "campus", power: 0.3, status: "normal" as NodeStatus, animated: true },
    { id: "f-ev-campus", from: "ev-charging", to: "campus", power: 0.15, status: "high-load" as NodeStatus, animated: true },
  ] satisfies EnergyFlow[],

  summary: {
    totalGeneration: 2.4,
    totalConsumption: 0.95,
    gridExport: 1.2,
    batteryCharge: 0.8,
    surplus: 0.25,
  },
};

export const NODE_STATUS_COLORS: Record<NodeStatus, { fill: string; stroke: string; glow: string; text: string }> = {
  normal: { fill: "rgba(34, 197, 94, 0.08)", stroke: "rgba(34, 197, 94, 0.5)", glow: "rgba(34, 197, 94, 0.15)", text: "#22c55e" },
  "high-load": { fill: "rgba(245, 158, 11, 0.08)", stroke: "rgba(245, 158, 11, 0.5)", glow: "rgba(245, 158, 11, 0.15)", text: "#f59e0b" },
  alert: { fill: "rgba(239, 68, 68, 0.08)", stroke: "rgba(239, 68, 68, 0.5)", glow: "rgba(239, 68, 68, 0.2)", text: "#ef4444" },
  offline: { fill: "rgba(100, 116, 139, 0.05)", stroke: "rgba(100, 116, 139, 0.3)", glow: "none", text: "#64748b" },
  future: { fill: "rgba(100, 116, 139, 0.03)", stroke: "rgba(100, 116, 139, 0.15)", glow: "none", text: "#475569" },
};

// ============================================
// SCREEN 11 — SECURITY COMMAND
// ============================================

export interface SecurityCamera {
  id: string;
  name: string;
  location: string;
  status: "online" | "offline" | "recording";
  hasMotion: boolean;
  priority: "high" | "normal";
}

export interface AIDetection {
  id: string;
  type: "motion" | "vehicle" | "person" | "unusual-activity";
  camera: string;
  confidence: number;
  timestamp: string;
  severity: "critical" | "warning" | "info";
  description: string;
}

export const securityCommandData = {
  cameras: [
    { id: "sc-perimeter-n", name: "Perimeter North", location: "North Fence Line", status: "online" as const, hasMotion: false, priority: "high" as const },
    { id: "sc-perimeter-s", name: "Perimeter South", location: "South Fence Line", status: "online" as const, hasMotion: false, priority: "high" as const },
    { id: "sc-engine-hall", name: "Engine Hall", location: "Main Hall, Ceiling", status: "online" as const, hasMotion: true, priority: "normal" as const },
    { id: "sc-main-gate", name: "Main Gate", location: "Entry Gate", status: "online" as const, hasMotion: true, priority: "high" as const },
    { id: "sc-loading", name: "Loading Dock", location: "West Side", status: "online" as const, hasMotion: false, priority: "normal" as const },
    { id: "sc-walkway", name: "Walkway A", location: "Connector Corridor", status: "online" as const, hasMotion: false, priority: "normal" as const },
    { id: "sc-parking", name: "Parking Lot", location: "East Lot", status: "online" as const, hasMotion: false, priority: "normal" as const },
    { id: "sc-server", name: "Server Room", location: "Building B", status: "recording" as const, hasMotion: false, priority: "high" as const },
  ] satisfies SecurityCamera[],

  detections: [
    { id: "det-1", type: "vehicle" as const, camera: "Main Gate", confidence: 94, timestamp: new Date(Date.now() - 120000).toISOString(), severity: "info" as const, description: "Authorized vehicle entering — plate matched" },
    { id: "det-2", type: "motion" as const, camera: "Perimeter North", confidence: 78, timestamp: new Date(Date.now() - 600000).toISOString(), severity: "warning" as const, description: "Motion detected near north fence — animal likely" },
    { id: "det-3", type: "person" as const, camera: "Engine Hall", confidence: 92, timestamp: new Date(Date.now() - 1800000).toISOString(), severity: "info" as const, description: "Technician identified in engine hall" },
    { id: "det-4", type: "unusual-activity" as const, camera: "Loading Dock", confidence: 65, timestamp: new Date(Date.now() - 3600000).toISOString(), severity: "warning" as const, description: "Unscheduled activity at loading dock — after hours" },
  ] satisfies AIDetection[],
};

// ============================================
// SCREEN 12 — ACCESS CONTROL + PERSONNEL
// ============================================

export interface PersonnelOnSite {
  id: string;
  name: string;
  role: string;
  zone: string;
  entryTime: string;
  method: "facial-recognition" | "badge" | "pin";
}

export interface DoorStatus {
  id: string;
  name: string;
  zone: string;
  status: "locked" | "unlocked" | "forced" | "propped";
  lastAccess: string;
}

export const accessPersonnelData = {
  personnelOnSite: [
    { id: "p1", name: "Bill Johnson", role: "Lead Mechanic", zone: "Engine Hall", entryTime: new Date(Date.now() - 14400000).toISOString(), method: "facial-recognition" as const },
    { id: "p2", name: "Mike Reynolds", role: "Electrician", zone: "Substation", entryTime: new Date(Date.now() - 10800000).toISOString(), method: "badge" as const },
    { id: "p3", name: "Sarah Kim", role: "HVAC Tech", zone: "Control Room", entryTime: new Date(Date.now() - 7200000).toISOString(), method: "facial-recognition" as const },
    { id: "p4", name: "Tom Harris", role: "Instrumentation", zone: "Engine Hall", entryTime: new Date(Date.now() - 5400000).toISOString(), method: "badge" as const },
    { id: "p5", name: "Mostapha", role: "Admin", zone: "Control Room", entryTime: new Date(Date.now() - 3600000).toISOString(), method: "facial-recognition" as const },
  ] satisfies PersonnelOnSite[],

  recentAccess: [
    { time: new Date(Date.now() - 60000).toISOString(), name: "Tom Harris", action: "Badge scan — Engine Hall", granted: true },
    { time: new Date(Date.now() - 300000).toISOString(), name: "Unknown", action: "Facial recognition failed — Main Gate", granted: false },
    { time: new Date(Date.now() - 900000).toISOString(), name: "Sarah Kim", action: "Badge scan — Control Room", granted: true },
    { time: new Date(Date.now() - 1800000).toISOString(), name: "Delivery Driver", action: "PIN entry — Loading Dock", granted: true },
    { time: new Date(Date.now() - 3600000).toISOString(), name: "Unknown", action: "Unauthorized badge — Server Room", granted: false },
  ],

  doors: [
    { id: "d1", name: "Main Gate", zone: "Perimeter", status: "locked" as const, lastAccess: new Date(Date.now() - 300000).toISOString() },
    { id: "d2", name: "Engine Hall Entry", zone: "Engine Hall", status: "unlocked" as const, lastAccess: new Date(Date.now() - 60000).toISOString() },
    { id: "d3", name: "Server Room", zone: "Building B", status: "locked" as const, lastAccess: new Date(Date.now() - 3600000).toISOString() },
    { id: "d4", name: "Control Room", zone: "Control", status: "unlocked" as const, lastAccess: new Date(Date.now() - 900000).toISOString() },
    { id: "d5", name: "Loading Dock", zone: "West Side", status: "locked" as const, lastAccess: new Date(Date.now() - 1800000).toISOString() },
    { id: "d6", name: "Emergency Exit B", zone: "Warehouse", status: "locked" as const, lastAccess: new Date(Date.now() - 86400000).toISOString() },
  ] satisfies DoorStatus[],

  stats: {
    totalOnSite: 5,
    entriestoday: 18,
    deniedToday: 2,
    doorsUnlocked: 2,
    doorsTotal: 6,
  },
};

export const DOOR_STATUS_CONFIG: Record<"locked" | "unlocked" | "forced" | "propped", { label: string; color: string; dotColor: string }> = {
  locked: { label: "LOCKED", color: "text-green-400", dotColor: "bg-green-500" },
  unlocked: { label: "UNLOCKED", color: "text-yellow-400", dotColor: "bg-yellow-500" },
  forced: { label: "FORCED", color: "text-red-400", dotColor: "bg-red-500" },
  propped: { label: "PROPPED", color: "text-orange-400", dotColor: "bg-orange-500" },
};

// ============================================
// SCREEN 13 — EXTERNAL INTELLIGENCE (Stripped down)
// ============================================

export interface ExternalAlert {
  id: string;
  category: "weather" | "grid" | "market" | "regulatory";
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  source: string;
  timestamp: string;
}

export const externalIntelData = {
  weather: {
    current: { temp: -4, condition: "Clear", wind: 12, humidity: 45, icon: "☀️" },
    alerts: [
      { id: "w1", title: "Cold Snap Warning", description: "Temperatures dropping to -28°C overnight. Expect increased heating demand.", severity: "warning" as const, timestamp: new Date(Date.now() - 3600000).toISOString() },
    ],
    forecast: [
      { day: "Today", high: -2, low: -18, condition: "Clear" },
      { day: "Tomorrow", high: -8, low: -28, condition: "Snow" },
      { day: "Wed", high: -5, low: -22, condition: "Cloudy" },
      { day: "Thu", high: 1, low: -12, condition: "Clear" },
      { day: "Fri", high: 4, low: -8, condition: "Clear" },
    ],
  },

  alerts: [
    { id: "ea1", category: "grid" as const, severity: "warning" as const, title: "AESO Grid Advisory", description: "Tight supply forecast for tomorrow 16:00–19:00. Reserve margin below 500 MW.", source: "AESO", timestamp: new Date(Date.now() - 1800000).toISOString() },
    { id: "ea2", category: "weather" as const, severity: "warning" as const, title: "Extreme Cold Warning", description: "Environment Canada: -28°C overnight with wind chill to -38°C.", source: "ECCC", timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: "ea3", category: "market" as const, severity: "info" as const, title: "Carbon Price Update", description: "Federal carbon price increases to $95/tonne effective April 1.", source: "CRA", timestamp: new Date(Date.now() - 86400000).toISOString() },
    { id: "ea4", category: "regulatory" as const, severity: "info" as const, title: "TIER Program Update", description: "Alberta TIER benchmark tightening proposal published for comment.", source: "Alberta Gov", timestamp: new Date(Date.now() - 172800000).toISOString() },
    { id: "ea5", category: "grid" as const, severity: "info" as const, title: "Planned Transmission Outage", description: "240L transmission line maintenance Apr 5–7. No impact to facility.", source: "AltaLink", timestamp: new Date(Date.now() - 259200000).toISOString() },
  ] satisfies ExternalAlert[],
};

export const EXTERNAL_CATEGORY_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
  weather: { label: "Weather", color: "text-blue-400", icon: "CloudSnow" },
  grid: { label: "Grid", color: "text-yellow-400", icon: "Zap" },
  market: { label: "Market", color: "text-green-400", icon: "TrendingUp" },
  regulatory: { label: "Regulatory", color: "text-purple-400", icon: "FileText" },
};

// ============================================
// SCREEN 8 — POWER MARKET INTELLIGENCE (AESO)
// ============================================

export interface MockPricePoint {
  time: string;
  price: number;
}

function generatePriceForecast(days: number, label: "hourly" | "daily"): MockPricePoint[] {
  const points: MockPricePoint[] = [];
  const now = Date.now();
  const count = label === "hourly" ? days * 24 : days;
  const step = label === "hourly" ? 3600000 : 86400000;

  for (let i = 0; i < count; i++) {
    const t = new Date(now + i * step);
    const base = 55 + Math.sin(i * 0.3) * 20;
    const spike = Math.random() > 0.9 ? 40 : 0;
    const noise = Math.random() * 10 - 5;
    points.push({
      time: label === "hourly"
        ? t.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })
        : t.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      price: Math.round((base + spike + noise) * 100) / 100,
    });
  }
  return points;
}

export interface MarketSignal {
  id: string;
  type: "export-opportunity" | "peak-demand" | "low-price" | "price-spike";
  message: string;
  severity: "high" | "medium" | "low";
  timestamp: string;
  actionable: boolean;
}

export const powerMarketData = {
  poolPrice: 67.42,
  poolPriceChange: 12.5, // % change from 1h ago
  demandMW: 10847,
  demandCapacityMW: 14500,
  dayAheadAvg: 58.30,
  volatility: "moderate" as "low" | "moderate" | "high",

  forecast1d: generatePriceForecast(1, "hourly"),
  forecast7d: generatePriceForecast(7, "daily"),

  signals: [
    { id: "s1", type: "export-opportunity" as const, message: "Pool price above $65 — favorable export window", severity: "high" as const, timestamp: new Date(Date.now() - 300000).toISOString(), actionable: true },
    { id: "s2", type: "peak-demand" as const, message: "Peak demand expected 16:00–19:00 today", severity: "medium" as const, timestamp: new Date(Date.now() - 1800000).toISOString(), actionable: true },
    { id: "s3", type: "low-price" as const, message: "Off-peak pricing forecast overnight — consider battery charging", severity: "low" as const, timestamp: new Date(Date.now() - 3600000).toISOString(), actionable: true },
  ] satisfies MarketSignal[],
};

// ============================================
// SCREEN 9 — REVENUE & OPERATING MARGIN
// ============================================

function generateRevenueTrend(hours: number): MockTrendPoint[] {
  const points: MockTrendPoint[] = [];
  const now = Date.now();
  let cumulative = 0;
  for (let i = hours; i >= 0; i--) {
    const t = new Date(now - i * 3600000);
    const hourOfDay = t.getHours();
    const hourlyRev = hourOfDay >= 6 && hourOfDay <= 20 ? 280 + Math.random() * 60 : 120 + Math.random() * 40;
    cumulative += hourlyRev;
    points.push({
      time: t.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
      value: Math.round(cumulative),
    });
  }
  return points;
}

function generateRevenueTrend7d(): MockTrendPoint[] {
  const points: MockTrendPoint[] = [];
  const now = Date.now();
  for (let i = 7; i >= 0; i--) {
    const day = new Date(now - i * 86400000);
    const base = 5200 + Math.sin(i * 0.8) * 800;
    points.push({
      time: day.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: Math.round(base + Math.random() * 400),
    });
  }
  return points;
}

export const revenueMarginData = {
  revenueToday: 4820,
  revenueMonth: 142500,
  revenueExport: 3240,
  gasCost: 1890,
  costPerMWh: 28.40,
  marginPerMWh: 39.02,
  marginPercent: 57.8,

  trend24h: generateRevenueTrend(24),
  trend7d: generateRevenueTrend7d(),
};

// ============================================
// SCREEN 10 — ESG & COMPLIANCE (Stripped down)
// ============================================

export interface ComplianceDeadline {
  id: string;
  title: string;
  dueDate: string;
  status: "on-track" | "at-risk" | "overdue" | "submitted";
  agency: string;
}

export interface RegulatoryAlert {
  id: string;
  message: string;
  severity: "critical" | "warning" | "info";
  date: string;
}

export const esgComplianceData = {
  emissions: {
    co2Today: 18.4, // tonnes
    co2Month: 542, // tonnes
    co2Reduction: 23, // % vs baseline
    intensity: 0.42, // tCO2/MWh
    intensityTarget: 0.50,
  },
  auditStatus: "ready" as "ready" | "issues" | "not-ready",
  lastAudit: "2026-01-15",
  nextAudit: "2026-07-15",

  deadlines: [
    { id: "d1", title: "AESO Annual Compliance Report", dueDate: "2026-04-30", status: "on-track" as const, agency: "AESO" },
    { id: "d2", title: "Alberta TIER Submission", dueDate: "2026-06-15", status: "on-track" as const, agency: "Alberta Environment" },
    { id: "d3", title: "Federal GHG Reporting", dueDate: "2026-03-31", status: "at-risk" as const, agency: "ECCC" },
    { id: "d4", title: "Air Quality Monitoring Report", dueDate: "2026-03-15", status: "submitted" as const, agency: "AEP" },
  ] satisfies ComplianceDeadline[],

  alerts: [
    { id: "ra1", message: "Federal GHG report due in 2 days — data validation pending", severity: "warning" as const, date: new Date(Date.now() - 86400000).toISOString() },
    { id: "ra2", message: "New TIER benchmark published — review required", severity: "info" as const, date: new Date(Date.now() - 172800000).toISOString() },
  ] satisfies RegulatoryAlert[],
};

// ============================================
// SCREEN 6 — CAMPUS HEALTH
// ============================================
// NOTE: Most data sources TBD. Tenant usage completely unknown.

export interface CampusSystemStatus {
  name: string;
  status: "healthy" | "warning" | "critical" | "offline";
  value: number | string;
  unit: string;
  detail?: string;
}

export interface TenantUsage {
  building: string;
  consumption: number; // kW
  percentage: number; // % of total
  trend: "up" | "down" | "stable";
}

export const campusHealthData = {
  network: {
    fiberUptime: 99.97,
    nodes: [
      { name: "Core Switch A", status: "healthy" as const, value: "100%", unit: "uptime", detail: "Latency: 0.3ms" },
      { name: "Core Switch B", status: "healthy" as const, value: "100%", unit: "uptime", detail: "Latency: 0.4ms" },
      { name: "Distribution SW-1", status: "healthy" as const, value: "99.9%", unit: "uptime", detail: "12 ports active" },
      { name: "Distribution SW-2", status: "warning" as const, value: "98.1%", unit: "uptime", detail: "High packet loss" },
      { name: "Edge AP-Warehouse", status: "healthy" as const, value: "100%", unit: "uptime", detail: "24 clients" },
      { name: "Edge AP-Office", status: "healthy" as const, value: "100%", unit: "uptime", detail: "18 clients" },
    ] satisfies CampusSystemStatus[],
  },
  water: {
    systems: [
      { name: "Main Supply", status: "healthy" as const, value: 42.5, unit: "m³/hr", detail: "Pressure: 4.2 bar" },
      { name: "Cooling Loop", status: "healthy" as const, value: 18.3, unit: "m³/hr", detail: "Return temp: 32°C" },
      { name: "Fire Suppression", status: "healthy" as const, value: "Standby", unit: "", detail: "Tank: 95% full" },
      { name: "Leak Detection", status: "healthy" as const, value: "Clear", unit: "", detail: "12 sensors active" },
    ] satisfies CampusSystemStatus[],
  },
  hvac: {
    zones: [
      { name: "Engine Hall", temperature: 34, humidity: 38, status: "warm" as const, coolingLoad: 85 },
      { name: "Control Room", temperature: 22, humidity: 45, status: "normal" as const, coolingLoad: 40 },
      { name: "Server Room", temperature: 19, humidity: 42, status: "normal" as const, coolingLoad: 92 },
      { name: "Office Block", temperature: 23, humidity: 48, status: "normal" as const, coolingLoad: 35 },
      { name: "Warehouse", temperature: 18, humidity: 52, status: "normal" as const, coolingLoad: 20 },
    ],
  },
  environmental: {
    readings: [
      { name: "Air Quality (AQI)", status: "healthy" as const, value: 32, unit: "AQI", detail: "Good" },
      { name: "CO₂ Level", status: "healthy" as const, value: 412, unit: "ppm", detail: "Normal" },
      { name: "PM2.5", status: "healthy" as const, value: 8.2, unit: "μg/m³", detail: "Low" },
      { name: "Outdoor Temp", status: "healthy" as const, value: -4, unit: "°C", detail: "Wind: 12 km/h" },
    ] satisfies CampusSystemStatus[],
  },
  tenantUsage: [
    { building: "Power Plant", consumption: 120, percentage: 35, trend: "stable" as const },
    { building: "Data Centre", consumption: 95, percentage: 28, trend: "up" as const },
    { building: "Vertical Farm", consumption: 65, percentage: 19, trend: "stable" as const },
    { building: "Office Block", consumption: 38, percentage: 11, trend: "down" as const },
    { building: "EV Station", consumption: 24, percentage: 7, trend: "up" as const },
  ] satisfies TenantUsage[],
};

export const SYSTEM_STATUS_CONFIG: Record<
  "healthy" | "warning" | "critical" | "offline",
  { label: string; color: string; dotColor: string; bgColor: string }
> = {
  healthy: { label: "Healthy", color: "text-green-400", dotColor: "bg-green-500", bgColor: "bg-green-500/5 border-green-500/20" },
  warning: { label: "Warning", color: "text-yellow-400", dotColor: "bg-yellow-500", bgColor: "bg-yellow-500/5 border-yellow-500/20" },
  critical: { label: "Critical", color: "text-red-400", dotColor: "bg-red-500", bgColor: "bg-red-500/5 border-red-500/20" },
  offline: { label: "Offline", color: "text-slate-400", dotColor: "bg-slate-500", bgColor: "bg-slate-500/5 border-slate-500/20" },
};

// ============================================
// SCREEN 4 — BATTERY + SUBSTATION + GRID
// ============================================
// NOTE: ALL data sources are TBD. Entire screen is mock data.
// Likely needs SCADA/Modbus/DNP3 integration — not REST API.

export type BreakerStatus = "closed" | "open" | "tripped";
export type LineStatus = "energized" | "de-energized" | "fault";

export const gridInterconnectionData = {
  battery: {
    chargeLevel: 72,          // %
    chargeRate: 0.8,           // MW (positive = charging)
    dischargeRate: 0,          // MW
    availableMW: 2.1,          // MW
    health: 96,                // %
    cycleCount: 342,
    thermalStatus: "normal" as "normal" | "warm" | "hot",
    temperature: 28,           // °C
    capacity: 3.0,             // MWh total
    stateOfHealth: 96,         // %
  },
  substation: {
    transformerLoad: 68,       // %
    voltageHV: 25.0,           // kV (high voltage side)
    voltageLV: 0.48,           // kV (low voltage side)
    currentHV: 54.2,           // A
    currentLV: 1250,           // A
    breakerStatus: "closed" as BreakerStatus,
    switchgearStatus: "normal" as "normal" | "alarm" | "fault",
    powerFactor: 0.97,
    frequency: 60.01,          // Hz
  },
  grid: {
    exportMW: 1.2,             // MW being exported
    importMW: 0,               // MW being imported
    gridFrequency: 60.01,      // Hz
    gridVoltage: 25.1,         // kV
    lineStatus: "energized" as LineStatus,
    tieLineStatus: "closed" as BreakerStatus,
    netFlow: 1.2,              // MW (positive = exporting)
    reactivePower: 0.15,       // MVAr
  },
};

export const BREAKER_STATUS_CONFIG: Record<BreakerStatus, { label: string; color: string; dotColor: string }> = {
  closed: { label: "CLOSED", color: "text-green-400", dotColor: "bg-green-500" },
  open: { label: "OPEN", color: "text-yellow-400", dotColor: "bg-yellow-500" },
  tripped: { label: "TRIPPED", color: "text-red-400", dotColor: "bg-red-500" },
};

export const LINE_STATUS_CONFIG: Record<LineStatus, { label: string; color: string; dotColor: string }> = {
  energized: { label: "ENERGIZED", color: "text-green-400", dotColor: "bg-green-500" },
  "de-energized": { label: "DE-ENERGIZED", color: "text-yellow-400", dotColor: "bg-yellow-500" },
  fault: { label: "FAULT", color: "text-red-400", dotColor: "bg-red-500" },
};

// ============================================
// SHARED — Status color helpers
// ============================================

export const ALERT_SEVERITY_CONFIG: Record<
  "critical" | "warning" | "info",
  { label: string; color: string; bgColor: string; icon: string }
> = {
  critical: {
    label: "CRITICAL",
    color: "text-red-400",
    bgColor: "bg-red-500/10 border-red-500/30",
    icon: "●",
  },
  warning: {
    label: "WARNING",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10 border-yellow-500/30",
    icon: "▲",
  },
  info: {
    label: "INFO",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10 border-blue-500/30",
    icon: "○",
  },
};
