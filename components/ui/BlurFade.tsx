"use client";

import { useEffect, useState } from "react";
import { classNames } from "@/lib/utils";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  blur?: string;
  yOffset?: number;
}

export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 500,
  blur = "blur-sm",
  yOffset = 8,
}: BlurFadeProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={classNames(
        "transition-all",
        isVisible ? `blur-0 opacity-100` : `${blur} opacity-0`,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "ease-out",
        transform: isVisible ? "translateY(0)" : `translateY(${yOffset}px)`,
      }}
    >
      {children}
    </div>
  );
}
