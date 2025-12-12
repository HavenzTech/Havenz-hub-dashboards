"use client";

import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { BlurFade } from "@/components/ui/BlurFade";
import { COMPANY_NAME, COMPANY_LOGO, COMPANY_URL } from "@/lib/constants";

const PORTFOLIO_CHART_URL = "https://tradingbotdev.ngrok.app/chart/TSLA/2025-12-04";

export default function PortfolioPage() {
  const ANIMATION_DELAYS = {
    header: 0,
    title: 500,
    iframe: 600,
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
      <div className="flex flex-col flex-1 gap-4 overflow-hidden">
        <SectionTitle animated delay={ANIMATION_DELAYS.title}>
          Portfolio
        </SectionTitle>

        {/* Full-page iframe */}
        <BlurFade delay={ANIMATION_DELAYS.iframe} duration={600} yOffset={16} className="flex-1">
          <div className="w-full h-full rounded-xl overflow-hidden border border-white/10">
            <iframe
              src={PORTFOLIO_CHART_URL}
              title="Portfolio Chart"
              className="w-full h-full"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
        </BlurFade>
      </div>
    </Container>
  );
}
