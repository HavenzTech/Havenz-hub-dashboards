"use client";

import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CompanyCard } from "@/components/widgets/CompanyCard";
import { RotatingCompanyCard } from "@/components/widgets/RotatingCompanyCard";
import { BlurFade } from "@/components/ui/BlurFade";
import { COMPANY_NAME, COMPANY_LOGO, COMPANY_URL } from "@/lib/constants";
import { useCompanies } from "@/hooks/useCompanies";

export default function CompaniesPage() {
  const { companies, isLoading, error } = useCompanies();

  // Animation timing configuration (in ms)
  const ANIMATION_DELAYS = {
    header: 0,
    title: 600,
    topLeft: 700,
    topRight: 800,
    bottomLeft: 900,
    bottomRight: 1000,
  };

  // Show first 3 companies as fixed cards, rest in rotating card
  const fixedCompanies = companies.slice(0, 3);
  const rotatingCompanies = companies.slice(3);

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
        <SectionTitle animated delay={ANIMATION_DELAYS.title}>Companies</SectionTitle>

        {isLoading ? (
          <div className="flex items-center justify-center flex-1">
            <div className="text-text-muted">Loading companies...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center flex-1">
            <div className="text-red-400">Error: {error}</div>
          </div>
        ) : companies.length === 0 ? (
          <div className="flex items-center justify-center flex-1">
            <div className="text-text-muted">No companies found</div>
          </div>
        ) : (
          /* 2x2 Grid */
          <div className="grid grid-cols-2 gap-6 flex-1">
            {/* First 3 companies as fixed cards */}
            {fixedCompanies.map((company, index) => {
              const delays = [
                ANIMATION_DELAYS.topLeft,
                ANIMATION_DELAYS.topRight,
                ANIMATION_DELAYS.bottomLeft,
              ];
              return (
                <div key={company.id} className="flex flex-col items-center">
                  <BlurFade delay={delays[index]} duration={600} yOffset={16}>
                    <CompanyCard
                      id={company.id}
                      name={company.name || "Unknown"}
                      logoUrl={company.logoUrl}
                      status={company.status}
                      revenue={company.annualRevenue}
                      location={company.location}
                      industry={company.industry}
                      employees={company.employeeCount}
                    />
                  </BlurFade>
                </div>
              );
            })}

            {/* Bottom Right - Rotating Companies (if there are more than 3) */}
            {rotatingCompanies.length > 0 && (
              <div className="flex flex-col items-center">
                <BlurFade delay={ANIMATION_DELAYS.bottomRight} duration={600} yOffset={16}>
                  <RotatingCompanyCard
                    companies={rotatingCompanies}
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
