import { classNames } from "@/lib/utils";
import { STATUS_COLORS, STATUS_LABELS } from "@/lib/constants";
import type { ProjectStatus } from "@/types";

interface StatusBadgeProps {
  status: ProjectStatus;
  size?: "xxs" | "xs" | "sm" | "md" | "lg";
  showDot?: boolean;
}

const sizeClasses = {
  xxs: "text-[8px] px-1 py-px",
  xs: "text-[10px] px-1.5 py-0.5",
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-3 py-1",
  lg: "text-base px-4 py-1.5",
};

const dotColors = {
  completed: "bg-status-success",
  "in-progress": "bg-status-warning",
  "on-hold": "bg-status-error",
  cancelled: "bg-status-error opacity-50",
};

export function StatusBadge({
  status,
  size = "md",
  showDot = true,
}: StatusBadgeProps) {
  return (
    <span
      className={classNames(
        "inline-flex items-center gap-2 rounded-full font-medium",
        "bg-white/5 border border-white/10",
        sizeClasses[size]
      )}
    >
      {showDot && (
        <span
          className={classNames(
            "w-2 h-2 rounded-full",
            dotColors[status]
          )}
        />
      )}
      <span className={STATUS_COLORS[status]}>
        {STATUS_LABELS[status]}
      </span>
    </span>
  );
}
