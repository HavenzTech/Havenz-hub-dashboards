// Centralized project data

export interface ProjectMilestone {
  name: string;
  status: "Completed" | "In Progress" | "Pending";
  dueDate: string;
}

export interface ProjectTeamMember {
  name: string;
  role: string;
  email: string;
}

export interface Project {
  id: string;
  name: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  companyLogoScale?: number;
  departmentId?: string;
  department: string;
  status: "Active" | "Completed" | "On Hold";
  progress: number;
  startDate: string;
  endDate: string;
  projectLead: string;
  budget: string;
  description?: string;
  milestones: ProjectMilestone[];
  teamMembers: ProjectTeamMember[];
}

export const projects: Project[] = [
  {
    id: "heat-plant-monitoring",
    name: "Heat Plant Monitoring",
    companyId: "energy-haven",
    companyName: "Energy Haven",
    companyLogo: "/energyhaven.png",
    departmentId: "energy-production",
    department: "Production",
    status: "Active",
    progress: 65,
    startDate: "Jan 2024",
    endDate: "Mar 2025",
    projectLead: "Mike R.",
    budget: "$85K",
    description: "Implementing a comprehensive monitoring system for the heat plant to track performance, efficiency, and maintenance needs in real-time.",
    milestones: [
      { name: "Requirements gathering", status: "Completed", dueDate: "Feb 2024" },
      { name: "Sensor installation", status: "Completed", dueDate: "Apr 2024" },
      { name: "Dashboard development", status: "In Progress", dueDate: "Oct 2024" },
      { name: "Integration testing", status: "Pending", dueDate: "Jan 2025" },
      { name: "Go-live", status: "Pending", dueDate: "Mar 2025" },
    ],
    teamMembers: [
      { name: "Mike Reynolds", role: "Project Lead", email: "mike.r@energyhaven.com" },
      { name: "Jennifer Adams", role: "Plant Specialist", email: "jennifer.a@energyhaven.com" },
      { name: "Alex Morgan", role: "Developer", email: "alex.m@havenztech.com" },
    ],
  },
  {
    id: "mobile-app-development",
    name: "Mobile App Development",
    companyId: "havenz-tech",
    companyName: "Havenz Tech",
    companyLogo: "/havenztech.png",
    departmentId: "havenztech-development",
    department: "Development",
    status: "Active",
    progress: 35,
    startDate: "Feb 2024",
    endDate: "Jun 2025",
    projectLead: "Alex M.",
    budget: "$120K",
    description: "Building a cross-platform mobile application for client management and service delivery.",
    milestones: [
      { name: "UI/UX Design", status: "Completed", dueDate: "Apr 2024" },
      { name: "Backend API", status: "In Progress", dueDate: "Aug 2024" },
      { name: "iOS Development", status: "In Progress", dueDate: "Dec 2024" },
      { name: "Android Development", status: "Pending", dueDate: "Mar 2025" },
      { name: "Beta Testing", status: "Pending", dueDate: "May 2025" },
      { name: "Launch", status: "Pending", dueDate: "Jun 2025" },
    ],
    teamMembers: [
      { name: "Alex Morgan", role: "Project Lead", email: "alex.m@havenztech.com" },
      { name: "Jordan Smith", role: "Full Stack Developer", email: "jordan.s@havenztech.com" },
      { name: "Casey Brown", role: "Frontend Developer", email: "casey.b@havenztech.com" },
      { name: "Taylor Wilson", role: "Backend Developer", email: "taylor.w@havenztech.com" },
    ],
  },
  {
    id: "dashboard-analytics",
    name: "Dashboard Analytics",
    companyId: "havenz-tech",
    companyName: "Havenz Tech",
    companyLogo: "/havenztech.png",
    departmentId: "havenztech-development",
    department: "Development",
    status: "Completed",
    progress: 100,
    startDate: "Nov 2023",
    endDate: "Feb 2025",
    projectLead: "Alex M.",
    budget: "$95K",
    description: "Created a comprehensive analytics dashboard for business intelligence and reporting.",
    milestones: [
      { name: "Requirements", status: "Completed", dueDate: "Dec 2023" },
      { name: "Design", status: "Completed", dueDate: "Jan 2024" },
      { name: "Development", status: "Completed", dueDate: "Oct 2024" },
      { name: "Testing", status: "Completed", dueDate: "Jan 2025" },
      { name: "Deployment", status: "Completed", dueDate: "Feb 2025" },
    ],
    teamMembers: [
      { name: "Alex Morgan", role: "Project Lead", email: "alex.m@havenztech.com" },
      { name: "Jordan Smith", role: "Developer", email: "jordan.s@havenztech.com" },
    ],
  },
  {
    id: "crop-yield-optimization",
    name: "Crop Yield Optimization",
    companyId: "agritech-haven",
    companyName: "Agritech Haven LP",
    companyLogo: "/ahi.png",
    companyLogoScale: 0.8,
    departmentId: "agritech-engineering",
    department: "Engineering",
    status: "Active",
    progress: 45,
    startDate: "Mar 2024",
    endDate: "Aug 2026",
    projectLead: "Sarah K.",
    budget: "$150K",
    description: "Developing AI-powered systems to analyze soil conditions, weather patterns, and crop health to maximize agricultural yield.",
    milestones: [
      { name: "Data collection setup", status: "Completed", dueDate: "May 2024" },
      { name: "ML model development", status: "In Progress", dueDate: "Dec 2024" },
      { name: "Field testing", status: "Pending", dueDate: "Jun 2025" },
      { name: "System integration", status: "Pending", dueDate: "Mar 2026" },
      { name: "Full deployment", status: "Pending", dueDate: "Aug 2026" },
    ],
    teamMembers: [
      { name: "Sarah Kim", role: "Project Lead", email: "sarah.k@agritechhaven.com" },
      { name: "Mike Chen", role: "Systems Engineer", email: "mike.c@agritechhaven.com" },
      { name: "Emily Brown", role: "Agricultural Engineer", email: "emily.b@agritechhaven.com" },
    ],
  },
  {
    id: "player-stats-tracker",
    name: "Player Stats Tracker",
    companyId: "rise-basketball",
    companyName: "RISE Basketball",
    companyLogo: "/rise.png",
    departmentId: "rise-player-dev",
    department: "Player Dev",
    status: "Active",
    progress: 70,
    startDate: "Dec 2023",
    endDate: "Apr 2025",
    projectLead: "Marcus J.",
    budget: "$45K",
    description: "Building a comprehensive player statistics tracking system for performance analysis and development planning.",
    milestones: [
      { name: "Requirements & Design", status: "Completed", dueDate: "Jan 2024" },
      { name: "Core tracking system", status: "Completed", dueDate: "May 2024" },
      { name: "Analytics dashboard", status: "In Progress", dueDate: "Nov 2024" },
      { name: "Mobile app integration", status: "Pending", dueDate: "Feb 2025" },
      { name: "Coach portal", status: "Pending", dueDate: "Apr 2025" },
    ],
    teamMembers: [
      { name: "Marcus Johnson", role: "Project Lead", email: "marcus.j@risebasketball.com" },
      { name: "Tanya Williams", role: "Performance Analyst", email: "tanya.w@risebasketball.com" },
      { name: "Jordan Smith", role: "Developer", email: "jordan.s@havenztech.com" },
    ],
  },
  {
    id: "insurance-portal",
    name: "Insurance Portal",
    companyId: "havensure",
    companyName: "HavenSure",
    companyLogo: "/havensure.png",
    companyLogoScale: 1.4,
    department: "Operations",
    status: "Active",
    progress: 25,
    startDate: "Apr 2024",
    endDate: "Sep 2026",
    projectLead: "Jane P.",
    budget: "$200K",
    description: "Developing a modern insurance portal for policy management, claims processing, and customer self-service.",
    milestones: [
      { name: "Market research", status: "Completed", dueDate: "May 2024" },
      { name: "Platform architecture", status: "In Progress", dueDate: "Oct 2024" },
      { name: "Customer portal", status: "Pending", dueDate: "Apr 2025" },
      { name: "Claims system", status: "Pending", dueDate: "Dec 2025" },
      { name: "Full launch", status: "Pending", dueDate: "Sep 2026" },
    ],
    teamMembers: [
      { name: "Jane Park", role: "Project Lead", email: "jane.p@havensure.com" },
      { name: "Alex Morgan", role: "Technical Advisor", email: "alex.m@havenztech.com" },
    ],
  },
  {
    id: "equipment-maintenance-system",
    name: "Equipment Maintenance System",
    companyId: "energy-haven",
    companyName: "Energy Haven",
    companyLogo: "/energyhaven.png",
    departmentId: "energy-maintenance",
    department: "Maintenance",
    status: "On Hold",
    progress: 15,
    startDate: "Jan 2024",
    endDate: "TBD",
    projectLead: "Tom H.",
    budget: "$65K",
    description: "Creating a preventive maintenance tracking system for all plant equipment. Currently on hold pending budget approval.",
    milestones: [
      { name: "Initial planning", status: "Completed", dueDate: "Feb 2024" },
      { name: "Vendor selection", status: "In Progress", dueDate: "TBD" },
      { name: "Implementation", status: "Pending", dueDate: "TBD" },
      { name: "Training", status: "Pending", dueDate: "TBD" },
    ],
    teamMembers: [
      { name: "Tom Harris", role: "Project Lead", email: "tom.h@energyhaven.com" },
      { name: "Bill Johnson", role: "Senior Technician", email: "bill.j@energyhaven.com" },
    ],
  },
  {
    id: "inventory-management",
    name: "Inventory Management",
    companyId: "agritech-haven",
    companyName: "Agritech Haven LP",
    companyLogo: "/ahi.png",
    companyLogoScale: 0.8,
    departmentId: "agritech-operations",
    department: "Operations",
    status: "Active",
    progress: 80,
    startDate: "Oct 2023",
    endDate: "Mar 2025",
    projectLead: "John D.",
    budget: "$55K",
    description: "Implementing a modern inventory tracking system for agricultural supplies, equipment, and produce.",
    milestones: [
      { name: "System selection", status: "Completed", dueDate: "Nov 2023" },
      { name: "Data migration", status: "Completed", dueDate: "Feb 2024" },
      { name: "Staff training", status: "Completed", dueDate: "May 2024" },
      { name: "Barcode integration", status: "In Progress", dueDate: "Dec 2024" },
      { name: "Full rollout", status: "Pending", dueDate: "Mar 2025" },
    ],
    teamMembers: [
      { name: "John Davidson", role: "Project Lead", email: "john.d@agritechhaven.com" },
      { name: "Maria Santos", role: "Operations Manager", email: "maria.s@agritechhaven.com" },
      { name: "David Lee", role: "Logistics Coordinator", email: "david.l@agritechhaven.com" },
    ],
  },
  {
    id: "financial-dashboard",
    name: "Financial Dashboard",
    companyId: "ledgion",
    companyName: "Ledgion",
    companyLogo: "/ledgion.png",
    companyLogoScale: 1.2,
    department: "Finance",
    status: "Active",
    progress: 50,
    startDate: "Feb 2024",
    endDate: "May 2027",
    projectLead: "Jane P.",
    budget: "$75K",
    description: "Building a comprehensive financial dashboard for real-time reporting, budgeting, and forecasting.",
    milestones: [
      { name: "Requirements gathering", status: "Completed", dueDate: "Mar 2024" },
      { name: "Data integration", status: "Completed", dueDate: "Jul 2024" },
      { name: "Dashboard v1", status: "In Progress", dueDate: "Jan 2025" },
      { name: "Advanced analytics", status: "Pending", dueDate: "Sep 2025" },
      { name: "AI forecasting", status: "Pending", dueDate: "May 2027" },
    ],
    teamMembers: [
      { name: "Jane Park", role: "Project Lead", email: "jane.p@ledgion.com" },
      { name: "Taylor Wilson", role: "Developer", email: "taylor.w@havenztech.com" },
    ],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getProjectsByCompanyId(companyId: string): Project[] {
  return projects.filter((project) => project.companyId === companyId);
}

export function getProjectsByDepartmentId(departmentId: string): Project[] {
  return projects.filter((project) => project.departmentId === departmentId);
}

export function getAllProjectIds(): string[] {
  return projects.map((project) => project.id);
}
