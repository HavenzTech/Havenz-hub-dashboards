"use client";

import { useState, useEffect } from "react";
import { classNames } from "@/lib/utils";

interface ProgressBarProps {
  progress: number; // 0-100
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  color?: "teal" | "blue" | "green" | "orange";
  className?: string;
}

const sizeClasses = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

const colorClasses = {
  teal: "bg-brand-accent",
  blue: "bg-brand-accent-blue",
  green: "bg-status-success",
  orange: "bg-status-warning",
};

export function ProgressBar({
  progress,
  size = "md",
  showLabel = false,
  color = "teal",
  className,
}: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    // Reset to 0 first, then animate to target
    setAnimatedProgress(0);
    const timer = setTimeout(() => {
      setAnimatedProgress(clampedProgress);
    }, 50);

    return () => clearTimeout(timer);
  }, [clampedProgress]);

  return (
    <div className={classNames("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-label text-text-secondary">Progress</span>
          <span className="text-label text-text-primary font-medium">
            {clampedProgress}%
          </span>
        </div>
      )}
      <div
        className={classNames(
          "w-full rounded-full bg-white/10 overflow-hidden",
          sizeClasses[size]
        )}
      >
        <div
          className={classNames(
            "h-full rounded-full transition-all duration-500 ease-out",
            colorClasses[color]
          )}
          style={{ width: `${animatedProgress}%` }}
        />
      </div>
    </div>
  );
}
