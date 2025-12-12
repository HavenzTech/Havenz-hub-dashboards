"use client";

import Image from "next/image";
import Link from "next/link";
import { classNames } from "@/lib/utils";

interface CompanyCardProps {
  name: string;
  id?: string;
  logoUrl?: string | null;
  status?: string | null;
  revenue?: number | null; // annualRevenue as number
  location?: string | null;
  industry?: string | null;
  employees?: number;
  className?: string;
}

// Helper to format revenue number to display string
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

export function CompanyCard({
  name,
  id,
  logoUrl,
  status,
  revenue,
  location,
  industry,
  employees,
  className,
}: CompanyCardProps) {
  const displayStatus = status === "active" ? "Active" : status === "inactive" ? "Inactive" : status || "Unknown";
  const isActive = status?.toLowerCase() === "active";
  const content = (
    <div
      className={classNames(
        "flex flex-col items-center gap-4 w-full",
        id && "cursor-pointer hover:scale-[1.02] transition-transform",
        className
      )}
    >
      {/* Header: Logo + Name */}
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-white/5">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={`${name} logo`}
              fill
              className="object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-muted text-xl font-bold">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <span className="text-xl font-semibold text-text-primary">
          {name}
        </span>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/10" />

      {/* Status Badge */}
      <div
        className={classNames(
          "px-3.5 py-1 rounded-full text-sm font-medium",
          isActive
            ? "bg-status-success/20 text-status-success"
            : "bg-white/10 text-text-muted"
        )}
      >
        <span className="mr-1.5">●</span>
        {displayStatus}
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-center">
        {/* Revenue */}
        <div className="flex flex-col">
          <span className="text-xs text-text-muted uppercase tracking-wide">Revenue</span>
          <span className="text-xl font-semibold text-text-primary">{formatRevenue(revenue)}</span>
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <span className="text-xs text-text-muted uppercase tracking-wide">Location</span>
          <span className="text-xl font-semibold text-text-primary">{location || "N/A"}</span>
        </div>

        {/* Industry */}
        <div className="flex flex-col">
          <span className="text-xs text-text-muted uppercase tracking-wide">Industry</span>
          <span className="text-xl font-semibold text-text-primary">{industry || "N/A"}</span>
        </div>

        {/* Employees */}
        <div className="flex flex-col">
          <span className="text-xs text-text-muted uppercase tracking-wide">Employees</span>
          <span className="text-xl font-semibold text-text-primary">{employees ?? 0}</span>
        </div>
      </div>
    </div>
  );

  if (id) {
    return (
      <Link href={`/companies/${id}`}>
        {content}
      </Link>
    );
  }

  return content;
}
