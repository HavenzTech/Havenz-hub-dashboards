"use client";

import Image from "next/image";
import { classNames } from "@/lib/utils";

interface PropertyCardProps {
  name: string;
  companyName: string;
  companyLogo: string;
  companyLogoScale?: number;
  status: "Operational" | "Under Maintenance" | "Inactive";
  type: string;
  location: string;
  size: string;
  acquired: number;
  className?: string;
}

export function PropertyCard({
  name,
  companyName,
  companyLogo,
  companyLogoScale = 1,
  status,
  type,
  location,
  size,
  acquired,
  className,
}: PropertyCardProps) {
  const statusStyles = {
    Operational: "bg-status-success/20 text-status-success",
    "Under Maintenance": "bg-status-warning/20 text-status-warning",
    Inactive: "bg-white/10 text-text-muted",
  };

  return (
    <div
      className={classNames(
        "flex flex-col items-center gap-3 w-full",
        className
      )}
    >
      {/* Header: Company Logo + Property Name */}
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
          <Image
            src={companyLogo}
            alt={companyName}
            fill
            className="object-contain"
            style={{ transform: `scale(${companyLogoScale})` }}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-text-primary">
            {name}
          </span>
          <span className="text-sm text-text-secondary">{companyName}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/10" />

      {/* Status Badge */}
      <div
        className={classNames(
          "px-3.5 py-1 rounded-full text-sm font-medium",
          statusStyles[status]
        )}
      >
        <span className="mr-1.5">●</span>
        {status}
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-center">
        {/* Type */}
        <div className="flex flex-col">
          <span className="text-xs text-text-muted uppercase tracking-wide">Type</span>
          <span className="text-xl font-semibold text-text-primary">{type}</span>
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <span className="text-xs text-text-muted uppercase tracking-wide">Location</span>
          <span className="text-xl font-semibold text-text-primary">{location}</span>
        </div>

        {/* Size */}
        <div className="flex flex-col">
          <span className="text-xs text-text-muted uppercase tracking-wide">Size</span>
          <span className="text-xl font-semibold text-text-primary">{size}</span>
        </div>

        {/* Acquired */}
        <div className="flex flex-col">
          <span className="text-xs text-text-muted uppercase tracking-wide">Acquired</span>
          <span className="text-xl font-semibold text-text-primary">{acquired}</span>
        </div>
      </div>
    </div>
  );
}
