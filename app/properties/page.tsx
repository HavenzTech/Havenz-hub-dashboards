"use client";

import { useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PropertyCard } from "@/components/widgets/PropertyCard";
import { RotatingPropertyCard } from "@/components/widgets/RotatingPropertyCard";
import { BlurFade } from "@/components/ui/BlurFade";
import { COMPANY_NAME, COMPANY_LOGO, COMPANY_URL } from "@/lib/constants";
import { useProperties } from "@/hooks/useProperties";
import { useCompanies } from "@/hooks/useCompanies";

export default function PropertiesPage() {
  const { properties, isLoading: propLoading, error: propError } = useProperties();
  const { companies, isLoading: compLoading } = useCompanies();

  const isLoading = propLoading || compLoading;

  // Map properties with company logos
  const allProperties = useMemo(() => {
    return properties.map((p) => {
      const company = companies.find(c => c.id === p.companyId);
      return {
        id: p.id,
        name: p.name,
        companyName: p.companyName || company?.name,
        companyLogo: company?.logoUrl,
        status: p.status,
        type: p.type,
        locationCity: p.locationCity,
        locationProvince: p.locationProvince,
        totalAreaFormatted: p.totalAreaFormatted,
        sizeTotalArea: p.sizeTotalArea,
        sizeFloors: p.sizeFloors,
        deviceCount: p.deviceCount,
        currentValueFormatted: p.currentValueFormatted,
        currentValue: p.currentValue,
      };
    });
  }, [properties, companies]);

  // Split properties for display: first 3 fixed, rest rotating
  const fixedProperties = allProperties.slice(0, 3);
  const rotatingProperties = allProperties.slice(3);

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
        <SectionTitle animated delay={ANIMATION_DELAYS.title}>Properties</SectionTitle>

        {isLoading ? (
          <div className="flex items-center justify-center flex-1">
            <div className="text-text-muted">Loading properties...</div>
          </div>
        ) : propError ? (
          <div className="flex items-center justify-center flex-1">
            <div className="text-red-400">Error: {propError}</div>
          </div>
        ) : allProperties.length === 0 ? (
          <div className="flex items-center justify-center flex-1">
            <div className="text-text-muted">No properties found</div>
          </div>
        ) : (
          /* 2x2 Grid with equal height rows */
          <div className="grid grid-cols-2 grid-rows-2 gap-6 flex-1">
            {/* Top Left */}
            {fixedProperties[0] && (
              <div className="flex flex-col">
                <BlurFade delay={ANIMATION_DELAYS.row1} duration={600} yOffset={16} className="h-full">
                  <PropertyCard {...fixedProperties[0]} className="h-full" />
                </BlurFade>
              </div>
            )}

            {/* Top Right */}
            {fixedProperties[1] && (
              <div className="flex flex-col">
                <BlurFade delay={ANIMATION_DELAYS.row2} duration={600} yOffset={16} className="h-full">
                  <PropertyCard {...fixedProperties[1]} className="h-full" />
                </BlurFade>
              </div>
            )}

            {/* Bottom Left */}
            {fixedProperties[2] && (
              <div className="flex flex-col">
                <BlurFade delay={ANIMATION_DELAYS.row3} duration={600} yOffset={16} className="h-full">
                  <PropertyCard {...fixedProperties[2]} className="h-full" />
                </BlurFade>
              </div>
            )}

            {/* Bottom Right - Rotating Properties (or 4th property if only 4 total) */}
            {rotatingProperties.length > 0 && (
              <div className="flex flex-col">
                <BlurFade delay={ANIMATION_DELAYS.row4} duration={600} yOffset={16} className="h-full">
                  {rotatingProperties.length === 1 ? (
                    <PropertyCard {...rotatingProperties[0]} className="h-full" />
                  ) : (
                    <RotatingPropertyCard
                      properties={rotatingProperties}
                      rotateInterval={15000}
                      className="h-full"
                    />
                  )}
                </BlurFade>
              </div>
            )}
          </div>
        )}
      </div>
    </Container>
  );
}
