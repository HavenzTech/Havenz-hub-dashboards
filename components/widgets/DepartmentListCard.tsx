"use client";

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

interface DepartmentListCardProps {
  department: Department;
  className?: string;
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

export function DepartmentListCard({
  department,
  className,
}: DepartmentListCardProps) {
  const content = (
    <>
      {/* Header: Company Logo + Department Name */}
      <div className="flex items-center gap-3 w-full overflow-hidden">
        {department.companyLogo ? (
          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white/5">
            <Image
              src={department.companyLogo}
              alt={department.companyName || "Company"}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-text-muted font-bold text-sm shrink-0">
            {(department.companyName || department.name || "?").charAt(0)}
          </div>
        )}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <span className="text-base font-semibold text-text-primary truncate">
            {department.name || "Unnamed Department"}
          </span>
          <span className="text-xs text-text-secondary truncate">{department.companyName || "Unknown"}</span>
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
            <span className="text-sm font-semibold text-text-primary truncate">{department.headName || "N/A"}</span>
          </div>
        </div>

        {/* Company */}
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
          <Building2 className="w-4 h-4 text-accent-primary shrink-0" />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs text-text-muted">Company</span>
            <span className="text-sm font-semibold text-text-primary truncate">{department.companyName || "N/A"}</span>
          </div>
        </div>

        {/* Members */}
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
          <Users className="w-4 h-4 text-accent-primary shrink-0" />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs text-text-muted">Members</span>
            <span className="text-sm font-semibold text-text-primary">{department.memberCount ?? 0}</span>
          </div>
        </div>

        {/* Budget */}
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
          <DollarSign className="w-4 h-4 text-accent-primary shrink-0" />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs text-text-muted">Budget</span>
            <span className="text-sm font-semibold text-text-primary">{department.budgetAllocatedFormatted || formatBudget(department.budgetAllocated)}</span>
          </div>
        </div>
      </div>
    </>
  );

  if (department.id) {
    return (
      <Link href={`/departments/${department.id}`} className={classNames("flex flex-col items-center gap-3 w-full cursor-pointer hover:scale-[1.02] transition-transform", className)}>
        {content}
      </Link>
    );
  }

  return (
    <div className={classNames("flex flex-col items-center gap-3 w-full", className)}>
      {content}
    </div>
  );
}
