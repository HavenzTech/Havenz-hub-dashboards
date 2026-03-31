"use client";

import { TemplateShell } from "./TemplateShell";
import { BlurFade } from "@/components/ui/BlurFade";
import type { TemplateProps } from "@/types/facility";
import {
  Camera,
  Wrench,
  Calendar,
  User,
  Wind,
  Box,
  AlertTriangle,
} from "lucide-react";
import {
  engineRoomVisualData,
  ENGINE_STATUS_CONFIG,
  MAINTENANCE_STATUS_CONFIG,
  HEAT_ZONE_COLORS,
  type MockCamera,
  type MockMaintenanceEntry,
  type MockHeatZone,
  type EngineStatus,
} from "@/lib/facility/mock-data";

/**
 * SCREEN 2 — ENGINE ROOM (Visual Monitoring)
 *
 * Layout (portrait, no scroll):
 * 1. Camera Grid (2x2) — ~35%
 * 2. 3D Facility Layout — ~35% (2D schematic until GLB model is available)
 * 3. Maintenance Panel — ~25%
 */
export function EngineRoomVisual({ screenId }: TemplateProps) {
  const { cameras, maintenance, heatZones, airflows, enginePositions } = engineRoomVisualData;

  return (
    <TemplateShell template="engine-room-visual" screenId={screenId}>
      <div className="h-full flex flex-col gap-5 p-8">
        {/* CAMERA GRID — ~35% */}
        <section className="flex-[3.5] min-h-0 flex flex-col">
          <BlurFade delay={0} duration={600}>
            <SectionLabel>Live Camera Feeds</SectionLabel>
          </BlurFade>
          <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4">
            {cameras.map((camera, i) => (
              <BlurFade key={camera.id} delay={100 + i * 120} duration={500}>
                <CameraCard camera={camera} />
              </BlurFade>
            ))}
          </div>
        </section>

        {/* 3D FACILITY MODEL / 2D LAYOUT — ~35% */}
        <section className="flex-[3.5] min-h-0 flex flex-col">
          <BlurFade delay={600} duration={600}>
            <SectionLabel>Facility Layout</SectionLabel>
          </BlurFade>
          <BlurFade delay={700} duration={600} className="flex-1">
            <FacilityLayout
              heatZones={heatZones}
              enginePositions={enginePositions}
              airflows={airflows}
            />
          </BlurFade>
        </section>

        {/* MAINTENANCE PANEL — ~25% */}
        <section className="flex-[2.5] min-h-0 flex flex-col">
          <BlurFade delay={1000} duration={600}>
            <SectionLabel>Maintenance Schedule</SectionLabel>
          </BlurFade>
          <div className="flex-1 flex flex-col gap-3">
            {maintenance.map((entry, i) => (
              <BlurFade key={entry.engineId} delay={1100 + i * 150} duration={500}>
                <MaintenanceCard entry={entry} />
              </BlurFade>
            ))}
          </div>
        </section>
      </div>
    </TemplateShell>
  );
}

// ============================================
// Sub-components
// ============================================

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent-primary/70 mb-4">
      {children}
    </h2>
  );
}

function CameraCard({ camera }: { camera: MockCamera }) {
  return (
    <div
      className="h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent overflow-hidden flex flex-col"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}
    >
      <div className="flex-1 bg-gradient-to-br from-bg-secondary to-black/60 flex items-center justify-center relative">
        <div className="text-center">
          <div
            className="w-14 h-14 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto mb-2"
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}
          >
            <Camera className="w-6 h-6 text-text-muted/40" />
          </div>
          <p className="text-text-muted text-sm">Feed not connected</p>
        </div>
        {/* Status badge */}
        <div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
          <div
            className={`w-2 h-2 rounded-full ${camera.status === "online" ? "bg-green-500" : "bg-red-500"}`}
            style={{
              boxShadow: camera.status === "online" ? "0 0 6px rgba(34, 197, 94, 0.5)" : "0 0 6px rgba(239, 68, 68, 0.5)",
            }}
          />
          <span className="text-xs text-text-secondary uppercase font-medium">{camera.status}</span>
        </div>
        {/* Camera name overlay */}
        <div className="absolute bottom-2 left-3 px-2 py-1 rounded bg-black/50 backdrop-blur-sm">
          <span className="text-xs text-text-secondary font-medium">{camera.name}</span>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 2D Facility Layout (placeholder for 3D model)
// ============================================

function FacilityLayout({
  heatZones,
  enginePositions,
  airflows,
}: {
  heatZones: MockHeatZone[];
  enginePositions: { id: string; name: string; status: EngineStatus; x: number; y: number }[];
  airflows: { id: string; from: string; to: string; direction: string; strength: string }[];
}) {
  return (
    <div
      className="h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent relative overflow-hidden"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}
    >
      {/* Grid lines for floor plan feel */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Title overlay */}
      <div className="absolute top-4 left-5 flex items-center gap-2 z-10">
        <Box className="w-4 h-4 text-accent-primary/60" />
        <span className="text-xs text-text-muted font-mono uppercase tracking-wider">Engine Hall — Top Down View</span>
      </div>

      {/* GLB model drop-in notice */}
      <div className="absolute top-4 right-5 z-10 px-3 py-1.5 rounded-full bg-accent-secondary/10 border border-accent-secondary/20">
        <span className="text-[10px] text-accent-secondary font-medium">2D LAYOUT • 3D MODEL PENDING</span>
      </div>

      {/* Heat zones */}
      {heatZones.map((zone) => (
        <div
          key={zone.id}
          className="absolute rounded-lg border border-white/5 flex items-center justify-center transition-all"
          style={{
            left: `${zone.x}%`,
            top: `${zone.y}%`,
            width: `${zone.width}%`,
            height: `${zone.height}%`,
            backgroundColor: HEAT_ZONE_COLORS[zone.status],
            boxShadow: zone.status === "hot" ? "inset 0 0 20px rgba(239, 68, 68, 0.1)" : "none",
          }}
        >
          <div className="text-center">
            <p className="text-xs text-text-muted font-medium">{zone.name}</p>
            <p className={`text-lg font-bold font-mono ${
              zone.status === "hot" ? "text-red-400" : zone.status === "warm" ? "text-yellow-400" : "text-green-400"
            }`}>
              {zone.temperature}°C
            </p>
          </div>
        </div>
      ))}

      {/* Engine position markers */}
      {enginePositions.map((engine) => {
        const config = ENGINE_STATUS_CONFIG[engine.status];
        return (
          <div
            key={engine.id}
            className="absolute z-10 flex flex-col items-center"
            style={{ left: `${engine.x}%`, top: `${engine.y}%`, transform: "translate(-50%, -50%)" }}
          >
            <div
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${config.bgColor}`}
              style={{
                boxShadow: engine.status === "running"
                  ? "0 0 16px rgba(34, 197, 94, 0.3)"
                  : engine.status === "fault"
                    ? "0 0 16px rgba(239, 68, 68, 0.3)"
                    : "none",
              }}
            >
              <div
                className={`w-4 h-4 rounded-full ${config.dotColor}`}
                style={{
                  animation: engine.status === "running" ? "pulse 2s ease-in-out infinite" : "none",
                  boxShadow: engine.status === "running" ? "0 0 8px rgba(34, 197, 94, 0.6)" : "none",
                }}
              />
            </div>
            <span className="mt-1 text-xs font-bold text-text-primary">{engine.name}</span>
            <span className={`text-[10px] font-bold ${config.color}`}>{config.label}</span>
          </div>
        );
      })}

      {/* Airflow indicators */}
      {airflows.map((af) => {
        const arrows: Record<string, string> = { up: "↑", down: "↓", left: "←", right: "→" };
        const positions: Record<string, { left: string; top: string }> = {
          "af-1": { left: "5%", top: "30%" },
          "af-2": { left: "30%", top: "50%" },
          "af-3": { left: "50%", top: "68%" },
        };
        const pos = positions[af.id] || { left: "50%", top: "50%" };

        return (
          <div
            key={af.id}
            className="absolute z-10 flex items-center gap-1"
            style={{ left: pos.left, top: pos.top }}
          >
            <Wind className="w-3 h-3 text-accent-secondary/40" />
            <span className="text-accent-secondary/50 text-sm font-mono">{arrows[af.direction] || "→"}</span>
            <span className="text-[9px] text-text-muted">{af.from} → {af.to}</span>
          </div>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-4 left-5 flex items-center gap-4 z-10">
        <LegendItem color="bg-green-500/30" label="Normal" />
        <LegendItem color="bg-yellow-500/30" label="Warm" />
        <LegendItem color="bg-red-500/30" label="Hot" />
        <div className="flex items-center gap-1 ml-2">
          <Wind className="w-3 h-3 text-accent-secondary/40" />
          <span className="text-[10px] text-text-muted">Airflow</span>
        </div>
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-3 h-3 rounded-sm ${color}`} />
      <span className="text-[10px] text-text-muted">{label}</span>
    </div>
  );
}

// ============================================
// Maintenance Card
// ============================================

function MaintenanceCard({ entry }: { entry: MockMaintenanceEntry }) {
  const config = MAINTENANCE_STATUS_CONFIG[entry.status];

  return (
    <div
      className={`flex-1 rounded-xl border px-6 py-5 flex items-center gap-6 ${config.bgColor}`}
      style={{
        boxShadow: entry.status === "overdue"
          ? "0 0 15px rgba(239, 68, 68, 0.08)"
          : entry.status === "due-soon"
            ? "0 0 12px rgba(245, 158, 11, 0.05)"
            : "inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      {/* Engine name + status */}
      <div className="flex-shrink-0 w-28">
        <p className="text-lg font-bold text-text-primary">{entry.engineName}</p>
        <span className={`text-xs font-bold ${config.color}`}>{config.label}</span>
      </div>

      {/* Schedule */}
      <div className="flex-1 grid grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-text-muted/50 flex-shrink-0" />
          <div>
            <p className="text-[10px] text-text-muted uppercase">Last Service</p>
            <p className="text-sm text-text-secondary font-mono">{formatDate(entry.lastService)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4 text-text-muted/50 flex-shrink-0" />
          <div>
            <p className="text-[10px] text-text-muted uppercase">Next Service</p>
            <p className={`text-sm font-mono font-semibold ${entry.status === "due-soon" ? "text-yellow-400" : entry.status === "overdue" ? "text-red-400" : "text-text-secondary"}`}>
              {formatDate(entry.nextService)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-text-muted/50 flex-shrink-0" />
          <div>
            <p className="text-[10px] text-text-muted uppercase">Technician</p>
            <p className="text-sm text-text-secondary">{entry.assignedTechnician}</p>
          </div>
        </div>
      </div>

      {/* Notes */}
      {entry.notes && (
        <div className="flex-shrink-0 max-w-48">
          <p className="text-xs text-text-muted italic">{entry.notes}</p>
        </div>
      )}
    </div>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
