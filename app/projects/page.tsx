"use client";

import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RotatingProjectCard } from "@/components/widgets/RotatingProjectCard";
import { BlurFade } from "@/components/ui/BlurFade";
import { COMPANY_NAME, COMPANY_LOGO, COMPANY_URL } from "@/lib/constants";

// All projects data
const allProjects = [
  {
    name: "Heat Plant Monitoring",
    companyName: "Energy Haven",
    companyLogo: "/energyhaven.png",
    status: "Active" as const,
    progress: 65,
    startDate: "Jan 2024",
    endDate: "Mar 2025",
    projectLead: "Mike R.",
    budget: "$85K",
    department: "Production",
  },
  {
    name: "Mobile App Development",
    companyName: "Havenz Tech",
    companyLogo: "/havenztech.png",
    status: "Active" as const,
    progress: 35,
    startDate: "Feb 2024",
    endDate: "Jun 2025",
    projectLead: "Alex M.",
    budget: "$120K",
    department: "Development",
  },
  {
    name: "Dashboard Analytics",
    companyName: "Havenz Tech",
    companyLogo: "/havenztech.png",
    status: "Completed" as const,
    progress: 100,
    startDate: "Nov 2023",
    endDate: "Feb 2025",
    projectLead: "Alex M.",
    budget: "$95K",
    department: "Development",
  },
  {
    name: "Crop Yield Optimization",
    companyName: "Agritech Haven LP",
    companyLogo: "/ahi.png",
    companyLogoScale: 0.8,
    status: "Active" as const,
    progress: 45,
    startDate: "Mar 2024",
    endDate: "Aug 2026",
    projectLead: "Sarah K.",
    budget: "$150K",
    department: "Engineering",
  },
  {
    name: "Player Stats Tracker",
    companyName: "RISE Basketball",
    companyLogo: "/rise.png",
    status: "Active" as const,
    progress: 70,
    startDate: "Dec 2023",
    endDate: "Apr 2025",
    projectLead: "Marcus J.",
    budget: "$45K",
    department: "Player Dev",
  },
  {
    name: "Insurance Portal",
    companyName: "HavenSure",
    companyLogo: "/havensure.png",
    companyLogoScale: 1.4,
    status: "Active" as const,
    progress: 25,
    startDate: "Apr 2024",
    endDate: "Sep 2026",
    projectLead: "Jane P.",
    budget: "$200K",
    department: "Operations",
  },
  {
    name: "Equipment Maintenance System",
    companyName: "Energy Haven",
    companyLogo: "/energyhaven.png",
    status: "On Hold" as const,
    progress: 15,
    startDate: "Jan 2024",
    endDate: "TBD",
    projectLead: "Tom H.",
    budget: "$65K",
    department: "Maintenance",
  },
  {
    name: "Inventory Management",
    companyName: "Agritech Haven LP",
    companyLogo: "/ahi.png",
    companyLogoScale: 0.8,
    status: "Active" as const,
    progress: 80,
    startDate: "Oct 2023",
    endDate: "Mar 2025",
    projectLead: "John D.",
    budget: "$55K",
    department: "Operations",
  },
  {
    name: "Financial Dashboard",
    companyName: "Ledgion",
    companyLogo: "/ledgion.png",
    companyLogoScale: 1.2,
    status: "Active" as const,
    progress: 50,
    startDate: "Feb 2024",
    endDate: "May 2027",
    projectLead: "Jane P.",
    budget: "$75K",
    department: "Finance",
  },
];

// Shuffle array to get different starting points for each row
const shuffleArray = <T,>(array: T[], seed: number): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = (seed + i) % result.length;
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

// Create different orderings for each row
const row1Projects = shuffleArray(allProjects, 0);
const row2Projects = shuffleArray(allProjects, 3);
const row3Projects = shuffleArray(allProjects, 6);

export default function ProjectsPage() {
  // Animation timing configuration (in ms)
  const ANIMATION_DELAYS = {
    header: 0,
    title: 600,
    row1: 700,
    row2: 800,
    row3: 900,
  };

  return (
    <Container>
      <Header
        companyName={COMPANY_NAME}
        companyUrl={COMPANY_URL}
        logoSrc={COMPANY_LOGO}
        className="mb-4"
        baseDelay={ANIMATION_DELAYS.header}
      />
      <div className="flex flex-col flex-1 gap-6 overflow-hidden">
        <SectionTitle animated delay={ANIMATION_DELAYS.title}>Projects</SectionTitle>

        {/* 3 Rows */}
        <div className="flex flex-col gap-2 flex-1">
          {/* Row 1 */}
          <div className="flex-1 flex items-center">
            <BlurFade delay={ANIMATION_DELAYS.row1} duration={600} yOffset={16} className="w-full">
              <RotatingProjectCard
                projects={row1Projects}
                rotateInterval={15000}
                initialDelay={0}
              />
            </BlurFade>
          </div>

          {/* Row 2 */}
          <div className="flex-1 flex items-center">
            <BlurFade delay={ANIMATION_DELAYS.row2} duration={600} yOffset={16} className="w-full">
              <RotatingProjectCard
                projects={row2Projects}
                rotateInterval={15000}
                initialDelay={5000}
              />
            </BlurFade>
          </div>

          {/* Row 3 */}
          <div className="flex-1 flex items-center">
            <BlurFade delay={ANIMATION_DELAYS.row3} duration={600} yOffset={16} className="w-full">
              <RotatingProjectCard
                projects={row3Projects}
                rotateInterval={15000}
                initialDelay={10000}
              />
            </BlurFade>
          </div>
        </div>
      </div>
    </Container>
  );
}
