"use client";

import { useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RotatingDepartmentCard } from "@/components/widgets/RotatingDepartmentCard";
import { BlurFade } from "@/components/ui/BlurFade";
import { COMPANY_NAME, COMPANY_LOGO, COMPANY_URL } from "@/lib/constants";
import { useDepartments } from "@/hooks/useDepartments";
import { useCompanies } from "@/hooks/useCompanies";

export default function DepartmentsPage() {
  const { departments, isLoading: deptLoading, error: deptError } = useDepartments();
  const { companies, isLoading: compLoading } = useCompanies();

  const isLoading = deptLoading || compLoading;

  // Map departments with company logos
  const allDepartments = useMemo(() => {
    return departments.map((dept) => {
      const company = companies.find(c => c.id === dept.companyId);
      return {
        ...dept,
        companyLogo: company?.logoUrl,
        companyName: dept.companyName || company?.name,
      };
    });
  }, [departments, companies]);

  // Split departments: first 3 fixed, rest rotating
  const fixedDepartments = allDepartments.slice(0, 3);
  const rotatingDepartments = allDepartments.slice(3);

  // Animation timing configuration (in ms)
  const ANIMATION_DELAYS = {
    header: 0,
    title: 500,
    row1: 600,
    row2: 700,
    row3: 800,
    row4: 900,
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

        {isLoading ? (
          <div className="flex items-center justify-center flex-1">
            <div className="text-text-muted">Loading departments...</div>
          </div>
        ) : deptError ? (
          <div className="flex items-center justify-center flex-1">
            <div className="text-red-400">Error: {deptError}</div>
          </div>
        ) : allDepartments.length === 0 ? (
          <div className="flex items-center justify-center flex-1">
            <div className="text-text-muted">No departments found</div>
          </div>
        ) : (
          /* 2x2 Grid */
          <div className="grid grid-cols-2 gap-6 flex-1">
            {/* Fixed department 1 */}
            {fixedDepartments[0] && (
              <div className="flex flex-col items-center">
                <BlurFade delay={ANIMATION_DELAYS.row1} duration={600} yOffset={16}>
                  <RotatingDepartmentCard
                    companyName={fixedDepartments[0].companyName || "Unknown"}
                    companyLogo={fixedDepartments[0].companyLogo}
                    departments={[fixedDepartments[0]]}
                  />
                </BlurFade>
              </div>
            )}

            {/* Fixed department 2 */}
            {fixedDepartments[1] && (
              <div className="flex flex-col items-center">
                <BlurFade delay={ANIMATION_DELAYS.row2} duration={600} yOffset={16}>
                  <RotatingDepartmentCard
                    companyName={fixedDepartments[1].companyName || "Unknown"}
                    companyLogo={fixedDepartments[1].companyLogo}
                    departments={[fixedDepartments[1]]}
                  />
                </BlurFade>
              </div>
            )}

            {/* Fixed department 3 */}
            {fixedDepartments[2] && (
              <div className="flex flex-col items-center">
                <BlurFade delay={ANIMATION_DELAYS.row3} duration={600} yOffset={16}>
                  <RotatingDepartmentCard
                    companyName={fixedDepartments[2].companyName || "Unknown"}
                    companyLogo={fixedDepartments[2].companyLogo}
                    departments={[fixedDepartments[2]]}
                  />
                </BlurFade>
              </div>
            )}

            {/* Rotating departments (4th slot) */}
            {rotatingDepartments.length > 0 && (
              <div className="flex flex-col items-center">
                <BlurFade delay={ANIMATION_DELAYS.row4} duration={600} yOffset={16}>
                  <RotatingDepartmentCard
                    companyName={rotatingDepartments[0].companyName || "Unknown"}
                    companyLogo={rotatingDepartments[0].companyLogo}
                    departments={rotatingDepartments}
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
