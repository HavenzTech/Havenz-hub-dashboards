"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { BlurFade } from "@/components/ui/BlurFade";
import { COMPANY_NAME, COMPANY_LOGO, COMPANY_URL } from "@/lib/constants";
import { useCompany } from "@/hooks/useCompany";
import { classNames } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

// Helper to format revenue
function formatRevenue(revenue?: number | null): string {
  if (!revenue) return "N/A";
  if (revenue >= 1_000_000) {
    return `$${(revenue / 1_000_000).toFixed(1)}M`;
  }
  if (revenue >= 1_000) {
    return `$${(revenue / 1_000).toFixed(0)}K`;
  }
  return `$${revenue}`;
}

export default function CompanyDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { company, isLoading, error } = useCompany(id);

  const ANIMATION_DELAYS = {
    header: 0,
    backButton: 400,
    companyHeader: 500,
    stats: 700,
  };

  if (isLoading) {
    return (
      <Container>
        <Header
          companyName={COMPANY_NAME}
          companyUrl={COMPANY_URL}
          logoSrc={COMPANY_LOGO}
          className="mb-4"
        />
        <div className="flex flex-col items-center justify-center flex-1 gap-4">
          <div className="text-text-muted">Loading company...</div>
        </div>
      </Container>
    );
  }

  if (error || !company) {
    return (
      <Container>
        <Header
          companyName={COMPANY_NAME}
          companyUrl={COMPANY_URL}
          logoSrc={COMPANY_LOGO}
          className="mb-4"
        />
        <div className="flex flex-col items-center justify-center flex-1 gap-4">
          <h1 className="text-2xl text-text-primary">{error || "Company not found"}</h1>
          <Link href="/companies" className="text-accent-primary hover:underline">
            Back to Companies
          </Link>
        </div>
      </Container>
    );
  }

  const isActive = company.status?.toLowerCase() === "active";
  const displayStatus = company.status === "active" ? "Active" : company.status === "inactive" ? "Inactive" : company.status || "Unknown";

  return (
    <Container>
      <Header
        companyName={COMPANY_NAME}
        companyUrl={COMPANY_URL}
        logoSrc={COMPANY_LOGO}
        className="mb-4"
        baseDelay={ANIMATION_DELAYS.header}
      />

      <div className="flex flex-col flex-1 gap-6 overflow-y-auto">
        {/* Back button */}
        <BlurFade delay={ANIMATION_DELAYS.backButton} duration={600} yOffset={16}>
          <Link
            href="/companies"
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors w-fit"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Companies</span>
          </Link>
        </BlurFade>

        {/* Company Header */}
        <BlurFade delay={ANIMATION_DELAYS.companyHeader} duration={600} yOffset={16}>
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-white/5">
              {company.logoUrl ? (
                <Image
                  src={company.logoUrl}
                  alt={company.name || "Company"}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-muted text-3xl font-bold">
                  {(company.name || "?").charAt(0)}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold text-text-primary">{company.name}</h1>
              {company.industry && (
                <p className="text-lg text-text-secondary">{company.industry}</p>
              )}
              <div
                className={classNames(
                  "px-3 py-1 rounded-full text-sm font-medium w-fit",
                  isActive
                    ? "bg-status-success/20 text-status-success"
                    : "bg-white/10 text-text-muted"
                )}
              >
                <span className="mr-1.5">●</span>
                {displayStatus}
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Stats Grid */}
        <BlurFade delay={ANIMATION_DELAYS.stats} duration={600} yOffset={16}>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <span className="text-xs text-text-muted uppercase tracking-wide">Revenue</span>
              <p className="text-2xl font-semibold text-text-primary mt-1">{formatRevenue(company.annualRevenue)}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <span className="text-xs text-text-muted uppercase tracking-wide">Location</span>
              <p className="text-2xl font-semibold text-text-primary mt-1">{company.location || "N/A"}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <span className="text-xs text-text-muted uppercase tracking-wide">Employees</span>
              <p className="text-2xl font-semibold text-text-primary mt-1">{company.employeeCount ?? 0}</p>
            </div>
          </div>
        </BlurFade>

        {/* Contact Info */}
        {(company.contactEmail || company.contactPhone) && (
          <BlurFade delay={ANIMATION_DELAYS.stats + 100} duration={600} yOffset={16}>
            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-text-primary mb-4">Contact Information</h2>
              <div className="grid grid-cols-2 gap-4">
                {company.contactEmail && (
                  <div>
                    <span className="text-xs text-text-muted uppercase tracking-wide">Email</span>
                    <p className="text-lg text-text-primary mt-1">{company.contactEmail}</p>
                  </div>
                )}
                {company.contactPhone && (
                  <div>
                    <span className="text-xs text-text-muted uppercase tracking-wide">Phone</span>
                    <p className="text-lg text-text-primary mt-1">{company.contactPhone}</p>
                  </div>
                )}
              </div>
            </div>
          </BlurFade>
        )}

        {/* Full Address */}
        {company.locationAddress && (
          <BlurFade delay={ANIMATION_DELAYS.stats + 200} duration={600} yOffset={16}>
            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-text-primary mb-4">Address</h2>
              <p className="text-lg text-text-primary">
                {[
                  company.locationAddress,
                  company.locationCity,
                  company.locationProvince,
                  company.locationPostalCode,
                  company.locationCountry,
                ].filter(Boolean).join(", ")}
              </p>
            </div>
          </BlurFade>
        )}
      </div>
    </Container>
  );
}
