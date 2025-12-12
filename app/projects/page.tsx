"use client";

import { useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProjectRow } from "@/components/widgets/ProjectRow";
import { RotatingProjectCard } from "@/components/widgets/RotatingProjectCard";
import { BlurFade } from "@/components/ui/BlurFade";
import { COMPANY_NAME, COMPANY_LOGO, COMPANY_URL } from "@/lib/constants";
import { useProjects } from "@/hooks/useProjects";
import { useCompanies } from "@/hooks/useCompanies";

export default function ProjectsPage() {
  const { projects, isLoading: projLoading, error: projError } = useProjects();
  const { companies, isLoading: compLoading } = useCompanies();

  const isLoading = projLoading || compLoading;

  // Priority order for sorting (lower number = higher priority)
  const priorityOrder: Record<string, number> = {
    critical: 0,
    urgent: 0,
    high: 1,
    medium: 2,
    normal: 2,
    low: 3,
  };

  // Map projects to include company logos and sort by priority
  const allProjects = useMemo(() => {
    return projects
      .map((p) => {
        const company = companies.find(c => c.id === p.companyId);
        return {
          id: p.id,
          name: p.name,
          companyName: p.companyName || company?.name,
          companyLogo: company?.logoUrl,
          status: p.status,
          statusDisplayName: p.statusDisplayName,
          priority: p.priority,
          priorityDisplayName: p.priorityDisplayName,
          progress: p.progress,
          startDate: p.startDate,
          endDate: p.endDate,
          teamLead: p.teamLead,
          budgetAllocated: p.budgetAllocated,
          budgetAllocatedFormatted: p.budgetAllocatedFormatted,
        };
      })
      .sort((a, b) => {
        const aPriority = priorityOrder[a.priority?.toLowerCase() || ''] ?? 4;
        const bPriority = priorityOrder[b.priority?.toLowerCase() || ''] ?? 4;
        return aPriority - bPriority;
      });
  }, [projects, companies]);

  // First 2 projects shown as static rows, rest go to rotating card
  const fixedProjects = allProjects.slice(0, 2);
  const rotatingProjects = allProjects.slice(2);

  // Animation timing configuration (in ms)
  const ANIMATION_DELAYS = {
    header: 0,
    title: 600,
    row1: 700,
    row2: 800,
    rotating: 900,
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

        {isLoading ? (
          <div className="flex items-center justify-center flex-1">
            <div className="text-text-muted">Loading projects...</div>
          </div>
        ) : projError ? (
          <div className="flex items-center justify-center flex-1">
            <div className="text-red-400">Error: {projError}</div>
          </div>
        ) : allProjects.length === 0 ? (
          <div className="flex items-center justify-center flex-1">
            <div className="text-text-muted">No projects found</div>
          </div>
        ) : (
          /* Project Rows */
          <div className="flex flex-col gap-2 flex-1">
            {/* Fixed project rows (up to 2) */}
            {fixedProjects.map((project, index) => {
              const delays = [ANIMATION_DELAYS.row1, ANIMATION_DELAYS.row2];
              return (
                <div key={project.id || index} className="flex-1 flex items-center">
                  <BlurFade delay={delays[index]} duration={600} yOffset={16} className="w-full">
                    <ProjectRow project={project} />
                  </BlurFade>
                </div>
              );
            })}

            {/* Rotating card for additional projects (4+) */}
            {rotatingProjects.length > 0 && (
              <div className="flex-1 flex items-center">
                <BlurFade delay={ANIMATION_DELAYS.rotating} duration={600} yOffset={16} className="w-full">
                  <RotatingProjectCard
                    projects={rotatingProjects}
                    rotateInterval={15000}
                  />
                </BlurFade>
              </div>
            )}
          </div>
        )}
      </div>
    </Container>
  );
}
