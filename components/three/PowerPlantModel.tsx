"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Box3, Color, Mesh, MeshStandardMaterial, Object3D, Vector3 } from "three";
import sensorsData from "@/lib/data/power-plant-sensors.json";

type SensorHotspot = {
  name: string;
  // Position in the *original* GLB world space (pre-scale, pre-offset).
  position: [number, number, number];
};

type SensorReading = { label: string; value: string };

const SENSORS: SensorHotspot[] = sensorsData.sensors as SensorHotspot[];

// Node names matching any of these regexes are hidden after the GLB loads.
// Add more patterns here to hide other parts (e.g. /walls?/i, /ceiling/i).
const HIDE_NAME_PATTERNS: RegExp[] = [/roof/i];

const HOTSPOT_COLOR = "#00d4aa";
const HOTSPOT_ACTIVE_COLOR = "#fbbf24";
const HOTSPOT_VISUAL_RADIUS = 0.18; // post-scale, scene units

function placeholderReadings(name: string): SensorReading[] {
  const seed = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const temp = 60 + (seed % 40);
  const pressure = 1.2 + ((seed % 17) / 10);
  const flow = 100 + (seed % 250);
  return [
    { label: "Status", value: "Nominal" },
    { label: "Temperature", value: `${temp} °C` },
    { label: "Pressure", value: `${pressure.toFixed(2)} bar` },
    { label: "Flow", value: `${flow} L/min` },
  ];
}

function Hotspot({
  sensor,
  active,
  modelScale,
  onSelect,
}: {
  sensor: SensorHotspot;
  active: boolean;
  modelScale: number;
  onSelect: (name: string) => void;
}) {
  const meshRef = useRef<Mesh>(null);
  const haloRef = useRef<Mesh>(null);
  // Hotspots live inside the scaled model group, so counter-scale to render at a
  // consistent visual size regardless of how aggressively we shrunk the model.
  const localRadius = HOTSPOT_VISUAL_RADIUS / modelScale;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pulse = 1 + Math.sin(t * 3) * 0.12;
    if (meshRef.current) meshRef.current.scale.setScalar(active ? pulse * 1.3 : pulse);
    if (haloRef.current) {
      const haloPulse = 1.4 + Math.sin(t * 2) * 0.25;
      haloRef.current.scale.setScalar(haloPulse);
      const mat = haloRef.current.material as MeshStandardMaterial;
      mat.opacity = 0.25 + Math.sin(t * 2) * 0.1;
    }
  });

  const color = active ? HOTSPOT_ACTIVE_COLOR : HOTSPOT_COLOR;

  return (
    <group position={sensor.position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(sensor.name);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[localRadius, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.4}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={haloRef}>
        <sphereGeometry args={[localRadius * 1.6, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.3}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function SensorOverlay({
  sensor,
  onClose,
}: {
  sensor: SensorHotspot;
  onClose: () => void;
}) {
  const readings = placeholderReadings(sensor.name);
  return (
    <Html
      position={sensor.position}
      zIndexRange={[100, 0]}
      style={{ pointerEvents: "auto" }}
    >
      <div
        className="relative -translate-x-1/2 -translate-y-[calc(100%+20px)] min-w-[180px] rounded-lg border border-[#00d4aa]/40 bg-black/85 backdrop-blur-md px-3 py-2.5 text-white shadow-xl"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <div className="text-[9px] uppercase tracking-widest text-[#00d4aa] leading-none">Sensor</div>
            <div className="text-[13px] font-semibold leading-tight mt-1">{sensor.name}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/50 hover:text-white text-base leading-none -mt-0.5"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <dl className="grid grid-cols-2 gap-x-2.5 gap-y-1 text-[11px]">
          {readings.map((r) => (
            <div key={r.label} className="contents">
              <dt className="text-white/60">{r.label}</dt>
              <dd className="text-right font-mono text-white">{r.value}</dd>
            </div>
          ))}
        </dl>
        <div className="absolute left-1/2 top-full -translate-x-1/2 h-2.5 w-px bg-[#00d4aa]/60" />
      </div>
    </Html>
  );
}

// Build a bounding box anchored on a known-good point inside the model. We
// derive a plant-scale hint from the in-plane (X/Y) percentile ranges — those
// axes are reliable because outliers in CAD exports tend to be along one axis
// (here, Z) — then use that scale as a per-axis tolerance to reject meshes
// whose centers OR extents fall outside the plant region.
function plantBboxFromAnchor(root: Object3D, anchor: Vector3): Box3 {
  type Item = { mesh: Mesh; center: Vector3 };
  const items: Item[] = [];
  root.updateMatrixWorld(true);
  root.traverse((node) => {
    const mesh = node as Mesh;
    if (mesh.isMesh && mesh.geometry) {
      if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
      const c = new Vector3();
      mesh.geometry.boundingBox!.getCenter(c).applyMatrix4(mesh.matrixWorld);
      items.push({ mesh, center: c });
    }
  });

  if (items.length === 0) {
    const fallback = new Box3();
    fallback.setFromObject(root);
    return fallback;
  }

  const pct = (arr: number[], p: number) => {
    const s = arr.slice().sort((a, b) => a - b);
    return s[Math.min(s.length - 1, Math.floor(s.length * p))];
  };

  // Robust per-axis ranges from mesh centers (5th–95th percentile drops outliers).
  const xs = items.map((i) => i.center.x);
  const ys = items.map((i) => i.center.y);
  const xRange = pct(xs, 0.95) - pct(xs, 0.05);
  const yRange = pct(ys, 0.95) - pct(ys, 0.05);

  // Use the in-plane (X/Y) extent as the plant scale. Pick the larger so we
  // don't underestimate if one axis happens to be the "long" one.
  const planeSize = Math.max(xRange, yRange, 1);

  // Per-axis tolerance around the anchor. Plants are typically X×Y×~X in size,
  // so use planeSize for X and Z, and a generous Y allowance.
  const tolXZ = planeSize * 1.5 + 200;
  const tolY = planeSize * 1.5 + 200;

  const box = new Box3();
  for (const { mesh, center } of items) {
    if (Math.abs(center.x - anchor.x) > tolXZ) continue;
    if (Math.abs(center.y - anchor.y) > tolY) continue;
    if (Math.abs(center.z - anchor.z) > tolXZ) continue;
    const mb = new Box3().setFromObject(mesh);
    if (mb.isEmpty()) continue;
    // Clamp mesh bbox per axis so a single sprawling mesh can't blow the result.
    mb.min.x = Math.max(mb.min.x, anchor.x - tolXZ);
    mb.max.x = Math.min(mb.max.x, anchor.x + tolXZ);
    mb.min.y = Math.max(mb.min.y, anchor.y - tolY);
    mb.max.y = Math.min(mb.max.y, anchor.y + tolY);
    mb.min.z = Math.max(mb.min.z, anchor.z - tolXZ);
    mb.max.z = Math.min(mb.max.z, anchor.z + tolXZ);
    if (
      mb.min.x > mb.max.x ||
      mb.min.y > mb.max.y ||
      mb.min.z > mb.max.z
    ) continue;
    box.union(mb);
  }
  if (box.isEmpty()) box.setFromObject(root);
  return box;
}

function sensorCentroid(): Vector3 {
  const c = new Vector3();
  for (const s of SENSORS) {
    c.x += s.position[0];
    c.y += s.position[1];
    c.z += s.position[2];
  }
  c.divideScalar(SENSORS.length || 1);
  return c;
}

interface PowerPlantModelProps {
  url: string;
  targetSize?: number; // largest-axis size after fit (scene units)
  debug?: boolean;
}

export function PowerPlantModel({
  url,
  targetSize = 6,
  debug = false,
}: PowerPlantModelProps) {
  const gltf = useGLTF(url);
  const [selected, setSelected] = useState<string | null>(null);

  // Compute uniform scale + center offset using a sensor-anchored bbox.
  const { fitScale, fitOffset, debugInfo } = useMemo(() => {
    const anchor = sensorCentroid();
    const box = plantBboxFromAnchor(gltf.scene, anchor);
    const size = new Vector3();
    const center = new Vector3();
    box.getSize(size);
    box.getCenter(center);
    const largest = Math.max(size.x, size.y, size.z) || 1;
    const scale = targetSize / largest;
    return {
      fitScale: scale,
      fitOffset: [-center.x, -box.min.y, -center.z] as [number, number, number],
      debugInfo: {
        anchor: anchor.toArray(),
        bboxMin: box.min.toArray(),
        bboxMax: box.max.toArray(),
        size: size.toArray(),
      },
    };
  }, [gltf.scene, targetSize]);

  // Replace pure-black PBR materials with a mid-grey so they're visible under our lights.
  // Also hide nodes whose names match HIDE_NAME_PATTERNS (e.g. the roof so we can see inside).
  useEffect(() => {
    gltf.scene.traverse((node) => {
      if (HIDE_NAME_PATTERNS.some((re) => re.test(node.name))) {
        node.visible = false;
      }
      const mesh = node as Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const fix = (m: MeshStandardMaterial) => {
          if (m.color && m.color.getHex() === 0x000000) m.color = new Color("#3a4a5c");
        };
        const mat = mesh.material as MeshStandardMaterial | MeshStandardMaterial[];
        if (Array.isArray(mat)) mat.forEach(fix);
        else if (mat) fix(mat);
      }
    });
  }, [gltf.scene]);

  // Translate sensor positions into the same local frame as the scaled model group.
  const sensors = useMemo<SensorHotspot[]>(
    () =>
      SENSORS.map((s) => ({
        name: s.name,
        position: [
          s.position[0] + fitOffset[0],
          s.position[1] + fitOffset[1],
          s.position[2] + fitOffset[2],
        ],
      })),
    [fitOffset],
  );

  // Dev visibility: log the fit so we can sanity-check from the browser console.
  useEffect(() => {
    console.info("[PowerPlantModel] fit", {
      scale: fitScale,
      offset: fitOffset,
      sensors: sensors.length,
      ...debugInfo,
    });

    // One-shot dump: per-mesh Y range + vertex count + transparency flag.
    // Helps spot "missing" meshes — they'll either be at extreme positions or
    // have transparent/invisible materials.
    type Bucket = {
      yMin: number;
      yMax: number;
      count: number;
      verts: number;
      transparent: number;
      opaque: number;
    };
    const yBuckets = new Map<string, Bucket>();
    let total = 0;
    let transparent = 0;
    let invisible = 0;
    gltf.scene.updateMatrixWorld(true);
    gltf.scene.traverse((node) => {
      const mesh = node as Mesh;
      if (!mesh.isMesh || !mesh.geometry) return;
      total++;
      const mat = mesh.material as
        | MeshStandardMaterial
        | MeshStandardMaterial[];
      const mats = Array.isArray(mat) ? mat : [mat];
      const isTransparent = mats.some((m) => m && (m.transparent || (m.opacity ?? 1) < 1));
      const isInvisible = !mesh.visible;
      if (isTransparent) transparent++;
      if (isInvisible) invisible++;
      if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
      const localMin = mesh.geometry.boundingBox!.min;
      const localMax = mesh.geometry.boundingBox!.max;
      const worldMin = new Vector3(localMin.x, localMin.y, localMin.z).applyMatrix4(mesh.matrixWorld);
      const worldMax = new Vector3(localMax.x, localMax.y, localMax.z).applyMatrix4(mesh.matrixWorld);
      const verts = mesh.geometry.attributes.position?.count ?? 0;
      // Bucket by 500-unit Y bands so the log is readable
      const bandY = Math.floor(Math.min(worldMin.y, worldMax.y) / 500) * 500;
      const key = `y${bandY}`;
      const b = yBuckets.get(key) ?? {
        yMin: Infinity,
        yMax: -Infinity,
        count: 0,
        verts: 0,
        transparent: 0,
        opaque: 0,
      };
      b.yMin = Math.min(b.yMin, worldMin.y, worldMax.y);
      b.yMax = Math.max(b.yMax, worldMin.y, worldMax.y);
      b.count++;
      b.verts += verts;
      if (isTransparent) b.transparent++; else b.opaque++;
      yBuckets.set(key, b);
    });
    const summary = [...yBuckets.entries()]
      .sort((a, b) => parseFloat(a[0].slice(1)) - parseFloat(b[0].slice(1)))
      .map(([k, b]) => ({ band: k, ...b }));
    console.info("[PowerPlantModel] mesh stats", {
      totalMeshes: total,
      transparentMeshes: transparent,
      invisibleMeshes: invisible,
      byYBand: summary,
    });
  }, [fitScale, fitOffset, sensors.length, debugInfo, gltf.scene]);

  return (
    <group scale={fitScale} position={[0, 0, 0]}>
      <group position={fitOffset}>
        <primitive object={gltf.scene} />
      </group>
      {debug && (
        <>
          {/* Axes at world origin, sized in original-model units so they're visible */}
          <axesHelper args={[1 / fitScale]} />
          {/* Wireframe box at the fitted bbox so we can see where the plant *should* be */}
          <mesh>
            <boxGeometry
              args={[
                Math.max(1, (debugInfo.size[0] as number)),
                Math.max(1, (debugInfo.size[1] as number)),
                Math.max(1, (debugInfo.size[2] as number)),
              ]}
            />
            <meshBasicMaterial color="#ff00ff" wireframe />
          </mesh>
        </>
      )}
      {sensors.map((sensor) => (
        <Hotspot
          key={sensor.name}
          sensor={sensor}
          active={selected === sensor.name}
          modelScale={fitScale}
          onSelect={(name) => setSelected((cur) => (cur === name ? null : name))}
        />
      ))}
      {selected && (
        <SensorOverlay
          sensor={sensors.find((s) => s.name === selected)!}
          onClose={() => setSelected(null)}
        />
      )}
    </group>
  );
}

useGLTF.preload("/power_plant_v2_optimized.glb");
