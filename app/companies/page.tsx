"use client";

import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CompanyCard } from "@/components/widgets/CompanyCard";
import { RotatingCompanyCard } from "@/components/widgets/RotatingCompanyCard";
import { BlurFade } from "@/components/ui/BlurFade";
import { COMPANY_NAME, COMPANY_LOGO, COMPANY_URL } from "@/lib/constants";

// Fixed position companies
const agritechHaven = {
  name: "Agritech Haven LP",
  logoSrc: "/ahi.png",
  logoScale: 0.8,
  status: "Active" as const,
  revenue: "$4.2M",
  location: "Red Deer, AB",
  industry: "Agriculture",
  employees: 28,
  founded: 2013,
};

const havenzTech = {
  name: "Havenz Tech",
  logoSrc: "/havenztech.png",
  status: "Active" as const,
  revenue: "$1.8M",
  location: "Calgary, AB",
  industry: "Technology",
  employees: 5,
  founded: 2025,
};

const riseBasketball = {
  name: "RISE Basketball",
  logoSrc: "/rise.png",
  status: "Active" as const,
  revenue: "$850K",
  location: "Calgary, AB",
  industry: "Sports",
  employees: 62,
  founded: 2012,
};

// Rotating companies (bottom-right)
const rotatingCompanies = [
  {
    name: "Energy Haven",
    logoSrc: "/energyhaven.png",
    status: "Active" as const,
    revenue: "$12.5M",
    location: "Calgary, AB",
    industry: "Energy",
    employees: 45,
    founded: 2016,
  },
  {
    name: "HavenSure",
    logoSrc: "/havensure.png",
    logoScale: 1.4,
    status: "Active" as const,
    revenue: "$3.2M",
    location: "Calgary, AB",
    industry: "Insurance",
    employees: 18,
    founded: 2025,
  },
  {
    name: "Ledgion",
    logoSrc: "/ledgion.png",
    logoScale: 1.2,
    status: "Active" as const,
    revenue: "$950K",
    location: "Calgary, AB",
    industry: "Finance",
    employees: 6,
    founded: 2025,
  },
];

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
              <CompanyCard {...agritechHaven} />
            </BlurFade>
          </div>

          {/* Top Right - Havenz Tech */}
          <div className="flex flex-col items-center">
            <BlurFade delay={ANIMATION_DELAYS.topRight} duration={600} yOffset={16}>
              <CompanyCard {...havenzTech} />
            </BlurFade>
          </div>

          {/* Bottom Left - RISE Basketball */}
          <div className="flex flex-col items-center">
            <BlurFade delay={ANIMATION_DELAYS.bottomLeft} duration={600} yOffset={16}>
              <CompanyCard {...riseBasketball} />
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
