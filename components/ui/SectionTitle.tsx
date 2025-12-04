"use client";

import { classNames } from "@/lib/utils";
import { BlurText } from "@/components/ui/BlurText";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  subtitle?: string;
  action?: React.ReactNode;
  animated?: boolean;
  delay?: number;
}

export function SectionTitle({
  children,
  className,
  subtitle,
  action,
  animated = false,
  delay = 0,
}: SectionTitleProps) {
  return (
    <div className={classNames("flex flex-col items-center mb-6", className)}>
      <div className="text-center">
        <h2 className="text-heading font-semibold text-text-primary">
          {animated && typeof children === "string" ? (
            <BlurText text={children} delay={delay} duration={800} />
          ) : (
            children
          )}
        </h2>
        {subtitle && (
          <p className="text-body text-text-secondary mt-1">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div className="flex-shrink-0 mt-2">
          {action}
        </div>
      )}
    </div>
  );
}
