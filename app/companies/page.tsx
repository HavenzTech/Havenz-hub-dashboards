"use client";

import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CompanyCard } from "@/components/widgets/CompanyCard";
import { RotatingCompanyCard } from "@/components/widgets/RotatingCompanyCard";
import { BlurFade } from "@/components/ui/BlurFade";
import { COMPANY_NAME, COMPANY_LOGO, COMPANY_URL } from "@/lib/constants";
import { companies } from "@/lib/data/companies";

// Get companies by id for fixed positions
const agritechHaven = companies.find((c) => c.id === "agritech-haven")!;
const havenzTech = companies.find((c) => c.id === "havenz-tech")!;
const riseBasketball = companies.find((c) => c.id === "rise-basketball")!;

// Rotating companies (bottom-right)
const rotatingCompanies = companies.filter((c) =>
  ["energy-haven", "havensure", "ledgion"].includes(c.id)
);

export default function CompaniesPage() {
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
        <SectionTitle animated delay={ANIMATION_DELAYS.title}>Companies</SectionTitle>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-2 gap-6 flex-1">
          {/* Top Left - Agritech Haven */}
          <div className="flex flex-col items-center">
            <BlurFade delay={ANIMATION_DELAYS.topLeft} duration={600} yOffset={16}>
              <CompanyCard
                id={agritechHaven.id}
                name={agritechHaven.name}
                logoSrc={agritechHaven.logoSrc}
                logoScale={agritechHaven.logoScale}
                status={agritechHaven.status}
                revenue={agritechHaven.revenue}
                location={agritechHaven.location}
                industry={agritechHaven.industry}
                employees={agritechHaven.employees}
                founded={agritechHaven.founded}
              />
            </BlurFade>
          </div>

          {/* Top Right - Havenz Tech */}
          <div className="flex flex-col items-center">
            <BlurFade delay={ANIMATION_DELAYS.topRight} duration={600} yOffset={16}>
              <CompanyCard
                id={havenzTech.id}
                name={havenzTech.name}
                logoSrc={havenzTech.logoSrc}
                logoScale={havenzTech.logoScale}
                status={havenzTech.status}
                revenue={havenzTech.revenue}
                location={havenzTech.location}
                industry={havenzTech.industry}
                employees={havenzTech.employees}
                founded={havenzTech.founded}
              />
            </BlurFade>
          </div>

          {/* Bottom Left - RISE Basketball */}
          <div className="flex flex-col items-center">
            <BlurFade delay={ANIMATION_DELAYS.bottomLeft} duration={600} yOffset={16}>
              <CompanyCard
                id={riseBasketball.id}
                name={riseBasketball.name}
                logoSrc={riseBasketball.logoSrc}
                logoScale={riseBasketball.logoScale}
                status={riseBasketball.status}
                revenue={riseBasketball.revenue}
                location={riseBasketball.location}
                industry={riseBasketball.industry}
                employees={riseBasketball.employees}
                founded={riseBasketball.founded}
              />
            </BlurFade>
          </div>

          {/* Bottom Right - Rotating Companies */}
          <div className="flex flex-col items-center">
            <BlurFade delay={ANIMATION_DELAYS.bottomRight} duration={600} yOffset={16}>
              <RotatingCompanyCard
                companies={rotatingCompanies}
                rotateInterval={15000}
              />
            </BlurFade>
          </div>
        </div>
      </div>
    </Container>
  );
}
