"use client";

import Link from "next/link";
import { classNames } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PortfolioCardProps {
  id: string;
  name: string;
  type: "Stock" | "Crypto" | "Real Estate" | "Mixed";
  totalValue: string;
  totalReturn: string;
  returnPercent: number;
  riskLevel: "Low" | "Medium" | "High";
  holdingsCount: number;
  className?: string;
}

export function PortfolioCard({
  id,
  name,
  type,
  totalValue,
  totalReturn,
  returnPercent,
  riskLevel,
  holdingsCount,
  className,
}: PortfolioCardProps) {
  const riskStyles = {
    Low: "bg-status-success/20 text-status-success",
    Medium: "bg-status-warning/20 text-status-warning",
    High: "bg-status-error/20 text-status-error",
  };

  const typeStyles = {
    Stock: "bg-accent-primary/20 text-accent-primary",
    Crypto: "bg-purple-500/20 text-purple-400",
    "Real Estate": "bg-blue-500/20 text-blue-400",
    Mixed: "bg-white/10 text-text-secondary",
  };

  return (
    <Link
      href={`/portfolio/${id}`}
      className={classNames(
        "flex flex-col gap-3 w-full cursor-pointer hover:scale-[1.02] transition-transform",
        className
      )}
    >
      {/* Header: Name */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-text-primary">{name}</h3>
        <div className="flex items-center gap-2">
          <div className={classNames("px-2 py-0.5 rounded-full text-xs font-medium", typeStyles[type])}>
            {type}
          </div>
          <div className={classNames("px-2 py-0.5 rounded-full text-xs font-medium", riskStyles[riskLevel])}>
            {riskLevel}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/10" />

      {/* Value and Return */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-text-muted uppercase tracking-wide">Total Value</span>
          <span className="text-2xl font-bold text-text-primary">{totalValue}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-text-muted uppercase tracking-wide">Return</span>
          <div className="flex items-center gap-1">
            {returnPercent >= 0 ? (
              <TrendingUp className="w-5 h-5 text-status-success" />
            ) : (
              <TrendingDown className="w-5 h-5 text-status-error" />
            )}
            <span className={classNames(
              "text-xl font-bold",
              returnPercent >= 0 ? "text-status-success" : "text-status-error"
            )}>
              {returnPercent >= 0 ? "+" : ""}{returnPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-x-4 text-center">
        <div className="flex flex-col">
          <span className="text-xs text-text-muted uppercase tracking-wide">Total Return</span>
          <span className={classNames(
            "text-lg font-semibold",
            returnPercent >= 0 ? "text-status-success" : "text-status-error"
          )}>{totalReturn}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-text-muted uppercase tracking-wide">Holdings</span>
          <span className="text-lg font-semibold text-text-primary">{holdingsCount}</span>
        </div>
      </div>
    </Link>
  );
}
