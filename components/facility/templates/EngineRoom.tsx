"use client";

import { TemplateShell } from "./TemplateShell";
import { BlurFade } from "@/components/ui/BlurFade";
import type { TemplateProps } from "@/types/facility";
import {
  Activity,
  Thermometer,
  Droplets,
  Vibrate,
  Clock,
  Gauge,
  Fuel,
  TrendingUp,
  Flame,
  Camera,
  AlertTriangle,
  Info,
  CircleAlert,
  CircleDot,
} from "lucide-react";
import {
  engineRoomData,
  ENGINE_STATUS_CONFIG,
  ALERT_SEVERITY_CONFIG,
  type MockEngine,
  type MockCamera,
  type MockPredictiveAlert,
} from "@/lib/facility/mock-data";

/**
 * SCREEN 1 — ENGINE ROOM (Mechanical Health)
 *
 * Full viewport, no scrolling. Designed for 2160x3840 portrait display.
 * Matches the app's futuristic dark UI with glow effects and animations.
 */
export function EngineRoom({ screenId }: TemplateProps) {
  const { engines, cameras, predictiveAlerts } = engineRoomData;

  return (
    <TemplateShell template="engine-room" screenId={screenId}>
      <div className="h-full flex flex-col gap-3 p-5">
        {/* ENGINE STATUS */}
        <section className="flex-shrink-0">
          <BlurFade delay={0} duration={600}>
            <SectionLabel>Engine Status</SectionLabel>
            <div className="grid grid-cols-2 gap-4">
              {engines.map((engine, i) => (
                <BlurFade key={engine.id} delay={100 + i * 150} duration={500}>
                  <EngineStatusCard engine={engine} />
                </BlurFade>
              ))}
            </div>
          </BlurFade>
        </section>

        {/* PERFORMANCE METRICS */}
        <section className="flex-[3] min-h-0 flex flex-col">
          <BlurFade delay={300} duration={600}>
            <SectionLabel>Performance Metrics</SectionLabel>
          </BlurFade>
          <div className="flex-1 flex flex-col gap-3">
            {engines.map((engine, ei) => (
              <div key={engine.id} className="flex-1 flex flex-col">
                <BlurFade delay={400 + ei * 100} duration={500}>
                  <p className="text-sm text-text-secondary mb-2 font-semibold tracking-wide flex items-center gap-2">
                    <CircleDot className={`w-4 h-4 ${engine.status === "running" ? "text-green-400" : "text-text-muted"}`} />
                    {engine.name}
                  </p>
                </BlurFade>
                <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-4">
                  {getMetrics(engine).map((m, i) => (
                    <BlurFade key={m.label} delay={500 + ei * 200 + i * 80} duration={400}>
                      <MetricCard {...m} />
                    </BlurFade>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FUEL & EFFICIENCY */}
        <section className="flex-shrink-0">
          <BlurFade delay={800} duration={600}>
            <SectionLabel>Fuel & Efficiency</SectionLabel>
            {engines.filter((e) => e.status === "running").length > 0 ? (
              engines
                .filter((e) => e.status === "running")
                .map((engine) => (
                  <div key={engine.id} className="grid grid-cols-3 gap-4">
                    <FuelCard icon={<Fuel className="w-5 h-5 text-accent-secondary" />} label="Fuel Consumption" value={engine.fuel.consumption.toFixed(1)} unit="m³/hr" />
                    <FuelCard icon={<TrendingUp className="w-5 h-5 text-accent-primary" />} label="Efficiency" value={engine.fuel.efficiency.toFixed(1)} unit="%" accent />
                    <FuelCard icon={<Flame className="w-5 h-5 text-orange-400" />} label="Heat Recovery" value={engine.fuel.heatRecovery.toString()} unit="%" />
                  </div>
                ))
            ) : (
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center">
                <p className="text-text-muted text-lg">No engines currently running</p>
              </div>
            )}
          </BlurFade>
        </section>

        {/* CAMERAS */}
        <section className="flex-[1.5] min-h-0 flex flex-col">
          <BlurFade delay={1000} duration={600}>
            <SectionLabel>Live Cameras</SectionLabel>
          </BlurFade>
          <div className="flex-1 grid grid-cols-2 gap-4">
            {cameras.map((camera, i) => (
              <BlurFade key={camera.id} delay={1100 + i * 150} duration={500}>
                <CameraCard camera={camera} />
              </BlurFade>
            ))}
          </div>
        </section>

        {/* AI PREDICTIVE ALERTS */}
        <section className="flex-shrink-0">
          <BlurFade delay={1300} duration={600}>
            <SectionLabel>AI Predictive Alerts</SectionLabel>
          </BlurFade>
          <div className="grid grid-cols-3 gap-3">
            {predictiveAlerts.map((alert, i) => (
              <BlurFade key={alert.id} delay={1400 + i * 120} duration={400}>
                <AlertRow alert={alert} />
              </BlurFade>
            ))}
          </div>
        </section>
      </div>
    </TemplateShell>
  );
}

// ============================================
// Helpers
// ============================================

interface MetricDef {
  label: string;
  value: number | string;
  unit: string;
  status: MetricStatus;
  icon: React.ReactNode;
}

function getMetrics(engine: MockEngine): MetricDef[] {
  const running = engine.status === "running";
  return [
    {
      label: "RPM",
      value: engine.metrics.rpm,
      unit: "",
      status: running ? "normal" : "inactive",
      icon: <Activity className="w-5 h-5" />,
    },
    {
      label: "Engine Temp",
      value: engine.metrics.temperature,
      unit: "°C",
      status: engine.metrics.temperature > 95 ? "warning" : running ? "normal" : "inactive",
      icon: <Thermometer className="w-5 h-5" />,
    },
    {
      label: "Oil Pressure",
      value: engine.metrics.oilPressure,
      unit: "PSI",
      status: engine.metrics.oilPressure < 30 && running ? "warning" : running ? "normal" : "inactive",
      icon: <Droplets className="w-5 h-5" />,
    },
    {
      label: "Vibration",
      value: engine.metrics.vibration,
      unit: "mm/s",
      status: engine.metrics.vibration > 0.15 ? "warning" : running ? "normal" : "inactive",
      icon: <Vibrate className="w-5 h-5" />,
    },
    {
      label: "Runtime",
      value: engine.metrics.runtimeHours.toLocaleString(),
      unit: "hrs",
      status: "normal",
      icon: <Clock className="w-5 h-5" />,
    },
    {
      label: "Load Factor",
      value: engine.metrics.loadFactor,
      unit: "%",
      status: engine.metrics.loadFactor > 95 ? "warning" : running ? "normal" : "inactive",
      icon: <Gauge className="w-5 h-5" />,
    },
  ];
}

// ============================================
// Sub-components
// ============================================

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent-primary/70 mb-2">
      {children}
    </h2>
  );
}

function EngineStatusCard({ engine }: { engine: MockEngine }) {
  const config = ENGINE_STATUS_CONFIG[engine.status];
  const isRunning = engine.status === "running";
  const isFault = engine.status === "fault";

  return (
    <div
      className={`relative rounded-2xl border-2 p-4 backdrop-blur-sm transition-all ${config.bgColor}`}
      style={{
        boxShadow: isRunning
          ? "0 0 20px rgba(34, 197, 94, 0.1), inset 0 1px 0 rgba(255,255,255,0.05)"
          : isFault
            ? "0 0 20px rgba(239, 68, 68, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)"
            : "inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xl font-bold text-text-primary">{engine.name}</span>
        <div className="flex items-center gap-3">
          <div
            className={`w-4 h-4 rounded-full ${config.dotColor}`}
            style={{
              boxShadow: isRunning ? "0 0 8px rgba(34, 197, 94, 0.6)" : isFault ? "0 0 8px rgba(239, 68, 68, 0.6)" : "none",
              animation: isRunning ? "pulse 2s ease-in-out infinite" : "none",
            }}
          />
          <span className={`text-lg font-black tracking-wide ${config.color}`}>{config.label}</span>
        </div>
      </div>
      {isRunning && (
        <div className="flex gap-6 text-base text-text-secondary">
          <span className="font-mono">{engine.metrics.rpm} <span className="text-sm text-text-muted">RPM</span></span>
          <span className="font-mono">{engine.metrics.loadFactor}% <span className="text-sm text-text-muted">Load</span></span>
          <span className="font-mono">{engine.metrics.temperature}°C</span>
        </div>
      )}
      {engine.status === "standby" && (
        <p className="text-lg text-text-muted">Ready to start</p>
      )}
    </div>
  );
}

type MetricStatus = "normal" | "warning" | "critical" | "inactive";

function MetricCard({
  label,
  value,
  unit,
  status = "normal",
  icon,
}: MetricDef) {
  const valueColors: Record<MetricStatus, string> = {
    normal: "text-text-primary",
    warning: "text-yellow-400",
    critical: "text-red-400",
    inactive: "text-text-muted/40",
  };

  const iconColors: Record<MetricStatus, string> = {
    normal: "text-accent-primary/60",
    warning: "text-yellow-400/60",
    critical: "text-red-400/60",
    inactive: "text-text-muted/20",
  };

  const borderGlow: Record<MetricStatus, string> = {
    normal: "border-white/10 hover:border-accent-primary/30",
    warning: "border-yellow-500/30",
    critical: "border-red-500/40",
    inactive: "border-white/5",
  };

  return (
    <div
      className={`h-full rounded-xl border bg-gradient-to-b from-white/[0.04] to-transparent p-3 flex flex-col justify-center transition-colors ${borderGlow[status]}`}
      style={{
        boxShadow: status === "warning"
          ? "0 0 15px rgba(245, 158, 11, 0.05)"
          : status === "critical"
            ? "0 0 15px rgba(239, 68, 68, 0.08)"
            : "inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={iconColors[status]}>{icon}</span>
        <p className="text-xs text-text-muted font-medium">{label}</p>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className={`text-2xl font-bold font-mono leading-none ${valueColors[status]}`}>
          {value}
        </span>
        {unit && <span className="text-sm text-text-muted">{unit}</span>}
      </div>
    </div>
  );
}

function FuelCard({
  icon,
  label,
  value,
  unit,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  accent?: boolean;
}) {
  return (
    <div
      className="rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-4 flex flex-col justify-center"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}
    >
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <p className="text-xs text-text-muted font-medium">{label}</p>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className={`text-2xl font-bold font-mono leading-none ${accent ? "text-accent-primary" : "text-text-primary"}`}>
          {value}
        </span>
        <span className="text-sm text-text-muted">{unit}</span>
      </div>
    </div>
  );
}

function CameraCard({ camera }: { camera: MockCamera }) {
  return (
    <div
      className="h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent overflow-hidden flex flex-col"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}
    >
      {/* Camera feed placeholder */}
      <div className="flex-1 bg-gradient-to-br from-bg-secondary to-black/60 flex items-center justify-center relative">
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto mb-3"
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}
          >
            <Camera className="w-7 h-7 text-text-muted/40" />
          </div>
          <p className="text-text-muted text-base">Feed not connected</p>
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
      </div>
      {/* Label */}
      <div className="flex-shrink-0 px-4 py-2 border-t border-white/5 bg-white/[0.02]">
        <p className="text-base text-text-primary font-semibold">{camera.name}</p>
        <p className="text-xs text-text-muted">{camera.location}</p>
      </div>
    </div>
  );
}

function AlertRow({ alert }: { alert: MockPredictiveAlert }) {
  const config = ALERT_SEVERITY_CONFIG[alert.severity];
  const timeAgo = getTimeAgo(alert.timestamp);

  const AlertIcon = alert.severity === "critical" ? CircleAlert
    : alert.severity === "warning" ? AlertTriangle
    : Info;

  return (
    <div
      className={`rounded-xl border px-4 py-3 backdrop-blur-sm ${config.bgColor}`}
      style={{
        boxShadow: alert.severity === "critical"
          ? "0 0 15px rgba(239, 68, 68, 0.08)"
          : alert.severity === "warning"
            ? "0 0 12px rgba(245, 158, 11, 0.05)"
            : "none",
      }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <AlertIcon className={`w-4 h-4 flex-shrink-0 ${config.color}`} />
        <span className={`text-sm font-bold ${config.color}`}>{alert.type}</span>
        <span className="text-xs text-text-muted font-mono ml-auto">{alert.confidence}%</span>
      </div>
      <p className="text-xs text-text-secondary line-clamp-2 mb-1.5">{alert.message}</p>
      <span className="text-xs text-text-muted font-mono">{timeAgo}</span>
    </div>
  );
}

function getTimeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}
