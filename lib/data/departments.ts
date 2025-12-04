// Centralized department data

export interface TeamMember {
  name: string;
  role: string;
  email: string;
  phone?: string;
}

export interface DepartmentProject {
  name: string;
  status: "Active" | "Completed" | "On Hold";
  progress: number;
  startDate: string;
  endDate: string;
  budget: string;
}

export interface Department {
  id: string;
  name: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  companyLogoScale?: number;
  status: "Active" | "Inactive";
  ledBy: string;
  employees: number;
  budget: string;
  activeProjects: number;
  description?: string;
  teamMembers: TeamMember[];
  projects: DepartmentProject[];
}

export const departments: Department[] = [
  // Agritech Haven departments
  {
    id: "agritech-operations",
    name: "Operations",
    companyId: "agritech-haven",
    companyName: "Agritech Haven LP",
    companyLogo: "/ahi.png",
    companyLogoScale: 0.8,
    status: "Active",
    ledBy: "John Davidson",
    employees: 11,
    budget: "$250K",
    activeProjects: 3,
    description: "Manages day-to-day operations, logistics, and supply chain for agricultural activities.",
    teamMembers: [
      { name: "John Davidson", role: "Director of Operations", email: "john.d@agritechhaven.com", phone: "403-555-0101" },
      { name: "Maria Santos", role: "Operations Manager", email: "maria.s@agritechhaven.com", phone: "403-555-0102" },
      { name: "David Lee", role: "Logistics Coordinator", email: "david.l@agritechhaven.com" },
      { name: "Sarah Miller", role: "Inventory Specialist", email: "sarah.m@agritechhaven.com" },
      { name: "James Wilson", role: "Quality Control", email: "james.w@agritechhaven.com" },
    ],
    projects: [
      { name: "Inventory Management", status: "Active", progress: 80, startDate: "Oct 2023", endDate: "Mar 2025", budget: "$55K" },
      { name: "Supply Chain Optimization", status: "Active", progress: 45, startDate: "Jan 2024", endDate: "Dec 2025", budget: "$75K" },
      { name: "Warehouse Automation", status: "On Hold", progress: 20, startDate: "Mar 2024", endDate: "TBD", budget: "$120K" },
    ],
  },
  {
    id: "agritech-engineering",
    name: "Engineering",
    companyId: "agritech-haven",
    companyName: "Agritech Haven LP",
    companyLogo: "/ahi.png",
    companyLogoScale: 0.8,
    status: "Active",
    ledBy: "Sarah Kim",
    employees: 5,
    budget: "$180K",
    activeProjects: 2,
    description: "Develops and maintains agricultural technology systems and infrastructure.",
    teamMembers: [
      { name: "Sarah Kim", role: "Lead Engineer", email: "sarah.k@agritechhaven.com", phone: "403-555-0201" },
      { name: "Mike Chen", role: "Systems Engineer", email: "mike.c@agritechhaven.com" },
      { name: "Emily Brown", role: "Agricultural Engineer", email: "emily.b@agritechhaven.com" },
      { name: "Tom Roberts", role: "Automation Specialist", email: "tom.r@agritechhaven.com" },
      { name: "Lisa Park", role: "Junior Engineer", email: "lisa.p@agritechhaven.com" },
    ],
    projects: [
      { name: "Crop Yield Optimization", status: "Active", progress: 45, startDate: "Mar 2024", endDate: "Aug 2026", budget: "$150K" },
      { name: "Sensor Network Upgrade", status: "Active", progress: 60, startDate: "Jun 2024", endDate: "Feb 2025", budget: "$30K" },
    ],
  },
  {
    id: "agritech-administration",
    name: "Administration",
    companyId: "agritech-haven",
    companyName: "Agritech Haven LP",
    companyLogo: "/ahi.png",
    companyLogoScale: 0.8,
    status: "Active",
    ledBy: "Lisa Chen",
    employees: 3,
    budget: "$80K",
    activeProjects: 1,
    description: "Handles administrative tasks, HR, and corporate communications.",
    teamMembers: [
      { name: "Lisa Chen", role: "Office Manager", email: "lisa.c@agritechhaven.com", phone: "403-555-0301" },
      { name: "Amanda White", role: "HR Coordinator", email: "amanda.w@agritechhaven.com" },
      { name: "Kevin Scott", role: "Administrative Assistant", email: "kevin.s@agritechhaven.com" },
    ],
    projects: [
      { name: "HR System Migration", status: "Active", progress: 70, startDate: "Sep 2024", endDate: "Jan 2025", budget: "$25K" },
    ],
  },

  // Energy Haven departments
  {
    id: "energy-production",
    name: "Production",
    companyId: "energy-haven",
    companyName: "Energy Haven",
    companyLogo: "/energyhaven.png",
    status: "Active",
    ledBy: "Mike Reynolds",
    employees: 45,
    budget: "$500K",
    activeProjects: 5,
    description: "Oversees all energy production operations and plant management.",
    teamMembers: [
      { name: "Mike Reynolds", role: "Production Director", email: "mike.r@energyhaven.com", phone: "403-555-0401" },
      { name: "Jennifer Adams", role: "Plant Manager", email: "jennifer.a@energyhaven.com", phone: "403-555-0402" },
      { name: "Robert Garcia", role: "Shift Supervisor", email: "robert.g@energyhaven.com" },
      { name: "Nancy Taylor", role: "Production Analyst", email: "nancy.t@energyhaven.com" },
      { name: "Chris Martin", role: "Control Room Operator", email: "chris.m@energyhaven.com" },
    ],
    projects: [
      { name: "Heat Plant Monitoring", status: "Active", progress: 65, startDate: "Jan 2024", endDate: "Mar 2025", budget: "$85K" },
      { name: "Efficiency Optimization", status: "Active", progress: 40, startDate: "Apr 2024", endDate: "Oct 2025", budget: "$120K" },
      { name: "Safety System Upgrade", status: "Completed", progress: 100, startDate: "Jan 2024", endDate: "Aug 2024", budget: "$95K" },
    ],
  },
  {
    id: "energy-maintenance",
    name: "Maintenance",
    companyId: "energy-haven",
    companyName: "Energy Haven",
    companyLogo: "/energyhaven.png",
    status: "Active",
    ledBy: "Tom Harris",
    employees: 12,
    budget: "$220K",
    activeProjects: 4,
    description: "Maintains all equipment and infrastructure for energy production facilities.",
    teamMembers: [
      { name: "Tom Harris", role: "Maintenance Manager", email: "tom.h@energyhaven.com", phone: "403-555-0501" },
      { name: "Bill Johnson", role: "Senior Technician", email: "bill.j@energyhaven.com" },
      { name: "Steve Williams", role: "Electrician", email: "steve.w@energyhaven.com" },
      { name: "Mark Davis", role: "Mechanical Tech", email: "mark.d@energyhaven.com" },
    ],
    projects: [
      { name: "Equipment Maintenance System", status: "On Hold", progress: 15, startDate: "Jan 2024", endDate: "TBD", budget: "$65K" },
      { name: "Preventive Maintenance Program", status: "Active", progress: 55, startDate: "Mar 2024", endDate: "Dec 2024", budget: "$45K" },
    ],
  },
  {
    id: "energy-legal",
    name: "Legal & Compliance",
    companyId: "energy-haven",
    companyName: "Energy Haven",
    companyLogo: "/energyhaven.png",
    status: "Active",
    ledBy: "Emma Wright",
    employees: 2,
    budget: "$150K",
    activeProjects: 1,
    description: "Ensures regulatory compliance and handles legal matters for energy operations.",
    teamMembers: [
      { name: "Emma Wright", role: "Legal Counsel", email: "emma.w@energyhaven.com", phone: "403-555-0601" },
      { name: "Paul Anderson", role: "Compliance Officer", email: "paul.a@energyhaven.com" },
    ],
    projects: [
      { name: "Regulatory Compliance Audit", status: "Active", progress: 30, startDate: "Jun 2024", endDate: "Mar 2025", budget: "$40K" },
    ],
  },

  // RISE Basketball departments
  {
    id: "rise-coaching",
    name: "Coaching",
    companyId: "rise-basketball",
    companyName: "RISE Basketball",
    companyLogo: "/rise.png",
    status: "Active",
    ledBy: "Chris Lopez",
    employees: 8,
    budget: "$120K",
    activeProjects: 2,
    description: "Provides basketball training and coaching for all player levels.",
    teamMembers: [
      { name: "Chris Lopez", role: "Head Coach", email: "chris.l@risebasketball.com", phone: "403-555-0701" },
      { name: "Derek Thomas", role: "Assistant Coach", email: "derek.t@risebasketball.com" },
      { name: "Angela Moore", role: "Youth Coach", email: "angela.m@risebasketball.com" },
      { name: "Ryan Clark", role: "Skills Trainer", email: "ryan.c@risebasketball.com" },
    ],
    projects: [
      { name: "Summer Camp Program", status: "Active", progress: 85, startDate: "Mar 2024", endDate: "Aug 2024", budget: "$35K" },
      { name: "Training Curriculum Update", status: "Active", progress: 50, startDate: "Jan 2024", endDate: "Dec 2024", budget: "$15K" },
    ],
  },
  {
    id: "rise-player-dev",
    name: "Player Development",
    companyId: "rise-basketball",
    companyName: "RISE Basketball",
    companyLogo: "/rise.png",
    status: "Active",
    ledBy: "Marcus Johnson",
    employees: 6,
    budget: "$95K",
    activeProjects: 3,
    description: "Focuses on individual player growth, analytics, and performance tracking.",
    teamMembers: [
      { name: "Marcus Johnson", role: "Player Dev Director", email: "marcus.j@risebasketball.com", phone: "403-555-0801" },
      { name: "Tanya Williams", role: "Performance Analyst", email: "tanya.w@risebasketball.com" },
      { name: "Brandon Lee", role: "Strength Coach", email: "brandon.l@risebasketball.com" },
      { name: "Jessica Hall", role: "Sports Psychologist", email: "jessica.h@risebasketball.com" },
    ],
    projects: [
      { name: "Player Stats Tracker", status: "Active", progress: 70, startDate: "Dec 2023", endDate: "Apr 2025", budget: "$45K" },
      { name: "Video Analysis System", status: "Active", progress: 35, startDate: "May 2024", endDate: "Nov 2024", budget: "$20K" },
      { name: "Fitness Assessment Program", status: "Completed", progress: 100, startDate: "Jan 2024", endDate: "Jun 2024", budget: "$10K" },
    ],
  },
  {
    id: "rise-operations",
    name: "Operations",
    companyId: "rise-basketball",
    companyName: "RISE Basketball",
    companyLogo: "/rise.png",
    status: "Active",
    ledBy: "Diana Ross",
    employees: 4,
    budget: "$60K",
    activeProjects: 1,
    description: "Manages facility operations, scheduling, and event coordination.",
    teamMembers: [
      { name: "Diana Ross", role: "Operations Manager", email: "diana.r@risebasketball.com", phone: "403-555-0901" },
      { name: "Kyle Mitchell", role: "Facility Coordinator", email: "kyle.m@risebasketball.com" },
      { name: "Samantha Green", role: "Event Planner", email: "samantha.g@risebasketball.com" },
      { name: "Eric Turner", role: "Equipment Manager", email: "eric.t@risebasketball.com" },
    ],
    projects: [
      { name: "Facility Booking System", status: "Active", progress: 60, startDate: "Apr 2024", endDate: "Oct 2024", budget: "$25K" },
    ],
  },

  // Havenz Tech departments
  {
    id: "havenztech-development",
    name: "Development",
    companyId: "havenz-tech",
    companyName: "Havenz Tech",
    companyLogo: "/havenztech.png",
    status: "Active",
    ledBy: "Alex Morgan",
    employees: 5,
    budget: "$150K",
    activeProjects: 4,
    description: "Builds software products and provides custom development services.",
    teamMembers: [
      { name: "Alex Morgan", role: "Lead Developer", email: "alex.m@havenztech.com", phone: "403-555-1001" },
      { name: "Jordan Smith", role: "Full Stack Developer", email: "jordan.s@havenztech.com" },
      { name: "Casey Brown", role: "Frontend Developer", email: "casey.b@havenztech.com" },
      { name: "Taylor Wilson", role: "Backend Developer", email: "taylor.w@havenztech.com" },
      { name: "Morgan Davis", role: "Junior Developer", email: "morgan.d@havenztech.com" },
    ],
    projects: [
      { name: "Mobile App Development", status: "Active", progress: 35, startDate: "Feb 2024", endDate: "Jun 2025", budget: "$120K" },
      { name: "Dashboard Analytics", status: "Completed", progress: 100, startDate: "Nov 2023", endDate: "Feb 2025", budget: "$95K" },
      { name: "API Integration Platform", status: "Active", progress: 55, startDate: "Apr 2024", endDate: "Sep 2024", budget: "$40K" },
      { name: "Cloud Migration", status: "Active", progress: 25, startDate: "Jul 2024", endDate: "Jan 2025", budget: "$60K" },
    ],
  },
  {
    id: "havenztech-sales",
    name: "Sales",
    companyId: "havenz-tech",
    companyName: "Havenz Tech",
    companyLogo: "/havenztech.png",
    status: "Active",
    ledBy: "Jane Park",
    employees: 3,
    budget: "$90K",
    activeProjects: 2,
    description: "Handles client acquisition, partnerships, and business development.",
    teamMembers: [
      { name: "Jane Park", role: "Sales Director", email: "jane.p@havenztech.com", phone: "403-555-1101" },
      { name: "Michael Torres", role: "Account Executive", email: "michael.t@havenztech.com" },
      { name: "Rachel Kim", role: "Business Development", email: "rachel.k@havenztech.com" },
    ],
    projects: [
      { name: "CRM Implementation", status: "Active", progress: 70, startDate: "May 2024", endDate: "Sep 2024", budget: "$30K" },
      { name: "Partner Program Launch", status: "Active", progress: 45, startDate: "Jun 2024", endDate: "Dec 2024", budget: "$25K" },
    ],
  },
];

export function getDepartmentById(id: string): Department | undefined {
  return departments.find((dept) => dept.id === id);
}

export function getDepartmentsByCompanyId(companyId: string): Department[] {
  return departments.filter((dept) => dept.companyId === companyId);
}

export function getAllDepartmentIds(): string[] {
  return departments.map((dept) => dept.id);
}
