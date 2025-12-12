"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { classNames } from "@/lib/utils";
import { Building2, MapPin, Ruler, Cpu, Layers } from "lucide-react";

interface Property {
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

interface RotatingPropertyCardProps {
  properties: Property[];
  rotateInterval?: number;
  className?: string;
}

export function RotatingPropertyCard({
  properties,
  rotateInterval = 5000,
  className,
}: RotatingPropertyCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (properties.length <= 1) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % properties.length);
        setIsAnimating(false);
      }, 300);
    }, rotateInterval);

    return () => clearInterval(interval);
  }, [properties.length, rotateInterval]);

  const currentProperty = properties[currentIndex];

  if (!currentProperty) return null;

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

  const displayStatus = currentProperty.status || "Unknown";
  const displayLocation = [currentProperty.locationCity, currentProperty.locationProvince].filter(Boolean).join(", ") || "N/A";
  const displaySize = currentProperty.totalAreaFormatted || formatArea(currentProperty.sizeTotalArea);

  const cardContent = (
    <>
      {/* Header: Company Logo + Property Name + Status */}
      <div className="flex items-center gap-3 w-full overflow-hidden">
        {currentProperty.companyLogo ? (
          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white/5">
            <Image
              src={currentProperty.companyLogo}
              alt={currentProperty.companyName || "Company"}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-text-muted font-bold text-sm shrink-0">
            {(currentProperty.companyName || currentProperty.name || "?").charAt(0)}
          </div>
        )}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <span className="text-base font-semibold text-text-primary truncate">
            {currentProperty.name || "Unnamed Property"}
          </span>
          <span className="text-xs text-text-secondary truncate">{currentProperty.companyName || "Unknown"}</span>
        </div>
        <div
          className={classNames(
            "px-2 py-0.5 rounded-full text-xs font-medium shrink-0 whitespace-nowrap",
            getStatusColor(currentProperty.status)
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
            <span className="text-sm font-semibold text-text-primary truncate">{currentProperty.type || "N/A"}</span>
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
          {currentProperty.sizeFloors !== undefined && currentProperty.sizeFloors !== null ? (
            <>
              <Layers className="w-4 h-4 text-accent-primary shrink-0" />
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs text-text-muted">Floors</span>
                <span className="text-sm font-semibold text-text-primary">{currentProperty.sizeFloors}</span>
              </div>
            </>
          ) : (
            <>
              <Cpu className="w-4 h-4 text-accent-primary shrink-0" />
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs text-text-muted">Devices</span>
                <span className="text-sm font-semibold text-text-primary">{currentProperty.deviceCount ?? 0}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div
      className={classNames(
        "flex flex-col items-center gap-3 w-full",
        className
      )}
    >
      {/* Content with fade animation */}
      {currentProperty.id ? (
        <Link href={`/properties/${currentProperty.id}`} className="w-full flex-1">
          <div
            className={classNames(
              "flex flex-col items-center gap-3 w-full h-full transition-all duration-300 ease-in-out cursor-pointer hover:scale-[1.01]",
              isAnimating ? "opacity-0 blur-sm" : "opacity-100 blur-0"
            )}
          >
            {cardContent}
          </div>
        </Link>
      ) : (
        <div
          className={classNames(
            "flex flex-col items-center gap-3 w-full flex-1 transition-all duration-300 ease-in-out",
            isAnimating ? "opacity-0 blur-sm" : "opacity-100 blur-0"
          )}
        >
          {cardContent}
        </div>
      )}

      {/* Pagination dots */}
      {properties.length > 1 && (
        <div className="flex gap-1.5">
          {properties.map((_, index) => (
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
              aria-label={`Go to ${properties[index].name}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
