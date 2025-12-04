"use client";

import Image from "next/image";
import Link from "next/link";
import { classNames } from "@/lib/utils";

interface CompanyCardProps {
  name: string;
  id?: string;
  logoSrc: string;
  logoScale?: number;
  status: "Active" | "Inactive";
  revenue: string;
  location: string;
  industry: string;
  employees: number;
  founded: number;
  className?: string;
}

export function CompanyCard({
  name,
  id,
  logoSrc,
  logoScale = 1,
  status,
  revenue,
  location,
  industry,
  employees,
  founded,
  className,
}: CompanyCardProps) {
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
        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
          <Image
            src={logoSrc}
            alt={`${name} logo`}
            fill
            className="object-contain"
            style={{ transform: `scale(${logoScale})` }}
          />
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
          status === "Active"
            ? "bg-status-success/20 text-status-success"
            : "bg-white/10 text-text-muted"
        )}
      >
        <span className="mr-1.5">●</span>
        {status}
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-center">
        {/* Revenue */}
        <div className="flex flex-col">
          <span className="text-xs text-text-muted uppercase tracking-wide">Revenue</span>
          <span className="text-xl font-semibold text-text-primary">{revenue}</span>
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <span className="text-xs text-text-muted uppercase tracking-wide">Location</span>
          <span className="text-xl font-semibold text-text-primary">{location}</span>
        </div>

        {/* Industry */}
        <div className="flex flex-col">
          <span className="text-xs text-text-muted uppercase tracking-wide">Industry</span>
          <span className="text-xl font-semibold text-text-primary">{industry}</span>
        </div>

        {/* Employees */}
        <div className="flex flex-col">
          <span className="text-xs text-text-muted uppercase tracking-wide">Employees</span>
          <span className="text-xl font-semibold text-text-primary">{employees}</span>
        </div>
      </div>

      {/* Founded */}
      <div className="text-sm text-text-secondary">
        Est. {founded}
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
