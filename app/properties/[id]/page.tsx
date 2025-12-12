"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { BlurFade } from "@/components/ui/BlurFade";
import { COMPANY_NAME, COMPANY_LOGO, COMPANY_URL } from "@/lib/constants";
import { useProperty } from "@/hooks/useProperty";
import { useCompany } from "@/hooks/useCompany";
import { classNames } from "@/lib/utils";
import { ArrowLeft, MapPin, Building2, Ruler, DollarSign, Cpu, Layers, Clock } from "lucide-react";

// Format area to display string
function formatArea(area?: number | null): string {
  if (area === null || area === undefined) return "N/A";
  if (area >= 1_000_000) {
    return `${(area / 1_000_000).toFixed(1)}M sq ft`;
  }
  if (area >= 1_000) {
    return `${(area / 1_000).toFixed(0)}K sq ft`;
  }
  return `${area.toLocaleString()} sq ft`;
}

// Format currency
function formatCurrency(amount?: number | null): string {
  if (amount === null || amount === undefined) return "N/A";
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(0)}K`;
  }
  return `$${amount.toLocaleString()}`;
}

export default function PropertyDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { property, isLoading, error } = useProperty(id);
  const { company } = useCompany(property?.companyId || null);

  const ANIMATION_DELAYS = {
    header: 0,
    backButton: 400,
    propertyHeader: 500,
    stats: 700,
    details: 850,
  };

  const getStatusColor = (status?: string | null) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case "active":
      case "operational":
        return "bg-status-success/20 text-status-success";
      case "maintenance":
      case "under-construction":
        return "bg-status-warning/20 text-status-warning";
      case "inactive":
        return "bg-white/10 text-text-muted";
      default:
        return "bg-white/10 text-text-muted";
    }
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
          <div className="text-text-muted">Loading property...</div>
        </div>
      </Container>
    );
  }

  if (error || !property) {
    return (
      <Container>
        <Header
          companyName={COMPANY_NAME}
          companyUrl={COMPANY_URL}
          logoSrc={COMPANY_LOGO}
          className="mb-4"
        />
        <div className="flex flex-col items-center justify-center flex-1 gap-4">
          <h1 className="text-2xl text-text-primary">{error || "Property not found"}</h1>
          <Link href="/properties" className="text-accent-primary hover:underline">
            Back to Properties
          </Link>
        </div>
      </Container>
    );
  }

  const displayStatus = property.status || "Unknown";
  const displayLocation = [property.locationCity, property.locationProvince].filter(Boolean).join(", ") || "N/A";
  const fullAddress = [property.locationAddress, property.locationCity, property.locationProvince, property.locationPostalCode].filter(Boolean).join(", ");

  return (
    <Container>
      <Header
        companyName={COMPANY_NAME}
        companyUrl={COMPANY_URL}
        logoSrc={COMPANY_LOGO}
        className="mb-4"
        baseDelay={ANIMATION_DELAYS.header}
      />

      <div className="flex flex-col flex-1 gap-4 overflow-y-auto">
        {/* Back button */}
        <BlurFade delay={ANIMATION_DELAYS.backButton} duration={600} yOffset={16}>
          <Link
            href="/properties"
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors w-fit"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Properties</span>
          </Link>
        </BlurFade>

        {/* Property Header */}
        <BlurFade delay={ANIMATION_DELAYS.propertyHeader} duration={600} yOffset={16}>
          <div className="flex items-center gap-6">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white/5">
              {company?.logoUrl ? (
                <Image
                  src={company.logoUrl}
                  alt={property.companyName || "Company"}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-muted text-2xl font-bold">
                  {(property.companyName || property.name || "?").charAt(0)}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <h1 className="text-2xl font-bold text-text-primary">{property.name || "Unnamed Property"}</h1>
              <div className="flex items-center gap-3">
                {property.companyId && (property.companyName || company?.name) && (
                  <Link
                    href={`/companies/${property.companyId}`}
                    className="text-base text-accent-primary hover:underline"
                  >
                    {property.companyName || company?.name}
                  </Link>
                )}
                <div
                  className={classNames(
                    "px-2.5 py-0.5 rounded-full text-xs font-medium",
                    getStatusColor(property.status)
                  )}
                >
                  <span className="mr-1">●</span>
                  {displayStatus}
                </div>
              </div>
              {fullAddress && (
                <div className="flex items-center gap-2 text-text-secondary text-sm">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="truncate">{fullAddress}</span>
                </div>
              )}
            </div>
          </div>
        </BlurFade>

        {/* Stats Grid - 2 rows */}
        <BlurFade delay={ANIMATION_DELAYS.stats} duration={600} yOffset={16}>
          <div className="grid grid-cols-4 gap-3">
            {/* Type */}
            <div className="bg-white/5 rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-accent-primary" />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-text-muted uppercase tracking-wide">Type</span>
                <p className="text-base font-semibold text-text-primary truncate">{property.type || "N/A"}</p>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white/5 rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-accent-primary" />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-text-muted uppercase tracking-wide">Location</span>
                <p className="text-base font-semibold text-text-primary truncate">{displayLocation}</p>
              </div>
            </div>

            {/* Total Area */}
            <div className="bg-white/5 rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center shrink-0">
                <Ruler className="w-5 h-5 text-accent-primary" />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-text-muted uppercase tracking-wide">Total Area</span>
                <p className="text-base font-semibold text-text-primary">{property.totalAreaFormatted || formatArea(property.sizeTotalArea)}</p>
              </div>
            </div>

            {/* Usable Area */}
            <div className="bg-white/5 rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center shrink-0">
                <Ruler className="w-5 h-5 text-accent-primary" />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-text-muted uppercase tracking-wide">Usable Area</span>
                <p className="text-base font-semibold text-text-primary">{property.usableAreaFormatted || formatArea(property.sizeUsableArea)}</p>
              </div>
            </div>

            {/* Floors */}
            <div className="bg-white/5 rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5 text-accent-primary" />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-text-muted uppercase tracking-wide">Floors</span>
                <p className="text-base font-semibold text-text-primary">{property.sizeFloors ?? "N/A"}</p>
              </div>
            </div>

            {/* Devices */}
            <div className="bg-white/5 rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center shrink-0">
                <Cpu className="w-5 h-5 text-accent-primary" />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-text-muted uppercase tracking-wide">Devices</span>
                <p className="text-base font-semibold text-text-primary">{property.deviceCount ?? 0}</p>
              </div>
            </div>

            {/* Current Value */}
            <div className="bg-white/5 rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center shrink-0">
                <DollarSign className="w-5 h-5 text-accent-primary" />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-text-muted uppercase tracking-wide">Value</span>
                <p className="text-base font-semibold text-text-primary">{property.currentValueFormatted || formatCurrency(property.currentValue)}</p>
              </div>
            </div>

            {/* Monthly Costs */}
            <div className="bg-white/5 rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center shrink-0">
                <DollarSign className="w-5 h-5 text-accent-primary" />
              </div>
              <div className="min-w-0">
                <span className="text-xs text-text-muted uppercase tracking-wide">Monthly Costs</span>
                <p className="text-base font-semibold text-text-primary">{property.monthlyOperatingCostsFormatted || formatCurrency(property.monthlyOperatingCosts)}</p>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Bottom Section: Description + Additional Info */}
        <BlurFade delay={ANIMATION_DELAYS.details} duration={600} yOffset={16}>
          <div className="grid grid-cols-2 gap-4">
            {/* Description */}
            <div className="bg-white/5 rounded-xl p-4">
              <h2 className="text-lg font-semibold text-text-primary mb-2">About This Property</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                {property.description || "No description available for this property."}
              </p>
            </div>

            {/* Additional Info */}
            <div className="bg-white/5 rounded-xl p-4">
              <h2 className="text-lg font-semibold text-text-primary mb-2">Additional Information</h2>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Access Logs</span>
                  <span className="text-text-primary font-medium">{property.accessLogCount ?? 0}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Country</span>
                  <span className="text-text-primary font-medium">{property.locationCountry || "N/A"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Postal Code</span>
                  <span className="text-text-primary font-medium">{property.locationPostalCode || "N/A"}</span>
                </div>
                {property.createdTimeAgo && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">Created</span>
                    <span className="text-text-primary font-medium">{property.createdTimeAgo}</span>
                  </div>
                )}
                {property.updatedTimeAgo && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">Updated</span>
                    <span className="text-text-primary font-medium">{property.updatedTimeAgo}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </Container>
  );
}
