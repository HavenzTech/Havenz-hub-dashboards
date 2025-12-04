"use client";

import Image from "next/image";
import { classNames } from "@/lib/utils";

interface DepartmentCardProps {
  companyName: string;
  companyLogo: string;
  companyLogoScale?: number;
  departmentName: string;
  status: "Active" | "Inactive";
  ledBy: string;
  employees: number;
  budget: string;
  activeProjects: number;
  className?: string;
}

export function DepartmentCard({
  companyName,
  companyLogo,
  companyLogoScale = 1,
  departmentName,
  status,
  ledBy,
  employees,
  budget,
  activeProjects,
  className,
}: DepartmentCardProps) {
  return (
    <div
      className={classNames(
        "flex flex-col items-center gap-4 w-full",
        className
      )}
    >
      {/* Company Header: Logo + Name */}
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

      {/* Department Name */}
      <h3 className="text-2xl font-bold text-text-primary">
        {departmentName}
      </h3>

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

      {/* Led By */}
      <div className="flex flex-col items-center">
        <span className="text-xs text-text-muted uppercase tracking-wide">Led by</span>
        <span className="text-xl font-semibold text-text-primary">{ledBy}</span>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-center">
        {/* Employees */}
        <div className="flex flex-col">
          <span className="text-xs text-text-muted uppercase tracking-wide">Employees</span>
          <span className="text-xl font-semibold text-text-primary">{employees}</span>
        </div>

        {/* Budget */}
        <div className="flex flex-col">
          <span className="text-xs text-text-muted uppercase tracking-wide">Budget</span>
          <span className="text-xl font-semibold text-text-primary">{budget}</span>
        </div>
      </div>

      {/* Active Projects */}
      <div className="flex flex-col items-center">
        <span className="text-xs text-text-muted uppercase tracking-wide">Active Projects</span>
        <span className="text-xl font-semibold text-text-primary">{activeProjects}</span>
      </div>
    </div>
  );
}
