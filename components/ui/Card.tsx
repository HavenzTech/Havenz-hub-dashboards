import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "bordered" | "gradient";
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const variantClasses = {
  default: "bg-brand-card border border-white/10",
  bordered: "bg-brand-card border-gradient",
  gradient: "bg-gradient-to-br from-brand-card to-brand-section border border-white/10",
};

export function Card({
  children,
  className,
  variant = "default",
  padding = "md",
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl",
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
