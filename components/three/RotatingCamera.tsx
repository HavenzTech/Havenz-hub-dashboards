"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

interface RotatingCameraProps {
  speed?: number;
  radius?: number;
  height?: number;
  target?: [number, number, number];
}

export function RotatingCamera({
  speed = 0.1,
  radius = 15,
  height = 10,
  target = [0, 0, 0],
}: RotatingCameraProps) {
  const { camera } = useThree();
  const targetVec = useRef(new Vector3(...target));

  useFrame((state) => {
    const time = state.clock.elapsedTime * speed;

    // Circular motion around the scene
    camera.position.x = Math.sin(time) * radius;
    camera.position.z = Math.cos(time) * radius;
    camera.position.y = height + Math.sin(time * 0.5) * 2;

    // Always look at the target
    camera.lookAt(targetVec.current);
  });

  return null;
}
