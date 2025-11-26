"use client";

import { useWeather } from "@/hooks/useWeather";
import { classNames } from "@/lib/utils";

interface TemperatureWidgetProps {
  className?: string;
  showCondition?: boolean;
  showLocation?: boolean;
}

// Convert Celsius to Fahrenheit
function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9) / 5 + 32);
}

// Convert Fahrenheit to Celsius
function fahrenheitToCelsius(fahrenheit: number): number {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}

export function TemperatureWidget({
  className,
  showCondition = false,
  showLocation = false,
}: TemperatureWidgetProps) {
  const { weather, isLoading } = useWeather();

  if (isLoading || !weather) {
    return (
      <div className={classNames("flex flex-col", className)}>
        <span className="text-xs font-medium tracking-widest text-text-muted uppercase mb-1">
          Current Temperature
        </span>
        <span className="text-2xl font-bold text-text-muted">--°c / --°f</span>
      </div>
    );
  }

  // Calculate both Celsius and Fahrenheit
  const tempC = weather.unit === "C" ? weather.temp : fahrenheitToCelsius(weather.temp);
  const tempF = weather.unit === "F" ? weather.temp : celsiusToFahrenheit(weather.temp);

  return (
    <div className={classNames("flex flex-col", className)}>
      <span className="text-xs font-medium tracking-widest text-text-muted uppercase mb-1">
        Current Temperature
      </span>
      <span className="text-2xl font-bold text-brand-accent tracking-wide">
        {tempC}°c / {tempF}°f
      </span>
      {showCondition && (
        <span className="text-sm text-text-secondary mt-1">
          {weather.condition}
        </span>
      )}
      {showLocation && weather.location && (
        <span className="text-xs text-text-muted">
          {weather.location}
        </span>
      )}
    </div>
  );
}
