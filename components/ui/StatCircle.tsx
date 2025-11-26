"use client";

import { classNames } from "@/lib/utils";
import { useEffect, useState } from "react";

interface StatCircleProps {
  value: number | string;
  label: string;
  color?: "teal" | "green" | "blue" | "orange";
  size?: "sm" | "md" | "lg";
  prefix?: "+" | "-" | "";
  progress?: number; // 0-100, if provided shows progress ring
  animate?: boolean;
}

const sizeConfig = {
  sm: { size: 80, stroke: 4, fontSize: "text-xl", labelSize: "text-xs" },
  md: { size: 120, stroke: 6, fontSize: "text-3xl", labelSize: "text-sm" },
  lg: { size: 160, stroke: 8, fontSize: "text-4xl", labelSize: "text-base" },
};

const colorClasses = {
  teal: "stroke-brand-accent",
  green: "stroke-status-success",
  blue: "stroke-brand-accent-blue",
  orange: "stroke-status-warning",
};

const textColorClasses = {
  teal: "text-brand-accent",
  green: "text-status-success",
  blue: "text-brand-accent-blue",
  orange: "text-status-warning",
};

export function StatCircle({
  value,
  label,
  color = "teal",
  size = "md",
  prefix = "",
  progress = 100,
  animate = true,
}: StatCircleProps) {
  const [animatedProgress, setAnimatedProgress] = useState(animate ? 0 : progress);
  const config = sizeConfig[size];
  const radius = (config.size - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setAnimatedProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [animate, progress]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: config.size, height: config.size }}>
        {/* Background circle */}
        <svg
          className="absolute inset-0 -rotate-90"
          width={config.size}
          height={config.size}
        >
          <circle
            cx={config.size / 2}
            cy={config.size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={config.stroke}
          />
          {/* Progress circle */}
          <circle
            cx={config.size / 2}
            cy={config.size / 2}
            r={radius}
            fill="none"
            className={classNames(colorClasses[color], "transition-all duration-1000 ease-out")}
            strokeWidth={config.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        {/* Value in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={classNames(config.fontSize, "font-bold", textColorClasses[color])}>
            {prefix}{value}
          </span>
        </div>
      </div>
      <span className={classNames(config.labelSize, "text-text-secondary text-center")}>
        {label}
      </span>
    </div>
  );
}
