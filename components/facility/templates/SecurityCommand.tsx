"use client";

import { TemplateShell } from "./TemplateShell";
import { BlurFade } from "@/components/ui/BlurFade";
import type { TemplateProps } from "@/types/facility";
import {
  Camera,
  Shield,
  Eye,
  Car,
  User,
  AlertTriangle,
  Clock,
  Radio,
} from "lucide-react";
import {
  securityCommandData,
  ALERT_SEVERITY_CONFIG,
  type SecurityCamera,
  type AIDetection,
} from "@/lib/facility/mock-data";

const DETECTION_ICONS: Record<string, React.ReactNode> = {
  motion: <Radio className="w-5 h-5" />,
  vehicle: <Car className="w-5 h-5" />,
  person: <User className="w-5 h-5" />,
  "unusual-activity": <Eye className="w-5 h-5" />,
};

/**
 * SCREEN 11 — SECURITY COMMAND
 *
 * Layout:
 * 1. Status bar (~6%)
 * 2. Camera grid 4x2 (~55%)
 * 3. AI Detection Feed (~35%)
 */
export function SecurityCommand({ screenId }: TemplateProps) {
  const { cameras, detections } = securityCommandData;
  const onlineCount = cameras.filter(c => (c.status as string) !== "offline").length;
  const motionCount = cameras.filter(c => c.hasMotion).length;

  return (
    <TemplateShell template="security-command" screenId={screenId}>
      <div className="h-full flex flex-col gap-5 p-8">

        {/* STATUS BAR */}
        <BlurFade delay={0} duration={500}>
          <div className="flex items-center justify-between px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.02]"
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-accent-primary" />
              <span className="text-lg font-bold text-text-primary">Security Overview</span>
            </div>
            <div className="flex items-center gap-6">
              <StatusChip label="Cameras Online" value={`${onlineCount}/${cameras.length}`} color="text-green-400" />
              <StatusChip label="Motion Detected" value={motionCount.toString()} color={motionCount > 0 ? "text-yellow-400" : "text-text-muted"} />
              <StatusChip label="AI Detections" value={detections.length.toString()} color="text-accent-secondary" />
            </div>
          </div>
        </BlurFade>

        {/* CAMERA GRID */}
        <section className="flex-[5.5] min-h-0">
          <div className="h-full grid grid-cols-4 grid-rows-2 gap-3">
            {cameras.map((camera, i) => (
              <BlurFade key={camera.id} delay={100 + i * 80} duration={400}>
                <CameraFeed camera={camera} />
              </BlurFade>
            ))}
          </div>
        </section>

        {/* AI DETECTION FEED */}
        <section className="flex-[3.5] min-h-0 flex flex-col">
          <BlurFade delay={700} duration={500}>
            <div className="flex items-center gap-3 mb-3">
              <Eye className="w-4 h-4 text-accent-primary/60" />
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent-primary/70">AI Detection Feed</h2>
            </div>
          </BlurFade>
          <div className="flex-1 flex flex-col gap-2">
            {detections.map((det, i) => (
              <BlurFade key={det.id} delay={750 + i * 100} duration={400}>
                <DetectionRow detection={det} />
              </BlurFade>
            ))}
          </div>
        </section>
      </div>
    </TemplateShell>
  );
}

function StatusChip({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="text-center">
      <p className="text-[10px] text-text-muted uppercase tracking-wider">{label}</p>
      <p className={`text-xl font-bold font-mono ${color}`}>{value}</p>
    </div>
  );
}

function CameraFeed({ camera }: { camera: SecurityCamera }) {
  const isHighPriority = camera.priority === "high";

  return (
    <div
      className={`h-full rounded-xl border overflow-hidden flex flex-col ${
        camera.hasMotion ? "border-yellow-500/40" : isHighPriority ? "border-white/15" : "border-white/10"
      }`}
      style={{
        boxShadow: camera.hasMotion ? "0 0 15px rgba(245,158,11,0.08)" : "inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      <div className="flex-1 bg-gradient-to-br from-bg-secondary to-black/60 flex items-center justify-center relative">
        <Camera className="w-8 h-8 text-text-muted/20" />

        {/* Status badges */}
        <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
          <div
            className={`w-2 h-2 rounded-full ${(camera.status as string) === "offline" ? "bg-red-500" : "bg-green-500"}`}
            style={{ boxShadow: (camera.status as string) !== "offline" ? "0 0 4px rgba(34,197,94,0.5)" : "none" }}
          />
          <span className="text-[10px] text-text-secondary uppercase">{camera.status}</span>
        </div>

        {camera.hasMotion && (
          <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 animate-pulse">
            <Radio className="w-3 h-3 text-yellow-400" />
            <span className="text-[10px] text-yellow-400 font-bold">MOTION</span>
          </div>
        )}

        {isHighPriority && (
          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/50">
            <span className="text-[9px] text-accent-primary font-bold">PRIORITY</span>
          </div>
        )}
      </div>
      <div className="flex-shrink-0 px-3 py-2 bg-white/[0.02] border-t border-white/5">
        <p className="text-sm text-text-primary font-medium truncate">{camera.name}</p>
        <p className="text-[10px] text-text-muted truncate">{camera.location}</p>
      </div>
    </div>
  );
}

function DetectionRow({ detection }: { detection: AIDetection }) {
  const config = ALERT_SEVERITY_CONFIG[detection.severity];
  const icon = DETECTION_ICONS[detection.type];
  const timeAgo = getTimeAgo(detection.timestamp);

  return (
    <div className={`flex-1 rounded-xl border px-5 py-3 flex items-center gap-4 ${config.bgColor}`}>
      <span className={config.color}>{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary">{detection.description}</p>
        <p className="text-xs text-text-muted mt-0.5">{detection.camera} • {Math.round(detection.confidence)}% confidence</p>
      </div>
      <div className="flex items-center gap-1.5 text-text-muted flex-shrink-0">
        <Clock className="w-3.5 h-3.5" />
        <span className="text-xs font-mono">{timeAgo}</span>
      </div>
    </div>
  );
}

function getTimeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}
