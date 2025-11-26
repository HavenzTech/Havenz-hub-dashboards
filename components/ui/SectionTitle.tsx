import { classNames } from "@/lib/utils";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function SectionTitle({
  children,
  className,
  subtitle,
  action,
}: SectionTitleProps) {
  return (
    <div className={classNames("flex flex-col items-center mb-6", className)}>
      <div className="text-center">
        <h2 className="text-heading font-semibold text-text-primary">
          {children}
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
