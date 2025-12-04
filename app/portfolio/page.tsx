"use client";

import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PortfolioCard } from "@/components/widgets/PortfolioCard";
import { BlurFade } from "@/components/ui/BlurFade";
import { COMPANY_NAME, COMPANY_LOGO, COMPANY_URL } from "@/lib/constants";
import { portfolios } from "@/lib/data/portfolios";

export default function PortfolioPage() {
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
        <SectionTitle animated delay={ANIMATION_DELAYS.title}>
          Portfolio
        </SectionTitle>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-2 gap-6 flex-1">
          {portfolios.map((portfolio, index) => {
            const delays = [
              ANIMATION_DELAYS.topLeft,
              ANIMATION_DELAYS.topRight,
              ANIMATION_DELAYS.bottomLeft,
              ANIMATION_DELAYS.bottomRight,
            ];
            return (
              <div key={portfolio.id} className="flex flex-col items-center">
                <BlurFade delay={delays[index] || delays[0]} duration={600} yOffset={16}>
                  <PortfolioCard
                    id={portfolio.id}
                    name={portfolio.name}
                    type={portfolio.type}
                    totalValue={portfolio.totalValue}
                    totalReturn={portfolio.totalReturn}
                    returnPercent={portfolio.returnPercent}
                    riskLevel={portfolio.riskLevel}
                    holdingsCount={portfolio.holdings.length}
                  />
                </BlurFade>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
