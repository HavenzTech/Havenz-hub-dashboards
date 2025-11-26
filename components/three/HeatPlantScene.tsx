"use client";

import dynamic from "next/dynamic";
import { classNames } from "@/lib/utils";

// Dynamically import 3D components to avoid SSR issues
const Scene = dynamic(
  () => import("./Scene").then((mod) => mod.Scene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full rounded-xl bg-brand-card flex items-center justify-center">
        <div className="text-text-muted text-body">Loading 3D Scene...</div>
      </div>
    ),
  }
);

const HeatPlantModel = dynamic(
  () => import("./HeatPlantModel").then((mod) => mod.HeatPlantModel),
  { ssr: false }
);

interface HeatPlantSceneProps {
  className?: string;
  autoRotate?: boolean;
  scale?: number;
}

export function HeatPlantScene({
  className,
  autoRotate = true,
  scale = 0.8,
}: HeatPlantSceneProps) {
  return (
    <div className={classNames("w-full h-full", className)}>
      <Scene autoRotate={autoRotate}>
        <HeatPlantModel scale={scale} />
      </Scene>
    </div>
  );
}
