"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface StarProps {
  cx: number;
  cy: number;
  size: number;
  id: string;
}

// Four-pointed star path generator
function createStarPath(cx: number, cy: number, size: number): string {
  const outer = size;
  const inner = size * 0.3;

  return `
    M ${cx} ${cy - outer}
    Q ${cx + inner * 0.5} ${cy - inner * 0.5} ${cx + outer} ${cy}
    Q ${cx + inner * 0.5} ${cy + inner * 0.5} ${cx} ${cy + outer}
    Q ${cx - inner * 0.5} ${cy + inner * 0.5} ${cx - outer} ${cy}
    Q ${cx - inner * 0.5} ${cy - inner * 0.5} ${cx} ${cy - outer}
    Z
  `;
}

function TwinklingStar({ cx, cy, size, id }: StarProps) {
  const [opacity, setOpacity] = useState(1);
  const [duration, setDuration] = useState(0.8);

  useEffect(() => {
    // Random initial delay
    const initialDelay = Math.random() * 1000;

    const startTwinkling = () => {
      // Randomize duration for each cycle
      const newDuration = 0.4 + Math.random() * 0.8;
      setDuration(newDuration);

      // Toggle between dim and bright
      setOpacity((prev) => (prev === 1 ? 0.3 : 1));
    };

    const timeout = setTimeout(() => {
      startTwinkling();
      const interval = setInterval(startTwinkling, duration * 1000 + Math.random() * 500);
      return () => clearInterval(interval);
    }, initialDelay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.path
      id={id}
      d={createStarPath(cx, cy, size)}
      fill="black"
      animate={{ opacity }}
      transition={{
        duration: duration,
        ease: "easeInOut",
      }}
    />
  );
}

interface ZLogoSVGProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

export function ZLogoSVG({ size = 80, className = "", animated = true }: ZLogoSVGProps) {
  // Star positions relative to a 100x100 viewBox (centered at 50,50)
  const stars: Omit<StarProps, "id">[] = [
    // Top row
    { cx: 50, cy: 22, size: 10 },
    // Second row
    { cx: 30, cy: 35, size: 8 },
    { cx: 70, cy: 35, size: 10 },
    // Middle row
    { cx: 50, cy: 50, size: 12 },
    // Fourth row
    { cx: 30, cy: 65, size: 10 },
    { cx: 70, cy: 65, size: 8 },
    // Bottom row
    { cx: 50, cy: 78, size: 10 },
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cyan circle background */}
      <circle cx="50" cy="50" r="48" fill="#22d3ee" />

      {/* Stars */}
      {animated ? (
        stars.map((star, index) => (
          <TwinklingStar
            key={`star-${index}`}
            id={`star-${index}`}
            cx={star.cx}
            cy={star.cy}
            size={star.size}
          />
        ))
      ) : (
        stars.map((star, index) => (
          <path
            key={`star-${index}`}
            d={createStarPath(star.cx, star.cy, star.size)}
            fill="black"
          />
        ))
      )}
    </svg>
  );
}

export default ZLogoSVG;
