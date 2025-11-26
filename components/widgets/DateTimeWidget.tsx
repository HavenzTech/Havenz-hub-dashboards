"use client";

import { useCurrentTime } from "@/hooks/useCurrentTime";
import { classNames } from "@/lib/utils";

interface DateTimeWidgetProps {
  className?: string;
  showDate?: boolean;
  showTime?: boolean;
}

export function DateTimeWidget({
  className,
  showDate = true,
  showTime = true,
}: DateTimeWidgetProps) {
  const { formattedDate, formattedTime } = useCurrentTime();

  return (
    <div className={classNames("flex items-start gap-10", className)}>
      {showDate && (
        <div className="flex flex-col">
          <span className="text-xs font-medium tracking-widest text-text-muted uppercase mb-1">
            Current Day
          </span>
          <span className="text-2xl font-bold text-brand-accent tracking-wide">
            {formattedDate}
          </span>
        </div>
      )}
      {showTime && (
        <div className="flex flex-col">
          <span className="text-xs font-medium tracking-widest text-text-muted uppercase mb-1">
            Current Time
          </span>
          <span className="text-2xl font-bold text-brand-accent font-mono tracking-wide">
            {formattedTime}
          </span>
        </div>
      )}
    </div>
  );
}
