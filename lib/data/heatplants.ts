// Centralized heat plant/energy facility data

export interface SensorReading {
  name: string;
  value: number;
  unit: string;
  status: "Normal" | "Warning" | "Critical";
  trend: "up" | "down" | "stable";
}

export interface MaintenanceSchedule {
  task: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  assignedTo: string;
}

export interface HeatPlant {
  id: string;
  name: string;
  propertyId: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  companyLogoScale?: number;
  status: "Online" | "Offline" | "Maintenance";
  operationalStatus: string;
  efficiency: number;
  powerOutput: string;
  heatOutput: string;
  fuelType: string;
  capacity: string;
  location: string;
  lastInspection: string;
  nextInspection: string;
  sensors: SensorReading[];
  upcomingMaintenance: MaintenanceSchedule[];
  operatingHours: number;
  yearInstalled: number;
}

export const heatplants: HeatPlant[] = [
  {
    id: "ahi-heat-power-plant",
    name: "AHI Heat & Power Plant",
    propertyId: "heat-power-plant",
    companyId: "agritech-haven",
    companyName: "Agritech Haven LP",
    companyLogo: "/ahi.png",
    companyLogoScale: 0.8,
    status: "Online",
    operationalStatus: "Running at optimal capacity",
    efficiency: 94.5,
    powerOutput: "2.4 MW",
    heatOutput: "8.2 MMBtu/hr",
    fuelType: "Natural Gas",
    capacity: "3.0 MW",
    location: "Red Deer, AB",
    lastInspection: "Nov 15, 2024",
    nextInspection: "Feb 15, 2025",
    sensors: [
      { name: "Turbine Temp", value: 485, unit: "°C", status: "Normal", trend: "stable" },
      { name: "Stack Temp", value: 142, unit: "°C", status: "Normal", trend: "down" },
      { name: "Inlet Pressure", value: 45.2, unit: "PSI", status: "Normal", trend: "stable" },
      { name: "Exhaust Flow", value: 12500, unit: "CFM", status: "Normal", trend: "up" },
      { name: "Vibration", value: 0.08, unit: "in/s", status: "Normal", trend: "stable" },
      { name: "Oil Pressure", value: 62, unit: "PSI", status: "Normal", trend: "stable" },
    ],
    upcomingMaintenance: [
      { task: "Oil filter replacement", dueDate: "Dec 15, 2024", priority: "Medium", assignedTo: "Bill Johnson" },
      { task: "Turbine blade inspection", dueDate: "Jan 10, 2025", priority: "High", assignedTo: "Mike Reynolds" },
      { task: "Heat exchanger cleaning", dueDate: "Feb 1, 2025", priority: "Medium", assignedTo: "Tom Harris" },
    ],
    operatingHours: 48250,
    yearInstalled: 2018,
  },
  {
    id: "energy-haven-generator",
    name: "Energy Haven Generator Unit",
    propertyId: "energy-hub-facility",
    companyId: "energy-haven",
    companyName: "Energy Haven",
    companyLogo: "/energyhaven.png",
    status: "Online",
    operationalStatus: "Running at 85% capacity",
    efficiency: 91.2,
    powerOutput: "5.1 MW",
    heatOutput: "15.8 MMBtu/hr",
    fuelType: "Natural Gas",
    capacity: "6.0 MW",
    location: "Calgary, AB",
    lastInspection: "Oct 20, 2024",
    nextInspection: "Jan 20, 2025",
    sensors: [
      { name: "Turbine Temp", value: 510, unit: "°C", status: "Warning", trend: "up" },
      { name: "Stack Temp", value: 158, unit: "°C", status: "Normal", trend: "stable" },
      { name: "Inlet Pressure", value: 52.1, unit: "PSI", status: "Normal", trend: "stable" },
      { name: "Exhaust Flow", value: 28400, unit: "CFM", status: "Normal", trend: "stable" },
      { name: "Vibration", value: 0.12, unit: "in/s", status: "Warning", trend: "up" },
      { name: "Oil Pressure", value: 58, unit: "PSI", status: "Normal", trend: "down" },
    ],
    upcomingMaintenance: [
      { task: "Vibration analysis", dueDate: "Dec 8, 2024", priority: "High", assignedTo: "Sarah Kim" },
      { task: "Cooling system service", dueDate: "Dec 20, 2024", priority: "Medium", assignedTo: "Mike Chen" },
    ],
    operatingHours: 32180,
    yearInstalled: 2019,
  },
  {
    id: "backup-generator-a",
    name: "Backup Generator A",
    propertyId: "agricultural-warehouse",
    companyId: "agritech-haven",
    companyName: "Agritech Haven LP",
    companyLogo: "/ahi.png",
    companyLogoScale: 0.8,
    status: "Maintenance",
    operationalStatus: "Scheduled maintenance in progress",
    efficiency: 0,
    powerOutput: "0 kW",
    heatOutput: "0 MMBtu/hr",
    fuelType: "Diesel",
    capacity: "500 kW",
    location: "Red Deer, AB",
    lastInspection: "Sep 5, 2024",
    nextInspection: "Mar 5, 2025",
    sensors: [
      { name: "Engine Temp", value: 25, unit: "°C", status: "Normal", trend: "stable" },
      { name: "Fuel Level", value: 85, unit: "%", status: "Normal", trend: "stable" },
      { name: "Battery Voltage", value: 24.2, unit: "V", status: "Normal", trend: "stable" },
      { name: "Oil Pressure", value: 0, unit: "PSI", status: "Normal", trend: "stable" },
    ],
    upcomingMaintenance: [
      { task: "Engine overhaul completion", dueDate: "Dec 12, 2024", priority: "High", assignedTo: "Bill Johnson" },
      { task: "Load bank testing", dueDate: "Dec 14, 2024", priority: "High", assignedTo: "Tom Harris" },
    ],
    operatingHours: 1250,
    yearInstalled: 2016,
  },
  {
    id: "rise-hvac-system",
    name: "RISE HVAC Central Plant",
    propertyId: "rise-training-center",
    companyId: "rise-basketball",
    companyName: "RISE Basketball",
    companyLogo: "/rise.png",
    status: "Online",
    operationalStatus: "Climate control active",
    efficiency: 88.5,
    powerOutput: "N/A",
    heatOutput: "4.5 MMBtu/hr",
    fuelType: "Electric/Gas Hybrid",
    capacity: "6.0 MMBtu/hr",
    location: "Calgary, AB",
    lastInspection: "Nov 1, 2024",
    nextInspection: "May 1, 2025",
    sensors: [
      { name: "Supply Air Temp", value: 72, unit: "°F", status: "Normal", trend: "stable" },
      { name: "Return Air Temp", value: 75, unit: "°F", status: "Normal", trend: "stable" },
      { name: "Humidity", value: 45, unit: "%", status: "Normal", trend: "stable" },
      { name: "Chiller Pressure", value: 185, unit: "PSI", status: "Normal", trend: "stable" },
      { name: "Refrigerant Level", value: 92, unit: "%", status: "Normal", trend: "stable" },
    ],
    upcomingMaintenance: [
      { task: "Filter replacement", dueDate: "Jan 5, 2025", priority: "Low", assignedTo: "Maintenance Staff" },
      { task: "Coil cleaning", dueDate: "Mar 15, 2025", priority: "Medium", assignedTo: "HVAC Contractor" },
    ],
    operatingHours: 22400,
    yearInstalled: 2015,
  },
];

export function getHeatPlantById(id: string): HeatPlant | undefined {
  return heatplants.find((plant) => plant.id === id);
}

export function getHeatPlantsByCompanyId(companyId: string): HeatPlant[] {
  return heatplants.filter((plant) => plant.companyId === companyId);
}

export function getAllHeatPlantIds(): string[] {
  return heatplants.map((plant) => plant.id);
}
