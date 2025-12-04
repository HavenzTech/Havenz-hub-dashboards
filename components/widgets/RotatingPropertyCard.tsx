"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { classNames } from "@/lib/utils";

interface Property {
  id?: string;
  name: string;
  companyName: string;
  companyLogo: string;
  companyLogoScale?: number;
  status: "Operational" | "Under Maintenance" | "Inactive";
  type: string;
  location: string;
  size: string;
  acquired: number;
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
      {/* Content with fade animation */}
      {currentProperty.id ? (
        <Link href={`/properties/${currentProperty.id}`} className="w-full">
          <div
            className={classNames(
              "flex flex-col items-center gap-3 w-full transition-all duration-300 ease-in-out cursor-pointer hover:scale-[1.01]",
              isAnimating ? "opacity-0 blur-sm" : "opacity-100 blur-0"
            )}
          >
            {/* Header: Company Logo + Property Name */}
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                <Image
                  src={currentProperty.companyLogo}
                  alt={currentProperty.companyName}
                  fill
                  className="object-contain"
                  style={{ transform: `scale(${currentProperty.companyLogoScale || 1})` }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-text-primary">
                  {currentProperty.name}
                </span>
                <span className="text-sm text-text-secondary">{currentProperty.companyName}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/10" />

            {/* Status Badge */}
            <div
              className={classNames(
                "px-3.5 py-1 rounded-full text-sm font-medium",
                statusStyles[currentProperty.status]
              )}
            >
              <span className="mr-1.5">●</span>
              {currentProperty.status}
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-center">
              <div className="flex flex-col">
                <span className="text-xs text-text-muted uppercase tracking-wide">Type</span>
                <span className="text-xl font-semibold text-text-primary">{currentProperty.type}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-text-muted uppercase tracking-wide">Location</span>
                <span className="text-xl font-semibold text-text-primary">{currentProperty.location}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-text-muted uppercase tracking-wide">Size</span>
                <span className="text-xl font-semibold text-text-primary">{currentProperty.size}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-text-muted uppercase tracking-wide">Acquired</span>
                <span className="text-xl font-semibold text-text-primary">{currentProperty.acquired}</span>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div
          className={classNames(
            "flex flex-col items-center gap-3 w-full transition-all duration-300 ease-in-out",
            isAnimating ? "opacity-0 blur-sm" : "opacity-100 blur-0"
          )}
        >
          {/* Header: Company Logo + Property Name */}
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
              <Image
                src={currentProperty.companyLogo}
                alt={currentProperty.companyName}
                fill
                className="object-contain"
                style={{ transform: `scale(${currentProperty.companyLogoScale || 1})` }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-text-primary">
                {currentProperty.name}
              </span>
              <span className="text-sm text-text-secondary">{currentProperty.companyName}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/10" />

          {/* Status Badge */}
          <div
            className={classNames(
              "px-3.5 py-1 rounded-full text-sm font-medium",
              statusStyles[currentProperty.status]
            )}
          >
            <span className="mr-1.5">●</span>
            {currentProperty.status}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-center">
            <div className="flex flex-col">
              <span className="text-xs text-text-muted uppercase tracking-wide">Type</span>
              <span className="text-xl font-semibold text-text-primary">{currentProperty.type}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-text-muted uppercase tracking-wide">Location</span>
              <span className="text-xl font-semibold text-text-primary">{currentProperty.location}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-text-muted uppercase tracking-wide">Size</span>
              <span className="text-xl font-semibold text-text-primary">{currentProperty.size}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-text-muted uppercase tracking-wide">Acquired</span>
              <span className="text-xl font-semibold text-text-primary">{currentProperty.acquired}</span>
            </div>
          </div>
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
