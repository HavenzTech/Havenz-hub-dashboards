// Centralized company data with properties and projects

export interface CompanyProperty {
  name: string;
  companyLogo: string;
  companyLogoScale?: number;
  status: "Operational" | "Under Maintenance" | "Inactive";
  type: string;
  location: string;
  size: string;
  acquired: number;
}

export interface CompanyProject {
  name: string;
  status: "Active" | "Completed" | "On Hold";
  progress: number;
  startDate: string;
  endDate: string;
  projectLead: string;
  budget: string;
  department: string;
}

export interface Company {
  id: string;
  name: string;
  logoSrc: string;
  logoScale?: number;
  status: "Active" | "Inactive";
  revenue: string;
  location: string;
  industry: string;
  employees: number;
  founded: number;
  description?: string;
  properties: CompanyProperty[];
  projects: CompanyProject[];
}

export const companies: Company[] = [
  {
    id: "agritech-haven",
    name: "Agritech Haven LP",
    logoSrc: "/ahi.png",
    logoScale: 0.8,
    status: "Active",
    revenue: "$4.2M",
    location: "Red Deer, AB",
    industry: "Agriculture",
    employees: 28,
    founded: 2013,
    description: "Leading agricultural technology and farming operations company.",
    properties: [
      {
        name: "Heat & Power Plant",
        companyLogo: "/ahi.png",
        companyLogoScale: 0.8,
        status: "Operational",
        type: "Power Plant",
        location: "Red Deer, AB",
        size: "15,000 sqft",
        acquired: 2018,
      },
      {
        name: "Corporate Headquarters",
        companyLogo: "/ahi.png",
        companyLogoScale: 0.8,
        status: "Operational",
        type: "Office",
        location: "Red Deer, AB",
        size: "8,500 sqft",
        acquired: 2013,
      },
      {
        name: "Agricultural Warehouse",
        companyLogo: "/ahi.png",
        companyLogoScale: 0.8,
        status: "Under Maintenance",
        type: "Warehouse",
        location: "Red Deer, AB",
        size: "45,000 sqft",
        acquired: 2016,
      },
    ],
    projects: [
      {
        name: "Crop Yield Optimization",
        status: "Active",
        progress: 45,
        startDate: "Mar 2024",
        endDate: "Aug 2026",
        projectLead: "Sarah K.",
        budget: "$150K",
        department: "Engineering",
      },
      {
        name: "Inventory Management",
        status: "Active",
        progress: 80,
        startDate: "Oct 2023",
        endDate: "Mar 2025",
        projectLead: "John D.",
        budget: "$55K",
        department: "Operations",
      },
    ],
  },
  {
    id: "havenz-tech",
    name: "Havenz Tech",
    logoSrc: "/havenztech.png",
    status: "Active",
    revenue: "$1.8M",
    location: "Calgary, AB",
    industry: "Technology",
    employees: 5,
    founded: 2025,
    description: "Innovative technology solutions and software development.",
    properties: [
      {
        name: "Tech Innovation Lab",
        companyLogo: "/havenztech.png",
        status: "Operational",
        type: "Office/Lab",
        location: "Calgary, AB",
        size: "4,200 sqft",
        acquired: 2025,
      },
    ],
    projects: [
      {
        name: "Mobile App Development",
        status: "Active",
        progress: 35,
        startDate: "Feb 2024",
        endDate: "Jun 2025",
        projectLead: "Alex M.",
        budget: "$120K",
        department: "Development",
      },
      {
        name: "Dashboard Analytics",
        status: "Completed",
        progress: 100,
        startDate: "Nov 2023",
        endDate: "Feb 2025",
        projectLead: "Alex M.",
        budget: "$95K",
        department: "Development",
      },
    ],
  },
  {
    id: "rise-basketball",
    name: "RISE Basketball",
    logoSrc: "/rise.png",
    status: "Active",
    revenue: "$850K",
    location: "Calgary, AB",
    industry: "Sports",
    employees: 62,
    founded: 2012,
    description: "Youth basketball training and development program.",
    properties: [
      {
        name: "RISE Training Center",
        companyLogo: "/rise.png",
        status: "Operational",
        type: "Sports Facility",
        location: "Calgary, AB",
        size: "25,000 sqft",
        acquired: 2015,
      },
    ],
    projects: [
      {
        name: "Player Stats Tracker",
        status: "Active",
        progress: 70,
        startDate: "Dec 2023",
        endDate: "Apr 2025",
        projectLead: "Marcus J.",
        budget: "$45K",
        department: "Player Dev",
      },
    ],
  },
  {
    id: "energy-haven",
    name: "Energy Haven",
    logoSrc: "/energyhaven.png",
    status: "Active",
    revenue: "$12.5M",
    location: "Calgary, AB",
    industry: "Energy",
    employees: 45,
    founded: 2016,
    description: "Sustainable energy solutions and power generation.",
    properties: [
      {
        name: "Energy Hub Facility",
        companyLogo: "/energyhaven.png",
        status: "Operational",
        type: "Industrial",
        location: "Calgary, AB",
        size: "32,000 sqft",
        acquired: 2019,
      },
    ],
    projects: [
      {
        name: "Heat Plant Monitoring",
        status: "Active",
        progress: 65,
        startDate: "Jan 2024",
        endDate: "Mar 2025",
        projectLead: "Mike R.",
        budget: "$85K",
        department: "Production",
      },
      {
        name: "Equipment Maintenance System",
        status: "On Hold",
        progress: 15,
        startDate: "Jan 2024",
        endDate: "TBD",
        projectLead: "Tom H.",
        budget: "$65K",
        department: "Maintenance",
      },
    ],
  },
  {
    id: "havensure",
    name: "HavenSure",
    logoSrc: "/havensure.png",
    logoScale: 1.4,
    status: "Active",
    revenue: "$3.2M",
    location: "Calgary, AB",
    industry: "Insurance",
    employees: 18,
    founded: 2025,
    description: "Modern insurance solutions for businesses and individuals.",
    properties: [],
    projects: [
      {
        name: "Insurance Portal",
        status: "Active",
        progress: 25,
        startDate: "Apr 2024",
        endDate: "Sep 2026",
        projectLead: "Jane P.",
        budget: "$200K",
        department: "Operations",
      },
    ],
  },
  {
    id: "ledgion",
    name: "Ledgion",
    logoSrc: "/ledgion.png",
    logoScale: 1.2,
    status: "Active",
    revenue: "$950K",
    location: "Calgary, AB",
    industry: "Finance",
    employees: 6,
    founded: 2025,
    description: "Financial technology and accounting solutions.",
    properties: [],
    projects: [
      {
        name: "Financial Dashboard",
        status: "Active",
        progress: 50,
        startDate: "Feb 2024",
        endDate: "May 2027",
        projectLead: "Jane P.",
        budget: "$75K",
        department: "Finance",
      },
    ],
  },
];

export function getCompanyById(id: string): Company | undefined {
  return companies.find((company) => company.id === id);
}

export function getAllCompanyIds(): string[] {
  return companies.map((company) => company.id);
}
