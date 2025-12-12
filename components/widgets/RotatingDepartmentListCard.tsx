"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { classNames } from "@/lib/utils";
import { Building2, Users, DollarSign, UserCircle } from "lucide-react";

interface Department {
  id?: string;
  name?: string | null;
  companyName?: string | null;
  companyLogo?: string | null;
  headName?: string | null;
  memberCount?: number;
  budgetAllocated?: number | null;
  budgetAllocatedFormatted?: string | null;
}

// Format budget number to display string
function formatBudget(amount?: number | null): string {
  if (amount === null || amount === undefined) return "N/A";
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(0)}K`;
  }
  return `$${amount}`;
}

interface RotatingDepartmentListCardProps {
  departments: Department[];
  rotateInterval?: number;
  className?: string;
}

export function RotatingDepartmentListCard({
  departments,
  rotateInterval = 5000,
  className,
}: RotatingDepartmentListCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (departments.length <= 1) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % departments.length);
        setIsAnimating(false);
      }, 300);
    }, rotateInterval);

    return () => clearInterval(interval);
  }, [departments.length, rotateInterval]);

  const currentDepartment = departments[currentIndex];

  if (!currentDepartment) return null;

  const cardContent = (
    <>
      {/* Header: Company Logo + Department Name */}
      <div className="flex items-center gap-3 w-full overflow-hidden">
        {currentDepartment.companyLogo ? (
          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white/5">
            <Image
              src={currentDepartment.companyLogo}
              alt={currentDepartment.companyName || "Company"}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-text-muted font-bold text-sm shrink-0">
            {(currentDepartment.companyName || currentDepartment.name || "?").charAt(0)}
          </div>
        )}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <span className="text-base font-semibold text-text-primary truncate">
            {currentDepartment.name || "Unnamed Department"}
          </span>
          <span className="text-xs text-text-secondary truncate">{currentDepartment.companyName || "Unknown"}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/10" />

      {/* Info Grid - 4 rows */}
      <div className="flex flex-col gap-2 w-full">
        {/* Head */}
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
          <UserCircle className="w-4 h-4 text-accent-primary shrink-0" />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs text-text-muted">Head</span>
            <span className="text-sm font-semibold text-text-primary truncate">{currentDepartment.headName || "N/A"}</span>
          </div>
        </div>

        {/* Company */}
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
          <Building2 className="w-4 h-4 text-accent-primary shrink-0" />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs text-text-muted">Company</span>
            <span className="text-sm font-semibold text-text-primary truncate">{currentDepartment.companyName || "N/A"}</span>
          </div>
        </div>

        {/* Members */}
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
          <Users className="w-4 h-4 text-accent-primary shrink-0" />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs text-text-muted">Members</span>
            <span className="text-sm font-semibold text-text-primary">{currentDepartment.memberCount ?? 0}</span>
          </div>
        </div>

        {/* Budget */}
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
          <DollarSign className="w-4 h-4 text-accent-primary shrink-0" />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs text-text-muted">Budget</span>
            <span className="text-sm font-semibold text-text-primary">{currentDepartment.budgetAllocatedFormatted || formatBudget(currentDepartment.budgetAllocated)}</span>
          </div>
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
      {currentDepartment.id ? (
        <Link href={`/departments/${currentDepartment.id}`} className="w-full flex-1">
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
