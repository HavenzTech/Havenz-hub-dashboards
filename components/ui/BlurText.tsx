"use client";

import { useEffect, useState } from "react";
import { classNames } from "@/lib/utils";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export function BlurText({
  text,
  className,
  delay = 0,
  duration = 1000,
}: BlurTextProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span
      className={classNames(
        "inline-block transition-all",
        isVisible ? "blur-0 opacity-100" : "blur-sm opacity-0",
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "ease-out",
      }}
    >
      {text}
    </span>
  );
}
