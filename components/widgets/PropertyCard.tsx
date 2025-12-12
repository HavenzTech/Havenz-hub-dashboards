"use client";

import Image from "next/image";
import Link from "next/link";
import { classNames } from "@/lib/utils";
import { Building2, MapPin, Ruler, Cpu, Layers } from "lucide-react";

interface PropertyCardProps {
  id?: string;
  name?: string | null;
  companyName?: string | null;
  companyLogo?: string | null;
  status?: string | null;
  type?: string | null;
  locationCity?: string | null;
  locationProvince?: string | null;
  totalAreaFormatted?: string | null;
  sizeTotalArea?: number | null;
  sizeFloors?: number | null;
  deviceCount?: number;
  currentValueFormatted?: string | null;
  currentValue?: number | null;
  className?: string;
}

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

export function PropertyCard({
  id,
  name,
  companyName,
  companyLogo,
  status,
  type,
  locationCity,
  locationProvince,
  totalAreaFormatted,
  sizeTotalArea,
  sizeFloors,
  deviceCount,
  className,
}: PropertyCardProps) {
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

  const displayStatus = status || "Unknown";
  const displayLocation = [locationCity, locationProvince].filter(Boolean).join(", ") || "N/A";
  const displaySize = totalAreaFormatted || formatArea(sizeTotalArea);

  const content = (
    <>
      {/* Header: Company Logo + Property Name + Status */}
      <div className="flex items-center gap-3 w-full overflow-hidden">
        {companyLogo ? (
          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white/5">
            <Image
              src={companyLogo}
              alt={companyName || "Company"}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-text-muted font-bold text-sm shrink-0">
            {(companyName || name || "?").charAt(0)}
          </div>
        )}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <span className="text-base font-semibold text-text-primary truncate">
            {name || "Unnamed Property"}
          </span>
          <span className="text-xs text-text-secondary truncate">{companyName || "Unknown"}</span>
        </div>
        <div
          className={classNames(
            "px-2 py-0.5 rounded-full text-xs font-medium shrink-0 whitespace-nowrap",
            getStatusColor(status)
          )}
        >
          <span className="mr-1">●</span>
          {displayStatus}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/10" />

      {/* Info Grid - 4 rows */}
      <div className="flex flex-col gap-2 w-full">
        {/* Type */}
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
          <Building2 className="w-4 h-4 text-accent-primary shrink-0" />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs text-text-muted">Type</span>
            <span className="text-sm font-semibold text-text-primary truncate">{type || "N/A"}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
          <MapPin className="w-4 h-4 text-accent-primary shrink-0" />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs text-text-muted">Location</span>
            <span className="text-sm font-semibold text-text-primary truncate">{displayLocation}</span>
          </div>
        </div>

        {/* Size */}
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
          <Ruler className="w-4 h-4 text-accent-primary shrink-0" />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs text-text-muted">Size</span>
            <span className="text-sm font-semibold text-text-primary truncate">{displaySize}</span>
          </div>
        </div>

        {/* Floors or Devices */}
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
          {sizeFloors !== undefined && sizeFloors !== null ? (
            <>
              <Layers className="w-4 h-4 text-accent-primary shrink-0" />
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs text-text-muted">Floors</span>
                <span className="text-sm font-semibold text-text-primary">{sizeFloors}</span>
              </div>
            </>
          ) : (
            <>
              <Cpu className="w-4 h-4 text-accent-primary shrink-0" />
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs text-text-muted">Devices</span>
                <span className="text-sm font-semibold text-text-primary">{deviceCount ?? 0}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );

  if (id) {
    return (
      <Link href={`/properties/${id}`} className={classNames("flex flex-col items-center gap-3 w-full cursor-pointer hover:scale-[1.02] transition-transform", className)}>
        {content}
      </Link>
    );
  }

  return (
    <div className={classNames("flex flex-col items-center gap-3 w-full", className)}>
      {content}
    </div>
  );
}
