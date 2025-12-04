"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { classNames } from "@/lib/utils";

interface Department {
  name: string;
  status: "Active" | "Inactive";
  ledBy: string;
  employees: number;
  budget: string;
  activeProjects: number;
}

interface RotatingDepartmentCardProps {
  companyName: string;
  companyLogo: string;
  companyLogoScale?: number;
  departments: Department[];
  rotateInterval?: number;
  initialDelay?: number;
  className?: string;
}

export function RotatingDepartmentCard({
  companyName,
  companyLogo,
  companyLogoScale = 1,
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
      {/* Company Header: Logo + Name (stays static) */}
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
          <Image
            src={companyLogo}
            alt={`${companyName} logo`}
            fill
            className="object-contain"
            style={{ transform: `scale(${companyLogoScale})` }}
          />
        </div>
        <span className="text-xl font-semibold text-text-primary">
          {companyName}
        </span>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/10" />

      {/* Department Content (animated) */}
      <div
        className={classNames(
          "flex flex-col items-center gap-4 w-full transition-all duration-300 ease-in-out",
          isAnimating ? "opacity-0 blur-sm" : "opacity-100 blur-0"
        )}
      >
        {/* Department Name */}
        <h3 className="text-2xl font-bold text-text-primary">
          {currentDepartment.name}
        </h3>

        {/* Led By */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-text-muted uppercase tracking-wide">Led by</span>
          <span className="text-xl font-semibold text-text-primary">{currentDepartment.ledBy}</span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-center">
          {/* Employees */}
          <div className="flex flex-col">
            <span className="text-xs text-text-muted uppercase tracking-wide">Employees</span>
            <span className="text-xl font-semibold text-text-primary">{currentDepartment.employees}</span>
          </div>

          {/* Budget */}
          <div className="flex flex-col">
            <span className="text-xs text-text-muted uppercase tracking-wide">Budget</span>
            <span className="text-xl font-semibold text-text-primary">{currentDepartment.budget}</span>
          </div>
        </div>

        {/* Active Projects */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-text-muted uppercase tracking-wide">Active Projects</span>
          <span className="text-xl font-semibold text-text-primary">{currentDepartment.activeProjects}</span>
        </div>
      </div>

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
