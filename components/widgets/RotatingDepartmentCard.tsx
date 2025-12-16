"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { classNames } from "@/lib/utils";

interface Department {
  id?: string;
  name?: string | null;
  headName?: string | null;
  memberCount?: number;
  budgetAllocated?: number | null;
  budgetAllocatedFormatted?: string | null;
}

// Format budget number to display string
function formatBudget(amount?: number | null): string {
  if (amount === null || amount === undefined) return "N/A";
  const formatter = new Intl.NumberFormat('en-CA', { maximumFractionDigits: 0 });
  if (amount >= 1_000_000) {
    return '$' + (amount / 1_000_000).toFixed(1) + 'M';
  }
  if (amount >= 1_000) {
    return '$' + formatter.format(Math.round(amount / 1_000)) + 'K';
  }
  return '$' + formatter.format(amount);
}

interface RotatingDepartmentCardProps {
  companyName: string;
  companyLogo?: string | null;
  departments: Department[];
  rotateInterval?: number;
  initialDelay?: number;
  className?: string;
}

export function RotatingDepartmentCard({
  companyName,
  companyLogo,
  departments,
  rotateInterval = 5000,
  initialDelay = 0,
  className,
}: RotatingDepartmentCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (departments.length <= 1) return;

    // Initial delay before starting rotation
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % departments.length);
          setIsAnimating(false);
        }, 300);
      }, rotateInterval);

      return () => clearInterval(interval);
    }, initialDelay);

    return () => clearTimeout(startTimeout);
  }, [departments.length, rotateInterval, initialDelay]);

  const currentDepartment = departments[currentIndex];

  if (!currentDepartment) return null;

  return (
    <div
      className={classNames(
        "flex flex-col items-center gap-4 w-full",
        className
      )}
    >
      {/* Department Content (animated) */}
      {currentDepartment.id ? (
        <Link href={`/departments/${currentDepartment.id}`} className="w-full">
          <div
            className={classNames(
              "flex flex-col items-center gap-4 w-full transition-all duration-300 ease-in-out cursor-pointer hover:scale-[1.02]",
              isAnimating ? "opacity-0 blur-sm" : "opacity-100 blur-0"
            )}
          >
            {/* Department Name */}
            <h3 className="text-2xl font-bold text-text-primary">
              {currentDepartment.name || "Unnamed Department"}
            </h3>

            {/* Company: Logo + Name */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white/5">
                {companyLogo ? (
                  <Image
                    src={companyLogo}
                    alt={`${companyName} logo`}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-muted text-sm font-bold">
                    {companyName.charAt(0)}
                  </div>
                )}
              </div>
              <span className="text-base text-text-muted">
                {companyName}
              </span>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/10" />

            {/* Led By */}
            {currentDepartment.headName && (
              <div className="flex flex-col items-center">
                <span className="text-xs text-text-muted uppercase tracking-wide">Led by</span>
                <span className="text-xl font-semibold text-text-primary">{currentDepartment.headName}</span>
              </div>
            )}

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-center">
              {/* Members */}
              <div className="flex flex-col">
                <span className="text-xs text-text-muted uppercase tracking-wide">Members</span>
                <span className="text-xl font-semibold text-text-primary">{currentDepartment.memberCount ?? 0}</span>
              </div>

              {/* Budget */}
              <div className="flex flex-col">
                <span className="text-xs text-text-muted uppercase tracking-wide">Budget</span>
                <span className="text-xl font-semibold text-text-primary">{formatBudget(currentDepartment.budgetAllocated)}</span>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div
          className={classNames(
            "flex flex-col items-center gap-4 w-full transition-all duration-300 ease-in-out",
            isAnimating ? "opacity-0 blur-sm" : "opacity-100 blur-0"
          )}
        >
          {/* Department Name */}
          <h3 className="text-2xl font-bold text-text-primary">
            {currentDepartment.name || "Unnamed Department"}
          </h3>

          {/* Company: Logo + Name */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white/5">
              {companyLogo ? (
                <Image
                  src={companyLogo}
                  alt={`${companyName} logo`}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-muted text-sm font-bold">
                  {companyName.charAt(0)}
                </div>
              )}
            </div>
            <span className="text-base text-text-muted">
              {companyName}
            </span>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/10" />

          {/* Led By */}
          {currentDepartment.headName && (
            <div className="flex flex-col items-center">
              <span className="text-xs text-text-muted uppercase tracking-wide">Led by</span>
              <span className="text-xl font-semibold text-text-primary">{currentDepartment.headName}</span>
            </div>
          )}

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-center">
            {/* Members */}
            <div className="flex flex-col">
              <span className="text-xs text-text-muted uppercase tracking-wide">Members</span>
              <span className="text-xl font-semibold text-text-primary">{currentDepartment.memberCount ?? 0}</span>
            </div>

            {/* Budget */}
            <div className="flex flex-col">
              <span className="text-xs text-text-muted uppercase tracking-wide">Budget</span>
              <span className="text-xl font-semibold text-text-primary">{formatBudget(currentDepartment.budgetAllocated)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Pagination dots */}
      {departments.length > 1 && (
        <div className="flex gap-1.5">
          {departments.map((_, index) => (
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
              aria-label={`Go to ${departments[index].name}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
