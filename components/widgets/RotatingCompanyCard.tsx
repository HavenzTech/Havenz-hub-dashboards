"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { classNames } from "@/lib/utils";

interface Company {
  id?: string;
  name?: string | null;
  logoUrl?: string | null;
  status?: string | null;
  annualRevenue?: number | null;
  location?: string | null;
  industry?: string | null;
  employeeCount?: number;
}

interface RotatingCompanyCardProps {
  companies: Company[];
  rotateInterval?: number;
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

export function RotatingCompanyCard({
  companies,
  rotateInterval = 5000,
  className,
}: RotatingCompanyCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (companies.length <= 1) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % companies.length);
        setIsAnimating(false);
      }, 300);
    }, rotateInterval);

    return () => clearInterval(interval);
  }, [companies.length, rotateInterval]);

  const currentCompany = companies[currentIndex];

  if (!currentCompany) return null;

  const displayName = currentCompany.name || "Unknown";
  const isActive = currentCompany.status?.toLowerCase() === "active";
  const displayStatus = currentCompany.status === "active" ? "Active" : currentCompany.status === "inactive" ? "Inactive" : currentCompany.status || "Unknown";

  const cardContent = (
    <div
      className={classNames(
        "flex flex-col items-center gap-4 w-full transition-all duration-300 ease-in-out",
        isAnimating ? "opacity-0 blur-sm" : "opacity-100 blur-0",
        currentCompany.id && "cursor-pointer hover:scale-[1.02]"
      )}
    >
      {/* Header: Logo + Name */}
      <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-white/5">
            {currentCompany.logoUrl ? (
              <Image
                src={currentCompany.logoUrl}
                alt={`${displayName} logo`}
                fill
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-muted text-xl font-bold">
                {displayName.charAt(0)}
              </div>
            )}
          </div>
          <span className="text-xl font-semibold text-text-primary">
            {displayName}
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
            <span className="text-xl font-semibold text-text-primary">{formatRevenue(currentCompany.annualRevenue)}</span>
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <span className="text-xs text-text-muted uppercase tracking-wide">Location</span>
            <span className="text-xl font-semibold text-text-primary">{currentCompany.location || "N/A"}</span>
          </div>

          {/* Industry */}
          <div className="flex flex-col">
            <span className="text-xs text-text-muted uppercase tracking-wide">Industry</span>
            <span className="text-xl font-semibold text-text-primary">{currentCompany.industry || "N/A"}</span>
          </div>

          {/* Employees */}
          <div className="flex flex-col">
            <span className="text-xs text-text-muted uppercase tracking-wide">Employees</span>
            <span className="text-xl font-semibold text-text-primary">{currentCompany.employeeCount ?? 0}</span>
          </div>
        </div>
    </div>
  );

  return (
    <div
      className={classNames(
        "flex flex-col items-center gap-4 w-full",
        className
      )}
    >
      {/* Content with fade animation */}
      {currentCompany.id ? (
        <Link href={`/companies/${currentCompany.id}`}>
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}

      {/* Pagination dots */}
      {companies.length > 1 && (
        <div className="flex gap-1.5">
          {companies.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setIsAnimating(false);
                }, 300);
              }}
              className={classNames(
                "w-1.5 h-1.5 rounded-full transition-all",
                currentIndex === index
                  ? "bg-brand-accent w-4"
                  : "bg-white/20 hover:bg-white/40"
              )}
              aria-label={`Go to ${companies[index].name}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
