"use client";

import Image from "next/image";
import Link from "next/link";
import { classNames } from "@/lib/utils";
import { Zap, Flame, Gauge } from "lucide-react";

interface HeatPlantCardProps {
  id: string;
  name: string;
  companyName: string;
  companyLogo: string;
  companyLogoScale?: number;
  status: "Online" | "Offline" | "Maintenance";
  efficiency: number;
  powerOutput: string;
  heatOutput: string;
  capacity: string;
  className?: string;
}

export function HeatPlantCard({
  id,
  name,
  companyName,
  companyLogo,
  companyLogoScale = 1,
  status,
  efficiency,
  powerOutput,
  heatOutput,
  capacity,
  className,
}: HeatPlantCardProps) {
  const statusStyles = {
    Online: "bg-status-success/20 text-status-success",
    Offline: "bg-status-error/20 text-status-error",
    Maintenance: "bg-status-warning/20 text-status-warning",
  };

  return (
    <Link
      href={`/heatplant/${id}`}
      className={classNames(
        "flex flex-col gap-3 w-full cursor-pointer hover:scale-[1.02] transition-transform",
        className
      )}
    >
      {/* Header: Company Logo + Name */}
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
          <Image
            src={companyLogo}
            alt={companyName}
            fill
            className="object-contain"
            style={{ transform: `scale(${companyLogoScale})` }}
          />
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-xl font-semibold text-text-primary">{name}</span>
          <span className="text-sm text-text-secondary">{companyName}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-text-muted">Efficiency</span>
          <span className={classNames(
            "text-2xl font-bold",
            efficiency >= 90 ? "text-status-success" : efficiency >= 80 ? "text-status-warning" : efficiency > 0 ? "text-status-error" : "text-text-muted"
          )}>{efficiency}%</span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/10" />

      {/* Status Badge */}
      <div className="flex justify-center">
        <div className={classNames("px-3.5 py-1 rounded-full text-sm font-medium", statusStyles[status])}>
          <span className="mr-1.5">●</span>
          {status}
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-3 gap-x-4 text-center">
        <div className="flex flex-col items-center gap-1">
          <Zap className="w-5 h-5 text-accent-primary" />
          <span className="text-xs text-text-muted uppercase tracking-wide">Power</span>
          <span className="text-lg font-semibold text-text-primary">{powerOutput}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Flame className="w-5 h-5 text-orange-400" />
          <span className="text-xs text-text-muted uppercase tracking-wide">Heat</span>
          <span className="text-lg font-semibold text-text-primary">{heatOutput}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Gauge className="w-5 h-5 text-accent-primary" />
          <span className="text-xs text-text-muted uppercase tracking-wide">Capacity</span>
          <span className="text-lg font-semibold text-text-primary">{capacity}</span>
        </div>
      </div>
    </Link>
  );
}
