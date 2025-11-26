"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";

interface HeatPlantModelProps {
  scale?: number;
}

// Simple geometric heat/power plant representation
export function HeatPlantModel({ scale = 1 }: HeatPlantModelProps) {
  const smokeRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);

  // Animate smoke particles
  useFrame((state) => {
    if (smokeRef.current) {
      smokeRef.current.position.y = 4 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      smokeRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Ground/Base Platform */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[12, 0.5, 8]} />
        <meshStandardMaterial color="#132743" metalness={0.3} roughness={0.8} />
      </mesh>

      {/* Main Building */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 3, 4]} />
        <meshStandardMaterial color="#0d1f35" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Main Building Windows (glowing) */}
      {[-1.5, 0, 1.5].map((x, i) => (
        <mesh key={i} position={[x, 1.5, 2.01]}>
          <planeGeometry args={[0.8, 1.5]} />
          <meshStandardMaterial color="#00d4aa" emissive="#00d4aa" emissiveIntensity={0.5} />
        </mesh>
      ))}

      {/* Cooling Tower 1 */}
      <mesh position={[-4, 2, 0]} castShadow>
        <cylinderGeometry args={[1, 1.5, 4, 16]} />
        <meshStandardMaterial color="#1a365d" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Cooling Tower 2 */}
      <mesh position={[4, 2, 0]} castShadow>
        <cylinderGeometry args={[1, 1.5, 4, 16]} />
        <meshStandardMaterial color="#1a365d" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Smokestack/Chimney */}
      <mesh position={[0, 4, -1]} castShadow>
        <cylinderGeometry args={[0.3, 0.4, 5, 8]} />
        <meshStandardMaterial color="#2d3748" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Red warning light on chimney */}
      <mesh position={[0, 6.6, -1]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1} />
      </mesh>

      {/* Smoke/Steam effect */}
      <mesh ref={smokeRef} position={[0, 4, -1]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial
          color="#94a3b8"
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Pipes connecting buildings */}
      <mesh position={[-2, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.15, 2, 8]} />
        <meshStandardMaterial color="#0ea5e9" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[2, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.15, 2, 8]} />
        <meshStandardMaterial color="#0ea5e9" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Heat indicator (glowing orb) */}
      <mesh position={[0, 0.5, 2.5]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Solar Panels (optional detail) */}
      <group position={[3, 3.1, 0]} rotation={[Math.PI / 6, 0, 0]}>
        <mesh>
          <boxGeometry args={[2, 0.1, 1.5]} />
          <meshStandardMaterial color="#1e3a5f" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </group>
  );
}
