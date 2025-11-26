import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { classNames } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCardProps extends Project {
  className?: string;
}

export function ProjectCard({
  name,
  startDate,
  endDate,
  status,
  admin,
  resource,
  progress,
  hoursLogged,
  className,
}: ProjectCardProps) {
  return (
    <Card
      className={classNames("flex flex-col h-full min-h-[380px]", className)}
      padding="md"
    >
      {/* Status Badge */}
      <div className="mb-2">
        <StatusBadge status={status} size="xxs" />
      </div>

      {/* Project Name */}
      <h3 className="text-lg font-semibold text-text-primary mb-4">{name}</h3>

      {/* Dates */}
      <div className="flex items-center gap-4 mb-4 text-label text-text-muted">
        <span>{startDate}</span>
        <span className="text-brand-accent">→</span>
        <span>{endDate}</span>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <ProgressBar progress={progress} showLabel size="md" />
      </div>

      {/* Meta Info */}
      <div className="mt-auto pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
        <div>
          <span className="text-label text-text-muted block">Lead</span>
          <span className="text-body text-text-primary">{admin}</span>
        </div>
        <div>
          <span className="text-label text-text-muted block">Resource</span>
          <span className="text-body text-text-primary">{resource}</span>
        </div>
        <div className="col-span-2">
          <span className="text-label text-text-muted block">Hours Logged</span>
          <span className="text-body font-semibold text-brand-accent">
            {hoursLogged}
          </span>
        </div>
      </div>
    </Card>
  );
}
