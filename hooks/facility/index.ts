// Facility display hooks

// Screen management
export { useScreenConfig } from "./useScreenConfig";
export { useScreenHeartbeat } from "./useScreenHeartbeat";

// Generic polling
export { usePollingData } from "./usePollingData";

// Equipment
export { useEquipmentMetrics, useEquipmentMetricHistory } from "./useEquipmentMetrics";
export { useEquipmentAlerts } from "./useEquipmentAlerts";

// Access & Security
export { useAccessLogs, useAnomalousAccessLogs, useDeniedAccessLogs } from "./useAccessLogs";

// BMS Devices
export {
  useBmsDevicesByProperty,
  useBmsDevicesByType,
  useBmsDevicesByStatus,
  useBmsDevicesMaintenanceRequired,
} from "./useBmsDevices";

// IoT Metrics
export {
  useIotMetricsByProperty,
  useIotMetricsByType,
  useIotMetricAlerts,
  useIotMetricsBySeverity,
} from "./useIotMetrics";

// Area & Occupancy
export { useAreaOccupancy } from "./useAreaOccupancy";

// Composite
export { useFacilityOverview } from "./useFacilityOverview";
