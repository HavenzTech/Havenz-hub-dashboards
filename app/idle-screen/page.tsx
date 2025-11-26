"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import DarkVeil from "@/components/DarkVeil";

export default function IdleScreenPage() {
  const logoRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 100, y: 100 });
  const velocityRef = useRef({ x: 1.5, y: 1.5 });
  const logoSize = { width: 200, height: 200 };

  useEffect(() => {
    let animationId: number;
    let lastTime = 0;

    const animate = (currentTime: number) => {
      if (lastTime === 0) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Speed factor based on delta time for consistent speed
      const speed = deltaTime * 0.07;

      let newX = positionRef.current.x + velocityRef.current.x * speed;
      let newY = positionRef.current.y + velocityRef.current.y * speed;

      // Bounce off right/left edges
      if (newX + logoSize.width >= window.innerWidth || newX <= 0) {
        velocityRef.current.x = -velocityRef.current.x;
        newX = Math.max(0, Math.min(newX, window.innerWidth - logoSize.width));
      }

      // Bounce off bottom/top edges
      if (newY + logoSize.height >= window.innerHeight || newY <= 0) {
        velocityRef.current.y = -velocityRef.current.y;
        newY = Math.max(
          0,
          Math.min(newY, window.innerHeight - logoSize.height)
        );
      }

      positionRef.current = { x: newX, y: newY };

      // Use transform for GPU-accelerated rendering
      if (logoRef.current) {
        logoRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden relative">
      <DarkVeil speed={1.2} hueShift={50} />

      {/* Bouncing Logo */}
      <div
        ref={logoRef}
        className="absolute z-10 will-change-transform"
        style={{
          left: 0,
          top: 0,
          width: logoSize.width,
          height: logoSize.height,
        }}
      >
        <Image
          src="/havenzhub.png"
          alt="Havenz Hub"
          width={logoSize.width}
          height={logoSize.height}
          className="object-contain"
        />
      </div>
    </div>
  );
}
