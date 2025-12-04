"use client";

import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RotatingDepartmentCard } from "@/components/widgets/RotatingDepartmentCard";
import { BlurFade } from "@/components/ui/BlurFade";
import { COMPANY_NAME, COMPANY_LOGO, COMPANY_URL } from "@/lib/constants";

// Agritech Haven departments
const agritechDepartments = [
  {
    name: "Operations",
    status: "Active" as const,
    ledBy: "John Davidson",
    employees: 11,
    budget: "$250K",
    activeProjects: 3,
  },
  {
    name: "Engineering",
    status: "Active" as const,
    ledBy: "Sarah Kim",
    employees: 5,
    budget: "$180K",
    activeProjects: 2,
  },
  {
    name: "Administration",
    status: "Active" as const,
    ledBy: "Lisa Chen",
    employees: 3,
    budget: "$80K",
    activeProjects: 1,
  },
];

// Energy Haven departments
const energyHavenDepartments = [
  {
    name: "Production",
    status: "Active" as const,
    ledBy: "Mike Reynolds",
    employees: 45,
    budget: "$500K",
    activeProjects: 5,
  },
  {
    name: "Maintenance",
    status: "Active" as const,
    ledBy: "Tom Harris",
    employees: 12,
    budget: "$220K",
    activeProjects: 4,
  },
  {
    name: "Legal & Compliance",
    status: "Active" as const,
    ledBy: "Emma Wright",
    employees: 2,
    budget: "$150K",
    activeProjects: 1,
  },
];

// RISE Basketball departments
const riseDepartments = [
  {
    name: "Coaching",
    status: "Active" as const,
    ledBy: "Chris Lopez",
    employees: 8,
    budget: "$120K",
    activeProjects: 2,
  },
  {
    name: "Player Development",
    status: "Active" as const,
    ledBy: "Marcus Johnson",
    employees: 6,
    budget: "$95K",
    activeProjects: 3,
  },
  {
    name: "Operations",
    status: "Active" as const,
    ledBy: "Diana Ross",
    employees: 4,
    budget: "$60K",
    activeProjects: 1,
  },
];

// Havenz Tech departments
const havenzTechDepartments = [
  {
    name: "Development",
    status: "Active" as const,
    ledBy: "Alex Morgan",
    employees: 5,
    budget: "$150K",
    activeProjects: 4,
  },
  {
    name: "Sales",
    status: "Active" as const,
    ledBy: "Jane Park",
    employees: 3,
    budget: "$90K",
    activeProjects: 2,
  },
];

export default function DepartmentsPage() {
  // Animation timing configuration (in ms)
  const ANIMATION_DELAYS = {
    header: 0,
    title: 600,
    topLeft: 700,
    topRight: 800,
    bottomLeft: 900,
    bottomRight: 1000,
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
        <SectionTitle animated delay={ANIMATION_DELAYS.title}>Departments</SectionTitle>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-2 gap-6 flex-1">
          {/* Top Left - Agritech Haven */}
          <div className="flex flex-col items-center">
            <BlurFade delay={ANIMATION_DELAYS.topLeft} duration={600} yOffset={16}>
              <RotatingDepartmentCard
                companyName="Agritech Haven LP"
                companyLogo="/ahi.png"
                companyLogoScale={0.8}
                departments={agritechDepartments}
                rotateInterval={5000}
                initialDelay={0}
              />
            </BlurFade>
          </div>

          {/* Top Right - Energy Haven */}
          <div className="flex flex-col items-center">
            <BlurFade delay={ANIMATION_DELAYS.topRight} duration={600} yOffset={16}>
              <RotatingDepartmentCard
                companyName="Energy Haven"
                companyLogo="/energyhaven.png"
                departments={energyHavenDepartments}
                rotateInterval={5000}
                initialDelay={1250}
              />
            </BlurFade>
          </div>

          {/* Bottom Left - RISE Basketball */}
          <div className="flex flex-col items-center">
            <BlurFade delay={ANIMATION_DELAYS.bottomLeft} duration={600} yOffset={16}>
              <RotatingDepartmentCard
                companyName="RISE Basketball"
                companyLogo="/rise.png"
                departments={riseDepartments}
                rotateInterval={5000}
                initialDelay={2500}
              />
            </BlurFade>
          </div>

          {/* Bottom Right - Havenz Tech */}
          <div className="flex flex-col items-center">
            <BlurFade delay={ANIMATION_DELAYS.bottomRight} duration={600} yOffset={16}>
              <RotatingDepartmentCard
                companyName="Havenz Tech"
                companyLogo="/havenztech.png"
                departments={havenzTechDepartments}
                rotateInterval={5000}
                initialDelay={3750}
              />
            </BlurFade>
          </div>
        </div>
      </div>
    </Container>
  );
}
