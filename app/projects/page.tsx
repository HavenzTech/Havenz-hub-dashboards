"use client";

import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RotatingProjectCard } from "@/components/widgets/RotatingProjectCard";
import { BlurFade } from "@/components/ui/BlurFade";
import { COMPANY_NAME, COMPANY_LOGO, COMPANY_URL } from "@/lib/constants";
import { projects } from "@/lib/data/projects";

// Map projects to the format expected by RotatingProjectCard
const allProjects = projects.map((p) => ({
  id: p.id,
  name: p.name,
  companyName: p.companyName,
  companyLogo: p.companyLogo,
  companyLogoScale: p.companyLogoScale,
  status: p.status,
  progress: p.progress,
  startDate: p.startDate,
  endDate: p.endDate,
  projectLead: p.projectLead,
  budget: p.budget,
  department: p.department,
}));

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
