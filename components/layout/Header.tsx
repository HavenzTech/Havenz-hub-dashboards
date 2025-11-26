"use client";

import Image from "next/image";
import { classNames } from "@/lib/utils";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { useWeather } from "@/hooks/useWeather";

interface HeaderProps {
  companyName: string;
  companyUrl?: string;
  logoSrc?: string;
  className?: string;
}

// Convert Celsius to Fahrenheit
function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9) / 5 + 32);
}

// Convert Fahrenheit to Celsius
function fahrenheitToCelsius(fahrenheit: number): number {
  return Math.round(((fahrenheit - 32) * 5) / 9);
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
  const { weather, isLoading } = useWeather();

  // Calculate both Celsius and Fahrenheit
  const tempC =
    weather?.unit === "C"
      ? weather.temp
      : weather
      ? fahrenheitToCelsius(weather.temp)
      : null;
  const tempF =
    weather?.unit === "F"
      ? weather.temp
      : weather
      ? celsiusToFahrenheit(weather.temp)
      : null;

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

          {/* Time and Temperature side by side */}
          <div className="flex items-start gap-8">
            {/* Current Time */}
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-medium tracking-widest text-text-muted uppercase mb-0.5">
                Current Time
              </span>
              <span className="text-lg font-bold text-brand-accent font-mono tracking-wide">
                {formattedTime}
              </span>
            </div>

            {/* Current Temperature */}
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-medium tracking-widest text-text-muted uppercase mb-0.5">
                Current Temperature
              </span>
              <span className="text-lg font-bold text-brand-accent tracking-wide">
                {isLoading || !weather
                  ? "--°c / --°f"
                  : `${tempC}°c / ${tempF}°f`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
