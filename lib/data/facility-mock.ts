// Mock data for facility display development when backend is unavailable.
// Used when NEXT_PUBLIC_USE_MOCK_DATA=true

import type { BmsDeviceDto, AccessLogDto, IotMetricDto, PropertyDto } from "@/types/bms";
import type { ScreenConfig } from "@/types/facility";

// ============================================
// Mock Screen Configs
// ============================================

export const mockScreenConfigs: Record<string, ScreenConfig> = {
  "screen-1": {
    screenId: "screen-1",
    template: "engine-room",
    label: "Engine Room",
    params: {},
    autoRotate: { enabled: false, templates: [], intervalMs: 30000 },
    refreshIntervalMs: 10000,
    updatedAt: new Date().toISOString(),
  },
  "screen-2": {
    screenId: "screen-2",
    template: "engine-room-visual",
    label: "Engine Room — Visual",
    params: {},
    autoRotate: { enabled: false, templates: [], intervalMs: 30000 },
    refreshIntervalMs: 5000,
    updatedAt: new Date().toISOString(),
  },
  "screen-3": {
    screenId: "screen-3",
    template: "power-platform",
    label: "Power Platform",
    params: { propertyId: "heat-power-plant" },
    autoRotate: { enabled: false, templates: [], intervalMs: 30000 },
    refreshIntervalMs: 10000,
    updatedAt: new Date().toISOString(),
  },
  "screen-4": {
    screenId: "screen-4",
    template: "grid-interconnection",
    label: "Battery + Substation + Grid",
    params: { propertyId: "heat-power-plant" },
    autoRotate: { enabled: false, templates: [], intervalMs: 30000 },
    refreshIntervalMs: 10000,
    updatedAt: new Date().toISOString(),
  },
  "screen-5": {
    screenId: "screen-5",
    template: "energy-flow",
    label: "Energy Flow",
    params: {},
    autoRotate: { enabled: false, templates: [], intervalMs: 30000 },
    refreshIntervalMs: 10000,
    updatedAt: new Date().toISOString(),
  },
  "screen-6": {
    screenId: "screen-6",
    template: "campus-health",
    label: "Campus Health",
    params: {},
    autoRotate: { enabled: false, templates: [], intervalMs: 15000 },
    refreshIntervalMs: 15000,
    updatedAt: new Date().toISOString(),
  },
  "screen-7": {
    screenId: "screen-7",
    template: "operations-maintenance",
    label: "Operations + Maintenance",
    params: {},
    autoRotate: { enabled: false, templates: [], intervalMs: 30000 },
    refreshIntervalMs: 10000,
    updatedAt: new Date().toISOString(),
  },
  "screen-8": {
    screenId: "screen-8",
    template: "power-market",
    label: "Power Market",
    params: {},
    autoRotate: { enabled: false, templates: [], intervalMs: 30000 },
    refreshIntervalMs: 10000,
    updatedAt: new Date().toISOString(),
  },
  "screen-9": {
    screenId: "screen-9",
    template: "revenue-margin",
    label: "Revenue & Margin",
    params: {},
    autoRotate: { enabled: false, templates: [], intervalMs: 30000 },
    refreshIntervalMs: 15000,
    updatedAt: new Date().toISOString(),
  },
  "screen-10": {
    screenId: "screen-10",
    template: "esg-compliance",
    label: "ESG & Compliance",
    params: {},
    autoRotate: { enabled: false, templates: [], intervalMs: 30000 },
    refreshIntervalMs: 30000,
    updatedAt: new Date().toISOString(),
  },
  "screen-11": {
    screenId: "screen-11",
    template: "security-command",
    label: "Security Command",
    params: {},
    autoRotate: { enabled: false, templates: [], intervalMs: 30000 },
    refreshIntervalMs: 10000,
    updatedAt: new Date().toISOString(),
  },
  "screen-12": {
    screenId: "screen-12",
    template: "access-personnel",
    label: "Access & Personnel",
    params: {},
    autoRotate: { enabled: false, templates: [], intervalMs: 30000 },
    refreshIntervalMs: 15000,
    updatedAt: new Date().toISOString(),
  },
  "screen-13": {
    screenId: "screen-13",
    template: "external-intel",
    label: "External Intelligence",
    params: {},
    autoRotate: {
      enabled: false,
      templates: [],
      intervalMs: 30000,
    },
    refreshIntervalMs: 10000,
    updatedAt: new Date().toISOString(),
  },
};

// ============================================
// Mock BMS Devices
// ============================================

export const mockDevices: BmsDeviceDto[] = [
  {
    id: "dev-cam-01",
    name: "Main Entrance Camera",
    type: "camera",
    status: "online",
    locationZone: "Entrance",
    batteryLevel: null,
    signalStrength: 95,
    uptimePercentage: 99.8,
    lastHeartbeat: new Date().toISOString(),
    manufacturer: "Avigilon",
    model: "H5A-BO-IR",
  },
  {
    id: "dev-cam-02",
    name: "Operations Room Camera",
    type: "camera",
    status: "online",
    locationZone: "Operations",
    signalStrength: 92,
    uptimePercentage: 99.5,
    lastHeartbeat: new Date().toISOString(),
    manufacturer: "Avigilon",
    model: "H5A-BO-IR",
  },
  {
    id: "dev-sensor-01",
    name: "Turbine Hall Temp Sensor",
    type: "sensor",
    status: "online",
    locationZone: "Turbine Hall",
    batteryLevel: 87,
    signalStrength: 88,
    uptimePercentage: 99.9,
    lastHeartbeat: new Date().toISOString(),
    manufacturer: "Honeywell",
    model: "T9000",
  },
  {
    id: "dev-ac-01",
    name: "Main Gate Access",
    type: "access-control",
    status: "online",
    locationZone: "Main Gate",
    signalStrength: 96,
    uptimePercentage: 99.7,
    lastHeartbeat: new Date().toISOString(),
    manufacturer: "OpenPath",
    model: "Smart Reader",
  },
  {
    id: "dev-ctrl-01",
    name: "HVAC Controller A",
    type: "controller",
    status: "online",
    locationZone: "Mechanical Room",
    signalStrength: 90,
    uptimePercentage: 98.2,
    lastHeartbeat: new Date().toISOString(),
    manufacturer: "Johnson Controls",
    model: "FX-PC",
  },
  {
    id: "dev-sensor-02",
    name: "Stack Emissions Monitor",
    type: "sensor",
    status: "warning" as string,
    locationZone: "Stack",
    batteryLevel: 34,
    signalStrength: 72,
    uptimePercentage: 96.1,
    lastHeartbeat: new Date(Date.now() - 300000).toISOString(),
    manufacturer: "ABB",
    model: "ACX580",
  },
];

// ============================================
// Mock Access Logs
// ============================================

export const mockAccessLogs: AccessLogDto[] = [
  {
    id: 1,
    accessType: "entry",
    verificationMethod: "facial-recognition",
    confidenceScore: 0.97,
    accessGranted: true,
    locationZone: "Main Gate",
    direction: "entry",
    timestamp: new Date(Date.now() - 60000).toISOString(),
  },
  {
    id: 2,
    accessType: "entry",
    verificationMethod: "rfid",
    accessGranted: true,
    locationZone: "Operations Room",
    direction: "entry",
    timestamp: new Date(Date.now() - 120000).toISOString(),
  },
  {
    id: 3,
    accessType: "denied",
    verificationMethod: "pin",
    accessGranted: false,
    denialReason: "Invalid PIN",
    locationZone: "Server Room",
    direction: "entry",
    anomalyDetected: true,
    anomalyType: "repeated-failure",
    timestamp: new Date(Date.now() - 180000).toISOString(),
  },
  {
    id: 4,
    accessType: "exit",
    verificationMethod: "facial-recognition",
    confidenceScore: 0.94,
    accessGranted: true,
    locationZone: "Main Gate",
    direction: "exit",
    timestamp: new Date(Date.now() - 300000).toISOString(),
  },
];

// ============================================
// Mock IoT Metrics
// ============================================

export const mockIotMetrics: IotMetricDto[] = [
  {
    id: 1,
    deviceId: "dev-sensor-01",
    metricType: "temperature",
    value: 485,
    unit: "°C",
    alertTriggered: false,
    qualityIndicator: "excellent",
    timestamp: new Date().toISOString(),
  },
  {
    id: 2,
    deviceId: "dev-sensor-01",
    metricType: "humidity",
    value: 42,
    unit: "%",
    alertTriggered: false,
    qualityIndicator: "good",
    timestamp: new Date().toISOString(),
  },
  {
    id: 3,
    deviceId: "dev-sensor-02",
    metricType: "pressure",
    value: 45.2,
    unit: "PSI",
    alertTriggered: false,
    qualityIndicator: "good",
    timestamp: new Date().toISOString(),
  },
  {
    id: 4,
    deviceId: "dev-sensor-02",
    metricType: "emissions",
    value: 128,
    unit: "ppm",
    alertTriggered: true,
    alertSeverity: "warning",
    thresholdMax: 150,
    qualityIndicator: "fair",
    timestamp: new Date().toISOString(),
  },
];

// ============================================
// Mock Properties
// ============================================

export const mockProperties: PropertyDto[] = [
  {
    id: "heat-power-plant",
    name: "Heat & Power Plant",
    status: "active",
    sizeTotalArea: 15000,
    sizeFloors: 2,
    deviceCount: 24,
    accessLogCount: 156,
    locationAddress: "4521 Industrial Way",
    locationCity: "Red Deer",
    locationProvince: "AB",
  },
  {
    id: "energy-hub-facility",
    name: "Energy Hub Facility",
    status: "active",
    sizeTotalArea: 32000,
    sizeFloors: 3,
    deviceCount: 42,
    accessLogCount: 312,
    locationAddress: "5500 Energy Park Way",
    locationCity: "Calgary",
    locationProvince: "AB",
  },
];

// ============================================
// Helper to get mock config by screen ID
// ============================================

export function getMockScreenConfig(screenId: string): ScreenConfig | null {
  return mockScreenConfigs[screenId] || null;
}
