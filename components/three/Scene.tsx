"use client";

import { Suspense, Component, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SCENE_CONFIG } from "@/lib/constants";
import { classNames } from "@/lib/utils";

interface SceneProps {
  children: React.ReactNode;
  className?: string;
  autoRotate?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00d4aa" wireframe />
    </mesh>
  );
}

function ErrorFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-brand-card rounded-xl">
      <div className="text-center">
        <p className="text-text-muted text-body mb-2">3D Scene failed to load</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-brand-accent text-white rounded-lg text-sm hover:bg-brand-accent/80 transition-colors"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}

export function Scene({
  children,
  className,
  autoRotate = true,
  enableZoom = false,
  enablePan = false,
}: SceneProps) {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <div className={classNames("w-full h-full rounded-xl overflow-hidden", className)}>
        <Canvas
          camera={{
            position: SCENE_CONFIG.cameraPosition,
            fov: 50,
            near: 0.1,
            far: 1000,
          }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "default",
            failIfMajorPerformanceCaveat: false,
          }}
          style={{ background: "transparent" }}
          dpr={[1, 2]}
          onCreated={({ gl }) => {
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          }}
        >
          {/* Lighting */}
          <ambientLight intensity={SCENE_CONFIG.ambientLightIntensity} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={SCENE_CONFIG.directionalLightIntensity}
          />
          <pointLight position={[-10, -10, -5]} intensity={0.3} color="#00d4aa" />

          {/* Controls */}
          <OrbitControls
            autoRotate={autoRotate}
            autoRotateSpeed={SCENE_CONFIG.autoRotateSpeed}
            enableZoom={enableZoom}
            enablePan={enablePan}
            enableRotate={!autoRotate}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />

          {/* Content */}
          <Suspense fallback={<LoadingFallback />}>
            {children}
          </Suspense>
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}
