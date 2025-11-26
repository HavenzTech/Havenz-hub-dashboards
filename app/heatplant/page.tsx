"use client";

import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { HeatPlantScene } from "@/components/three/HeatPlantScene";
import { COMPANY_NAME, COMPANY_LOGO, COMPANY_URL } from "@/lib/constants";

// Mock departments data
const departments = [
  { name: "Energy Production", headCount: 7 },
  { name: "Operations", headCount: 11 },
  { name: "Legal & Compliance", headCount: 2 },
  { name: "Administration", headCount: 3 },
  { name: "Engineering", headCount: 5 },
];

// Mock portfolio data - stocks
const portfolio = [
  { name: "Tesla", ticker: "TSLA", change: "+2.4%" },
  { name: "SoFi", ticker: "SOFI", change: "+1.8%" },
  { name: "Google", ticker: "GOOGL", change: "-0.5%" },
  { name: "Apple", ticker: "AAPL", change: "+0.9%" },
];

export default function HeatPlantPage() {
  return (
    <Container>
      <Header
        companyName={COMPANY_NAME}
        companyUrl={COMPANY_URL}
        logoSrc={COMPANY_LOGO}
        className="mb-4"
      />
      <div className="flex flex-col flex-1 gap-6 overflow-hidden">
        {/* Row 1: Departments + Portfolio */}
        <section className="w-full flex gap-8">
          {/* Departments - Left */}
          <div className="w-1/2 flex flex-col">
            <SectionTitle>Departments</SectionTitle>
            <Card className="mt-4">
              <div className="flex flex-col">
                {departments.map((dept) => (
                  <div
                    key={dept.name}
                    className="flex items-center justify-between p-4"
                  >
                    <span className="text-text-primary font-medium">
                      {dept.name}
                    </span>
                    <span className="text-text-secondary">
                      {dept.headCount} staff
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Portfolio - Right */}
          <div className="w-1/2 flex flex-col">
            <SectionTitle>Portfolio</SectionTitle>
            <Card className="mt-4">
              <div className="flex flex-col">
                {portfolio.map((item) => (
                  <div
                    key={item.ticker}
                    className="flex items-center justify-between p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-text-secondary font-mono text-sm">
                        {item.ticker}
                      </span>
                      <span className="text-text-primary font-medium">
                        {item.name}
                      </span>
                    </div>
                    <span
                      className={`font-semibold ${
                        item.change.startsWith("+")
                          ? "text-status-success"
                          : "text-status-error"
                      }`}
                    >
                      {item.change}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Row 2: Heat Plant 3D Scene - Full Width */}
        <section className="w-full flex-1 flex flex-col overflow-hidden">
          <SectionTitle subtitle="">Heat Plant Overview</SectionTitle>
          <div className="flex-1 rounded-xl overflow-hidden border border-white/10 bg-brand-card mt-4">
            <HeatPlantScene autoRotate={true} scale={0.8} />
          </div>
        </section>
      </div>
    </Container>
  );
}
