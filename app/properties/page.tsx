"use client";

import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PropertyCard } from "@/components/widgets/PropertyCard";
import { RotatingPropertyCard } from "@/components/widgets/RotatingPropertyCard";
import { BlurFade } from "@/components/ui/BlurFade";
import { COMPANY_NAME, COMPANY_LOGO, COMPANY_URL } from "@/lib/constants";

// Fixed position properties
const heatPowerPlant = {
  name: "Heat & Power Plant",
  companyName: "Agritech Haven LP",
  companyLogo: "/ahi.png",
  companyLogoScale: 0.8,
  status: "Operational" as const,
  type: "Power Plant",
  location: "Red Deer, AB",
  size: "15,000 sqft",
  acquired: 2018,
};

const headquartersOffice = {
  name: "Corporate Headquarters",
  companyName: "Agritech Haven LP",
  companyLogo: "/ahi.png",
  companyLogoScale: 0.8,
  status: "Operational" as const,
  type: "Office",
  location: "Red Deer, AB",
  size: "8,500 sqft",
  acquired: 2013,
};

const trainingFacility = {
  name: "RISE Training Center",
  companyName: "RISE Basketball",
  companyLogo: "/rise.png",
  status: "Operational" as const,
  type: "Sports Facility",
  location: "Calgary, AB",
  size: "25,000 sqft",
  acquired: 2015,
};

// Rotating properties (bottom-right)
const rotatingProperties = [
  {
    name: "Energy Hub Facility",
    companyName: "Energy Haven",
    companyLogo: "/energyhaven.png",
    status: "Operational" as const,
    type: "Industrial",
    location: "Calgary, AB",
    size: "32,000 sqft",
    acquired: 2019,
  },
  {
    name: "Tech Innovation Lab",
    companyName: "Havenz Tech",
    companyLogo: "/havenztech.png",
    status: "Operational" as const,
    type: "Office/Lab",
    location: "Calgary, AB",
    size: "4,200 sqft",
    acquired: 2025,
  },
  {
    name: "Agricultural Warehouse",
    companyName: "Agritech Haven LP",
    companyLogo: "/ahi.png",
    companyLogoScale: 0.8,
    status: "Under Maintenance" as const,
    type: "Warehouse",
    location: "Red Deer, AB",
    size: "45,000 sqft",
    acquired: 2016,
  },
];

export default function PropertiesPage() {
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
        <SectionTitle animated delay={ANIMATION_DELAYS.title}>Properties</SectionTitle>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-2 gap-6 flex-1">
          {/* Top Left - Heat & Power Plant */}
          <div className="flex flex-col items-center">
            <BlurFade delay={ANIMATION_DELAYS.topLeft} duration={600} yOffset={16}>
              <PropertyCard {...heatPowerPlant} />
            </BlurFade>
          </div>

          {/* Top Right - Corporate Headquarters */}
          <div className="flex flex-col items-center">
            <BlurFade delay={ANIMATION_DELAYS.topRight} duration={600} yOffset={16}>
              <PropertyCard {...headquartersOffice} />
            </BlurFade>
          </div>

          {/* Bottom Left - RISE Training Center */}
          <div className="flex flex-col items-center">
            <BlurFade delay={ANIMATION_DELAYS.bottomLeft} duration={600} yOffset={16}>
              <PropertyCard {...trainingFacility} />
            </BlurFade>
          </div>

          {/* Bottom Right - Rotating Properties */}
          <div className="flex flex-col items-center">
            <BlurFade delay={ANIMATION_DELAYS.bottomRight} duration={600} yOffset={16}>
              <RotatingPropertyCard
                properties={rotatingProperties}
                rotateInterval={15000}
              />
            </BlurFade>
          </div>
        </div>
      </div>
    </Container>
  );
}
