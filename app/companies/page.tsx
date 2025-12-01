"use client";

import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { COMPANY_NAME, COMPANY_LOGO, COMPANY_URL } from "@/lib/constants";

export default function CompaniesPage() {
  return (
    <Container>
      <Header
        companyName={COMPANY_NAME}
        companyUrl={COMPANY_URL}
        logoSrc={COMPANY_LOGO}
        className="mb-4"
      />
      <div className="flex flex-col flex-1 gap-6 overflow-hidden">
        <SectionTitle>Companies</SectionTitle>
        {/* Add companies content here */}
      </div>
    </Container>
  );
}
