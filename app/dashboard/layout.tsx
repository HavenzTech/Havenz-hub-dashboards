"use client";

import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import DarkVeil from "@/components/DarkVeil";
import { COMPANY_NAME, COMPANY_LOGO, COMPANY_URL } from "@/lib/constants";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Dark Veil Background */}
      <div className="absolute inset-0 opacity-30">
        <DarkVeil speed={1.2} hueShift={50} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full">
        <Container>
          <Header
            companyName={COMPANY_NAME}
            companyUrl={COMPANY_URL}
            logoSrc={COMPANY_LOGO}
            className="mb-4"
          />
          <main className="flex-1 flex flex-col gap-6 overflow-hidden">
            {children}
          </main>
        </Container>
      </div>
    </div>
  );
}
