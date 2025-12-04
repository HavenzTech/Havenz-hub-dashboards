"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { BlurFade } from "@/components/ui/BlurFade";
import { COMPANY_NAME, COMPANY_LOGO, COMPANY_URL } from "@/lib/constants";
import { getPropertyById } from "@/lib/data/properties";
import { classNames } from "@/lib/utils";
import { ArrowLeft, MapPin, Building2, Calendar, Ruler, Wrench, CheckCircle } from "lucide-react";

export default function PropertyDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const property = getPropertyById(id);

  const ANIMATION_DELAYS = {
    header: 0,
    backButton: 400,
    propertyHeader: 500,
    stats: 700,
    description: 850,
    features: 1000,
    maintenance: 1150,
  };

  if (!property) {
    return (
      <Container>
        <Header
          companyName={COMPANY_NAME}
          companyUrl={COMPANY_URL}
          logoSrc={COMPANY_LOGO}
          className="mb-4"
        />
        <div className="flex flex-col items-center justify-center flex-1 gap-4">
          <h1 className="text-2xl text-text-primary">Property not found</h1>
          <Link href="/properties" className="text-accent-primary hover:underline">
            Back to Properties
          </Link>
        </div>
      </Container>
    );
  }

  const statusStyles = {
    Operational: "bg-status-success/20 text-status-success",
    "Under Maintenance": "bg-status-warning/20 text-status-warning",
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

      <div className="flex flex-col flex-1 gap-5 overflow-y-auto">
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
            <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-white/5">
              <Image
                src={property.companyLogo}
                alt={property.companyName}
                fill
                className="object-contain"
                style={{ transform: `scale(${property.companyLogoScale || 1})` }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-text-primary">{property.name}</h1>
              <Link
                href={`/companies/${property.companyId}`}
                className="text-lg text-accent-primary hover:underline"
              >
                {property.companyName}
              </Link>
              {property.address && (
                <div className="flex items-center gap-2 text-text-secondary text-sm">
                  <MapPin className="w-4 h-4" />
                  {property.address}
                </div>
              )}
              <div
                className={classNames(
                  "px-3 py-1 rounded-full text-sm font-medium w-fit",
                  statusStyles[property.status]
                )}
              >
                <span className="mr-1.5">●</span>
                {property.status}
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Stats Grid */}
        <BlurFade delay={ANIMATION_DELAYS.stats} duration={600} yOffset={16}>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-accent-primary" />
              </div>
              <div>
                <span className="text-xs text-text-muted uppercase tracking-wide">Type</span>
                <p className="text-lg font-semibold text-text-primary">{property.type}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-accent-primary" />
              </div>
              <div>
                <span className="text-xs text-text-muted uppercase tracking-wide">Location</span>
                <p className="text-lg font-semibold text-text-primary">{property.location}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                <Ruler className="w-5 h-5 text-accent-primary" />
              </div>
              <div>
                <span className="text-xs text-text-muted uppercase tracking-wide">Size</span>
                <p className="text-xl font-semibold text-text-primary">{property.size}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-accent-primary" />
              </div>
              <div>
                <span className="text-xs text-text-muted uppercase tracking-wide">Acquired</span>
                <p className="text-xl font-semibold text-text-primary">{property.acquired}</p>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Description */}
        {property.description && (
          <BlurFade delay={ANIMATION_DELAYS.description} duration={600} yOffset={16}>
            <div className="bg-white/5 rounded-xl p-4">
              <h2 className="text-lg font-semibold text-text-primary mb-2">About This Property</h2>
              <p className="text-text-secondary leading-relaxed">{property.description}</p>
            </div>
          </BlurFade>
        )}

        {/* Features */}
        {property.features && property.features.length > 0 && (
          <BlurFade delay={ANIMATION_DELAYS.features} duration={600} yOffset={16}>
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-text-primary">Features & Amenities</h2>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="grid grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-status-success shrink-0" />
                      <span className="text-text-primary">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </BlurFade>
        )}

        {/* Maintenance History */}
        {property.maintenanceHistory && property.maintenanceHistory.length > 0 && (
          <BlurFade delay={ANIMATION_DELAYS.maintenance} duration={600} yOffset={16}>
            <div className="flex flex-col gap-3 pb-6">
              <h2 className="text-xl font-semibold text-text-primary">Maintenance History</h2>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex flex-col gap-3">
                  {property.maintenanceHistory.map((record, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4"
                    >
                      <Wrench className="w-5 h-5 text-text-muted shrink-0" />
                      <div className="flex-1">
                        <span className="font-medium text-text-primary">
                          {record.description}
                        </span>
                      </div>
                      <span className="text-sm text-text-muted">{record.date}</span>
                      <span className="text-sm font-semibold text-accent-primary">{record.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </BlurFade>
        )}
      </div>
    </Container>
  );
}
