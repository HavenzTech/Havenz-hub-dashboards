"use client";

import Image from "next/image";
import { classNames } from "@/lib/utils";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { BlurFade } from "@/components/ui/BlurFade";
import { BlurText } from "@/components/ui/BlurText";

interface HeaderProps {
  companyName: string;
  companyUrl?: string;
  logoSrc?: string;
  className?: string;
  baseDelay?: number;
}

// Hardcoded weather data - replace with API later
const WEATHER = {
  tempC: -5,
  tempF: 23,
  condition: "Clear",
  location: "Calgary",
};

export function Header({
  companyName,
  companyUrl,
  logoSrc,
  className,
  baseDelay = 0,
}: HeaderProps) {
  // Format URL for display (remove protocol)
  const displayUrl = companyUrl?.replace(/^https?:\/\//, "").toUpperCase();

  const { formattedDate, formattedTime } = useCurrentTime();

  return (
    <header className={classNames("w-full flex flex-col", className)}>
      {/* Top Bar: Company Name and Website */}
      <div className="flex items-center justify-between px-8 py-3">
        <span className="text-sm font-medium tracking-widest text-text-secondary uppercase">
          <BlurText text={companyName} delay={baseDelay} duration={800} />
        </span>
        {companyUrl && (
          <a
            href={companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium tracking-widest text-text-secondary hover:text-brand-accent transition-colors uppercase"
          >
            <BlurText text={displayUrl || ""} delay={baseDelay + 100} duration={800} />
          </a>
        )}
      </div>

      {/* Main Header: Logo on left, Date/Time/Temp stacked on right */}
      <div className="flex items-center justify-between px-8 py-4">
        {/* Left: Large Logo */}
        {logoSrc && (
          <BlurFade delay={baseDelay + 200} duration={600} yOffset={16}>
            <div className="relative w-44 h-44 shrink-0">
              <Image
                src={logoSrc}
                alt={`${companyName} logo`}
                fill
                className="object-contain"
                priority
              />
            </div>
          </BlurFade>
        )}

        {/* Right: Day on top, Time and Temp side by side below */}
        <div className="flex flex-col items-end gap-2">
          {/* Current Day - on its own row */}
          <BlurFade delay={baseDelay + 300} duration={500} yOffset={8}>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-medium tracking-widest text-text-muted uppercase mb-0.5">
                Current Day
              </span>
              <span className="text-xl font-bold text-brand-accent tracking-wide">
                {formattedDate}
              </span>
            </div>
          </BlurFade>

          {/* Time and Temperature side by side */}
          <div className="flex items-start gap-8">
            {/* Current Time */}
            <BlurFade delay={baseDelay + 400} duration={500} yOffset={8}>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-medium tracking-widest text-text-muted uppercase mb-0.5">
                  Current Time
                </span>
                <span className="text-lg font-bold text-brand-accent font-mono tracking-wide">
                  {formattedTime}
                </span>
              </div>
            </BlurFade>

            {/* Current Temperature */}
            <BlurFade delay={baseDelay + 500} duration={500} yOffset={8}>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-medium tracking-widest text-text-muted uppercase mb-0.5">
                  Current Temperature
                </span>
                <span className="text-lg font-bold text-brand-accent tracking-wide">
                  {WEATHER.tempC}°c / {WEATHER.tempF}°f
                </span>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </header>
  );
}
