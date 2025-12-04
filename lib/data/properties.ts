// Centralized property data

export interface MaintenanceRecord {
  date: string;
  description: string;
  cost: string;
}

export interface Property {
  id: string;
  name: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  companyLogoScale?: number;
  status: "Operational" | "Under Maintenance" | "Inactive";
  type: string;
  location: string;
  address?: string;
  size: string;
  acquired: number;
  description?: string;
  features?: string[];
  maintenanceHistory?: MaintenanceRecord[];
}

export const properties: Property[] = [
  {
    id: "heat-power-plant",
    name: "Heat & Power Plant",
    companyId: "agritech-haven",
    companyName: "Agritech Haven LP",
    companyLogo: "/ahi.png",
    companyLogoScale: 0.8,
    status: "Operational",
    type: "Power Plant",
    location: "Red Deer, AB",
    address: "4521 Industrial Way, Red Deer, AB T4N 6X2",
    size: "15,000 sqft",
    acquired: 2018,
    description: "Combined heat and power generation facility providing energy for agricultural operations and nearby facilities. Features state-of-the-art monitoring systems.",
    features: [
      "Natural gas powered generators",
      "Heat recovery systems",
      "Real-time monitoring dashboard",
      "Emergency backup systems",
      "Environmental compliance certified",
    ],
    maintenanceHistory: [
      { date: "Nov 2024", description: "Annual turbine inspection", cost: "$12,500" },
      { date: "Aug 2024", description: "Heat exchanger cleaning", cost: "$3,200" },
      { date: "Mar 2024", description: "Control system upgrade", cost: "$28,000" },
    ],
  },
  {
    id: "corporate-headquarters",
    name: "Corporate Headquarters",
    companyId: "agritech-haven",
    companyName: "Agritech Haven LP",
    companyLogo: "/ahi.png",
    companyLogoScale: 0.8,
    status: "Operational",
    type: "Office",
    location: "Red Deer, AB",
    address: "1200 Main Street, Red Deer, AB T4N 1A1",
    size: "8,500 sqft",
    acquired: 2013,
    description: "Main administrative office for Agritech Haven LP, housing executive leadership, finance, and operations teams.",
    features: [
      "Modern open-concept workspace",
      "Conference facilities",
      "Employee lounge and kitchen",
      "Secure parking",
      "High-speed fiber connectivity",
    ],
    maintenanceHistory: [
      { date: "Oct 2024", description: "HVAC system service", cost: "$2,800" },
      { date: "Jun 2024", description: "Parking lot resurfacing", cost: "$15,000" },
    ],
  },
  {
    id: "rise-training-center",
    name: "RISE Training Center",
    companyId: "rise-basketball",
    companyName: "RISE Basketball",
    companyLogo: "/rise.png",
    status: "Operational",
    type: "Sports Facility",
    location: "Calgary, AB",
    address: "8900 Sports Drive, Calgary, AB T2P 3K4",
    size: "25,000 sqft",
    acquired: 2015,
    description: "Premier basketball training facility featuring multiple courts, weight room, and performance analysis center for athlete development.",
    features: [
      "3 full-size basketball courts",
      "Professional weight training room",
      "Video analysis suite",
      "Physical therapy room",
      "Player locker rooms",
      "Spectator seating for 200",
    ],
    maintenanceHistory: [
      { date: "Sep 2024", description: "Court resurfacing", cost: "$45,000" },
      { date: "Jul 2024", description: "HVAC upgrade for humidity control", cost: "$18,500" },
      { date: "Feb 2024", description: "Lighting system LED conversion", cost: "$12,000" },
    ],
  },
  {
    id: "energy-hub-facility",
    name: "Energy Hub Facility",
    companyId: "energy-haven",
    companyName: "Energy Haven",
    companyLogo: "/energyhaven.png",
    status: "Operational",
    type: "Industrial",
    location: "Calgary, AB",
    address: "5500 Energy Park Way, Calgary, AB T2E 8M4",
    size: "32,000 sqft",
    acquired: 2019,
    description: "Central operations hub for Energy Haven's power distribution and management services, featuring advanced control rooms and equipment storage.",
    features: [
      "24/7 operations control center",
      "Equipment testing lab",
      "Large vehicle bay",
      "Secure materials storage",
      "Emergency operations center",
    ],
    maintenanceHistory: [
      { date: "Nov 2024", description: "Security system upgrade", cost: "$22,000" },
      { date: "May 2024", description: "Roof inspection and repairs", cost: "$8,500" },
    ],
  },
  {
    id: "tech-innovation-lab",
    name: "Tech Innovation Lab",
    companyId: "havenz-tech",
    companyName: "Havenz Tech",
    companyLogo: "/havenztech.png",
    status: "Operational",
    type: "Office/Lab",
    location: "Calgary, AB",
    address: "2100 Innovation Boulevard, Calgary, AB T2N 4V8",
    size: "4,200 sqft",
    acquired: 2025,
    description: "Newly acquired technology workspace featuring development labs, testing facilities, and collaborative workspaces for the Havenz Tech team.",
    features: [
      "Software development stations",
      "Hardware prototyping lab",
      "Server room",
      "Collaborative meeting spaces",
      "Video conferencing setup",
    ],
    maintenanceHistory: [],
  },
  {
    id: "agricultural-warehouse",
    name: "Agricultural Warehouse",
    companyId: "agritech-haven",
    companyName: "Agritech Haven LP",
    companyLogo: "/ahi.png",
    companyLogoScale: 0.8,
    status: "Under Maintenance",
    type: "Warehouse",
    location: "Red Deer, AB",
    address: "6200 Industrial Road, Red Deer, AB T4N 7B3",
    size: "45,000 sqft",
    acquired: 2016,
    description: "Large-scale storage facility for agricultural equipment, supplies, and harvested goods. Currently undergoing structural improvements.",
    features: [
      "Climate-controlled sections",
      "Loading docks (6 bays)",
      "Forklift accessible aisles",
      "Inventory tracking system",
      "Fire suppression system",
    ],
    maintenanceHistory: [
      { date: "Dec 2024", description: "Structural reinforcement (ongoing)", cost: "$85,000" },
      { date: "Oct 2024", description: "Electrical panel upgrade", cost: "$12,000" },
      { date: "Aug 2024", description: "Roof leak repairs", cost: "$6,500" },
    ],
  },
];

export function getPropertyById(id: string): Property | undefined {
  return properties.find((property) => property.id === id);
}

export function getPropertiesByCompanyId(companyId: string): Property[] {
  return properties.filter((property) => property.companyId === companyId);
}

export function getAllPropertyIds(): string[] {
  return properties.map((property) => property.id);
}
