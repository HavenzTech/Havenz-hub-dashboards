"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { classNames } from "@/lib/utils";

interface Company {
  id?: string;
  name: string;
  logoSrc: string;
  logoScale?: number;
  status: "Active" | "Inactive";
  revenue: string;
  location: string;
  industry: string;
  employees: number;
  founded: number;
}

interface RotatingCompanyCardProps {
  companies: Company[];
  rotateInterval?: number;
  className?: string;
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
          <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
            <Image
              src={currentCompany.logoSrc}
              alt={`${currentCompany.name} logo`}
              fill
              className="object-contain"
              style={{ transform: `scale(${currentCompany.logoScale || 1})` }}
            />
          </div>
          <span className="text-xl font-semibold text-text-primary">
            {currentCompany.name}
          </span>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10" />

        {/* Status Badge */}
        <div
          className={classNames(
            "px-3.5 py-1 rounded-full text-sm font-medium",
            currentCompany.status === "Active"
              ? "bg-status-success/20 text-status-success"
              : "bg-white/10 text-text-muted"
          )}
        >
          <span className="mr-1.5">●</span>
          {currentCompany.status}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-center">
          {/* Revenue */}
          <div className="flex flex-col">
            <span className="text-xs text-text-muted uppercase tracking-wide">Revenue</span>
            <span className="text-xl font-semibold text-text-primary">{currentCompany.revenue}</span>
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <span className="text-xs text-text-muted uppercase tracking-wide">Location</span>
            <span className="text-xl font-semibold text-text-primary">{currentCompany.location}</span>
          </div>

          {/* Industry */}
          <div className="flex flex-col">
            <span className="text-xs text-text-muted uppercase tracking-wide">Industry</span>
            <span className="text-xl font-semibold text-text-primary">{currentCompany.industry}</span>
          </div>

          {/* Employees */}
          <div className="flex flex-col">
            <span className="text-xs text-text-muted uppercase tracking-wide">Employees</span>
            <span className="text-xl font-semibold text-text-primary">{currentCompany.employees}</span>
          </div>
        </div>

      {/* Founded */}
      <div className="text-sm text-text-secondary">
        Est. {currentCompany.founded}
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
