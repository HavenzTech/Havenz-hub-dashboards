"use client";

import Image from "next/image";
import { classNames } from "@/lib/utils";
import { useCurrentTime } from "@/hooks/useCurrentTime";

interface HeaderProps {
  companyName: string;
  companyUrl?: string;
  logoSrc?: string;
  className?: string;
}

export function Header({
  companyName,
  companyUrl,
  logoSrc,
  className,
}: HeaderProps) {
  // Format URL for display (remove protocol)
  const displayUrl = companyUrl?.replace(/^https?:\/\//, "").toUpperCase();

  const { formattedDate, formattedTime } = useCurrentTime();

  return (
    <header className={classNames("w-full flex flex-col", className)}>
      {/* Top Bar: Company Name and Website */}
      <div className="flex items-center justify-between px-8 py-3">
        <span className="text-sm font-medium tracking-widest text-text-secondary uppercase">
          {companyName}
        </span>
        {companyUrl && (
          <a
            href={companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium tracking-widest text-text-secondary hover:text-brand-accent transition-colors uppercase"
          >
            {displayUrl}
          </a>
        )}
      </div>

      {/* Main Header: Logo on left, Date/Time/Temp stacked on right */}
      <div className="flex items-center justify-between px-8 py-4">
        {/* Left: Large Logo */}
        {logoSrc && (
          <div className="relative w-44 h-44 shrink-0">
            <Image
              src={logoSrc}
              alt={`${companyName} logo`}
              fill
              className="object-contain"
              priority
            />
          </div>
        )}

        {/* Right: Day on top, Time and Temp side by side below */}
        <div className="flex flex-col items-end gap-2">
          {/* Current Day - on its own row */}
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-medium tracking-widest text-text-muted uppercase mb-0.5">
              Current Day
            </span>
            <span className="text-xl font-bold text-brand-accent tracking-wide">
              {formattedDate}
            </span>
          </div>

          {/* Current Time */}
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-medium tracking-widest text-text-muted uppercase mb-0.5">
              Current Time
            </span>
            <span className="text-lg font-bold text-brand-accent font-mono tracking-wide">
              {formattedTime}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
