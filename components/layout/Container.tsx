import { classNames } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={classNames(
        "h-screen w-full overflow-hidden",
        "flex flex-col",
        "px-8 py-6",
        className
      )}
    >
      {children}
    </div>
  );
}
