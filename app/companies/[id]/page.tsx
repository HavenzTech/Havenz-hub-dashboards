"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { BlurFade } from "@/components/ui/BlurFade";
import { PropertyCard } from "@/components/widgets/PropertyCard";
import { COMPANY_NAME, COMPANY_LOGO, COMPANY_URL } from "@/lib/constants";
import { getCompanyById } from "@/lib/data/companies";
import { classNames } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

export default function CompanyDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const company = getCompanyById(id);

  const ANIMATION_DELAYS = {
    header: 0,
    backButton: 400,
    companyHeader: 500,
    stats: 700,
    properties: 900,
    projects: 1100,
  };

  if (!company) {
    return (
      <Container>
        <Header
          companyName={COMPANY_NAME}
          companyUrl={COMPANY_URL}
          logoSrc={COMPANY_LOGO}
          className="mb-4"
        />
        <div className="flex flex-col items-center justify-center flex-1 gap-4">
          <h1 className="text-2xl text-text-primary">Company not found</h1>
          <Link href="/companies" className="text-accent-primary hover:underline">
            Back to Companies
          </Link>
        </div>
      </Container>
    );
  }

  const statusStyles = {
    Active: "bg-status-success/20 text-status-success",
    Completed: "bg-status-info/20 text-status-info",
    "On Hold": "bg-status-warning/20 text-status-warning",
    Inactive: "bg-white/10 text-text-muted",
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
              <Image
                src={company.logoSrc}
                alt={company.name}
                fill
                className="object-contain"
                style={{ transform: `scale(${company.logoScale || 1})` }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold text-text-primary">{company.name}</h1>
              {company.description && (
                <p className="text-lg text-text-secondary">{company.description}</p>
              )}
              <div
                className={classNames(
                  "px-3 py-1 rounded-full text-sm font-medium w-fit",
                  statusStyles[company.status]
                )}
              >
                <span className="mr-1.5">●</span>
                {company.status}
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Stats Grid */}
        <BlurFade delay={ANIMATION_DELAYS.stats} duration={600} yOffset={16}>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <span className="text-xs text-text-muted uppercase tracking-wide">Revenue</span>
              <p className="text-2xl font-semibold text-text-primary mt-1">{company.revenue}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <span className="text-xs text-text-muted uppercase tracking-wide">Location</span>
              <p className="text-2xl font-semibold text-text-primary mt-1">{company.location}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <span className="text-xs text-text-muted uppercase tracking-wide">Employees</span>
              <p className="text-2xl font-semibold text-text-primary mt-1">{company.employees}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <span className="text-xs text-text-muted uppercase tracking-wide">Founded</span>
              <p className="text-2xl font-semibold text-text-primary mt-1">{company.founded}</p>
            </div>
          </div>
        </BlurFade>

        {/* Properties Section */}
        {company.properties.length > 0 && (
          <BlurFade delay={ANIMATION_DELAYS.properties} duration={600} yOffset={16}>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold text-text-primary">Properties</h2>
              <div className="grid grid-cols-2 gap-4">
                {company.properties.map((property, index) => (
                  <div key={index} className="bg-white/5 rounded-xl p-6">
                    <PropertyCard
                      name={property.name}
                      companyName={company.name}
                      companyLogo={company.logoSrc}
                      companyLogoScale={company.logoScale}
                      status={property.status}
                      type={property.type}
                      location={property.location}
                      size={property.size}
                      acquired={property.acquired}
                    />
                  </div>
                ))}
              </div>
            </div>
          </BlurFade>
        )}

        {/* Projects Section */}
        {company.projects.length > 0 && (
          <BlurFade delay={ANIMATION_DELAYS.projects} duration={600} yOffset={16}>
            <div className="flex flex-col gap-4 pb-6">
              <h2 className="text-2xl font-semibold text-text-primary">Projects</h2>
              <div className="flex flex-col gap-3">
                {company.projects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-xl p-4 flex items-center gap-6"
                  >
                    {/* Project Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-text-primary">
                          {project.name}
                        </h3>
                        <div
                          className={classNames(
                            "px-2 py-0.5 rounded-full text-xs font-medium",
                            statusStyles[project.status]
                          )}
                        >
                          {project.status}
                        </div>
                      </div>
                      <div className="flex gap-6 text-sm text-text-secondary">
                        <span>{project.department}</span>
                        <span>Lead: {project.projectLead}</span>
                        <span>{project.startDate} - {project.endDate}</span>
                        <span>{project.budget}</span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="flex flex-col items-end gap-1 min-w-[100px]">
                      <span className="text-sm text-text-secondary">{project.progress}%</span>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={classNames(
                            "h-full rounded-full transition-all",
                            project.progress === 100
                              ? "bg-status-success"
                              : project.status === "On Hold"
                              ? "bg-status-warning"
                              : "bg-accent-primary"
                          )}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BlurFade>
        )}
      </div>
    </Container>
  );
}
