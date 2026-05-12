"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { PowerPlantModel } from "./PowerPlantModel";

interface PowerPlantSceneProps {
  modelUrl?: string;
  className?: string;
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00d4aa" wireframe />
    </mesh>
  );
}

export function PowerPlantScene({
  modelUrl = "/power_plant_v2_optimized.glb",
  className,
}: PowerPlantSceneProps) {
  return (
    <div className={className ?? "w-full h-full"}>
      <Canvas
        shadows
        camera={{ position: [7, 5, 9], fov: 38, near: 0.1, far: 200 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <color attach="background" args={["#0a1220"]} />

        <ambientLight intensity={0.5} />
        <hemisphereLight args={["#cfe6ff", "#1a2030", 0.6]} />
        <directionalLight
          position={[8, 12, 6]}
          intensity={1.4}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-6, 4, -4]} intensity={0.6} color="#00d4aa" />

        <Suspense fallback={<Loader />}>
          <PowerPlantModel url={modelUrl} targetSize={6} />
          <Environment preset="city" />
        </Suspense>

        {/* Subtle ground to catch shadow and ground the model on a portrait kiosk */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.01, 0]}
          receiveShadow
        >
          <planeGeometry args={[40, 40]} />
          <shadowMaterial opacity={0.35} />
        </mesh>

        <OrbitControls
          target={[0, 1.5, 0]}
          enablePan={false}
          enableZoom
          minDistance={5}
          maxDistance={20}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.1}
          autoRotate
          autoRotateSpeed={1.0}
          makeDefault
        />
      </Canvas>
    </div>
  );
}
