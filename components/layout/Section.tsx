import { classNames } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  height?: number; // Percentage of viewport height
  id?: string;
}

export function Section({ children, className, height, id }: SectionProps) {
  return (
    <section
      id={id}
      className={classNames("w-full", className)}
      style={height ? { height: `${height}vh` } : undefined}
    >
      {children}
    </section>
  );
}
