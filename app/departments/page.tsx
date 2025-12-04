"use client";

import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RotatingDepartmentCard } from "@/components/widgets/RotatingDepartmentCard";
import { BlurFade } from "@/components/ui/BlurFade";
import { COMPANY_NAME, COMPANY_LOGO, COMPANY_URL } from "@/lib/constants";
import { getDepartmentsByCompanyId } from "@/lib/data/departments";

// Get departments by company
const agritechDepartments = getDepartmentsByCompanyId("agritech-haven").map((d) => ({
  id: d.id,
  name: d.name,
  status: d.status,
  ledBy: d.ledBy,
  employees: d.employees,
  budget: d.budget,
  activeProjects: d.activeProjects,
}));

const energyHavenDepartments = getDepartmentsByCompanyId("energy-haven").map((d) => ({
  id: d.id,
  name: d.name,
  status: d.status,
  ledBy: d.ledBy,
  employees: d.employees,
  budget: d.budget,
  activeProjects: d.activeProjects,
}));

const riseDepartments = getDepartmentsByCompanyId("rise-basketball").map((d) => ({
  id: d.id,
  name: d.name,
  status: d.status,
  ledBy: d.ledBy,
  employees: d.employees,
  budget: d.budget,
  activeProjects: d.activeProjects,
}));

const havenzTechDepartments = getDepartmentsByCompanyId("havenz-tech").map((d) => ({
  id: d.id,
  name: d.name,
  status: d.status,
  ledBy: d.ledBy,
  employees: d.employees,
  budget: d.budget,
  activeProjects: d.activeProjects,
}));

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
