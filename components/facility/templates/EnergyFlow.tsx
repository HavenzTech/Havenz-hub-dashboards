"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { TemplateShell } from "./TemplateShell";
import { BlurFade } from "@/components/ui/BlurFade";
import type { TemplateProps } from "@/types/facility";
import {
  Factory,
  BatteryCharging,
  Zap,
  Globe,
  Server,
  Sprout,
  Car,
  Plus,
  Building2,
} from "lucide-react";
import {
  energyFlowData,
  NODE_STATUS_COLORS,
  type NodeStatus,
} from "@/lib/facility/mock-data";

/**
 * SCREEN 5 — ENERGY FLOW DIAGRAM
 *
 * Grid-based vertical layout. No absolute positioning.
 * SVG overlay draws animated flow lines between node refs.
 */
export function EnergyFlow({ screenId }: TemplateProps) {
  const { summary } = energyFlowData;
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [lines, setLines] = useState<LineData[]>([]);

  const setNodeRef = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) nodeRefs.current.set(id, el);
  }, []);

  // Calculate line positions from DOM refs
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const newLines: LineData[] = [];

      const connections: { from: string; to: string; power: number; status: NodeStatus }[] = [
        { from: "power-plant", to: "substation", power: 2.4, status: "normal" },
        { from: "substation", to: "battery", power: 0.8, status: "normal" },
        { from: "substation", to: "grid", power: 1.2, status: "normal" },
        { from: "substation", to: "data-center", power: 0.5, status: "normal" },
        { from: "substation", to: "vertical-farm", power: 0.3, status: "normal" },
        { from: "substation", to: "ev-charging", power: 0.15, status: "high-load" },
        { from: "data-center", to: "campus", power: 0.5, status: "normal" },
        { from: "vertical-farm", to: "campus", power: 0.3, status: "normal" },
        { from: "ev-charging", to: "campus", power: 0.15, status: "high-load" },
      ];

      for (const conn of connections) {
        const fromEl = nodeRefs.current.get(conn.from);
        const toEl = nodeRefs.current.get(conn.to);
        if (!fromEl || !toEl) continue;

        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();

        newLines.push({
          x1: fromRect.left + fromRect.width / 2 - containerRect.left,
          y1: fromRect.top + fromRect.height / 2 - containerRect.top,
          x2: toRect.left + toRect.width / 2 - containerRect.left,
          y2: toRect.top + toRect.height / 2 - containerRect.top,
          power: conn.power,
          status: conn.status,
        });
      }

      setLines(newLines);
    }, 800); // wait for BlurFade animations

    return () => clearTimeout(timer);
  }, []);

  return (
    <TemplateShell template="energy-flow" screenId={screenId}>
      <div className="h-full flex flex-col p-8 gap-6" ref={containerRef}>
        {/* SUMMARY BAR */}
        <BlurFade delay={0} duration={600}>
          <div
            className="flex items-center justify-between px-8 py-5 rounded-2xl border border-white/10 bg-white/[0.02]"
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
          >
            <SummaryKPI label="Generation" value={summary.totalGeneration} unit="MW" color="#00d4aa" />
            <div className="w-px h-12 bg-white/10" />
            <SummaryKPI label="Campus Load" value={summary.totalConsumption} unit="MW" color="#0ea5e9" />
            <div className="w-px h-12 bg-white/10" />
            <SummaryKPI label="Grid Export" value={summary.gridExport} unit="MW" color="#22c55e" />
            <div className="w-px h-12 bg-white/10" />
            <SummaryKPI label="Battery" value={summary.batteryCharge} unit="MW" color="#f59e0b" prefix="+" />
            <div className="w-px h-12 bg-white/10" />
            <SummaryKPI label="Surplus" value={summary.surplus} unit="MW" color="#64748b" />
          </div>
        </BlurFade>

        {/* FLOW DIAGRAM — Grid layout, 5 rows */}
        <div className="flex-1 relative flex flex-col gap-0 justify-between min-h-0">
          {/* SVG lines overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {lines.map((line, i) => (
              <FlowLine key={i} {...line} />
            ))}
          </svg>

          {/* Row 1: Power Plant */}
          <BlurFade delay={100} duration={500}>
            <div className="flex justify-center relative z-10">
              <NodeCard
                ref={(el) => setNodeRef("power-plant", el)}
                icon={<Factory />}
                label="Power Plant"
                subtitle="2.4 MW"
                status="normal"
                power={2.4}
                capacity={3.0}
                large
              />
            </div>
          </BlurFade>

          {/* Row 2: Substation */}
          <BlurFade delay={250} duration={500}>
            <div className="flex justify-center relative z-10">
              <NodeCard
                ref={(el) => setNodeRef("substation", el)}
                icon={<Zap />}
                label="Substation"
                subtitle="25 kV"
                status="normal"
                large
              />
            </div>
          </BlurFade>

          {/* Row 3: Battery & Grid */}
          <div className="flex justify-between px-12 relative z-10">
            <BlurFade delay={400} duration={500}>
              <NodeCard
                ref={(el) => setNodeRef("battery", el)}
                icon={<BatteryCharging />}
                label="Battery (BESS)"
                subtitle="72% • 2.1 MW"
                status="normal"
                power={0.8}
                capacity={3.0}
              />
            </BlurFade>
            <BlurFade delay={500} duration={500}>
              <NodeCard
                ref={(el) => setNodeRef("grid", el)}
                icon={<Globe />}
                label="Grid"
                subtitle="Export 1.2 MW"
                status="normal"
              />
            </BlurFade>
          </div>

          {/* Row 4: Consumers */}
          <div className="flex justify-between px-4 relative z-10">
            <BlurFade delay={600} duration={400}>
              <NodeCard
                ref={(el) => setNodeRef("data-center", el)}
                icon={<Server />}
                label="Data Centre"
                subtitle="0.5 MW"
                status="normal"
                power={0.5}
                capacity={1.0}
              />
            </BlurFade>
            <BlurFade delay={700} duration={400}>
              <NodeCard
                ref={(el) => setNodeRef("vertical-farm", el)}
                icon={<Sprout />}
                label="Vertical Farm"
                subtitle="0.3 MW"
                status="normal"
                power={0.3}
                capacity={0.5}
              />
            </BlurFade>
            <BlurFade delay={800} duration={400}>
              <NodeCard
                ref={(el) => setNodeRef("ev-charging", el)}
                icon={<Car />}
                label="EV Charging"
                subtitle="0.15 MW"
                status="high-load"
                power={0.15}
                capacity={0.2}
              />
            </BlurFade>
            <BlurFade delay={900} duration={400}>
              <NodeCard
                ref={(el) => setNodeRef("future-1", el)}
                icon={<Plus />}
                label="Future Expansion"
                subtitle="Planned"
                status="future"
              />
            </BlurFade>
          </div>

          {/* Row 5: Campus */}
          <BlurFade delay={1000} duration={500}>
            <div className="flex justify-center relative z-10">
              <NodeCard
                ref={(el) => setNodeRef("campus", el)}
                icon={<Building2 />}
                label="Campus Load"
                subtitle="0.95 MW total"
                status="normal"
                large
              />
            </div>
          </BlurFade>
        </div>

        {/* LEGEND */}
        <BlurFade delay={1200} duration={600}>
          <div className="flex items-center justify-center gap-8">
            <LegendDot status="normal" label="Normal" />
            <LegendDot status="high-load" label="High Load" />
            <LegendDot status="alert" label="Alert" />
            <LegendDot status="future" label="Planned" />
            <div className="flex items-center gap-2 ml-2">
              <svg width="32" height="4"><line x1="0" y1="2" x2="32" y2="2" stroke="#00d4aa" strokeWidth="2" strokeDasharray="4 4" /></svg>
              <span className="text-xs text-text-muted">Energy Flow</span>
            </div>
          </div>
        </BlurFade>
      </div>

      <style jsx global>{`
        @keyframes flowDash {
          to { stroke-dashoffset: -20; }
        }
      `}</style>
    </TemplateShell>
  );
}

// ============================================
// SVG Flow Line
// ============================================

interface LineData {
  x1: number; y1: number;
  x2: number; y2: number;
  power: number; status: NodeStatus;
}

function FlowLine({ x1, y1, x2, y2, power, status }: LineData) {
  const colors = NODE_STATUS_COLORS[status];
  const thickness = Math.max(2, Math.min(power * 4, 6));
  const speed = power > 0.5 ? "0.6s" : "1.2s";

  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={colors.stroke} strokeWidth={thickness + 8} strokeOpacity={0.06} strokeLinecap="round"
      />
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={colors.stroke} strokeWidth={thickness} strokeOpacity={0.15} strokeLinecap="round"
      />
      {power > 0 && (
        <line x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={colors.text} strokeWidth={thickness} strokeOpacity={0.7} strokeLinecap="round"
          strokeDasharray="6 14"
          style={{ animation: `flowDash ${speed} linear infinite` }}
        />
      )}
    </g>
  );
}

// ============================================
// Node Card
// ============================================

import { forwardRef } from "react";

const NodeCard = forwardRef<HTMLDivElement, {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  status: NodeStatus;
  power?: number;
  capacity?: number;
  large?: boolean;
}>(function NodeCard({ icon, label, subtitle, status, power, capacity, large }, ref) {
  const colors = NODE_STATUS_COLORS[status];
  const isFuture = status === "future";
  const circleSize = large ? "w-24 h-24" : "w-20 h-20";
  const iconSize = large ? "[&>svg]:w-10 [&>svg]:h-10" : "[&>svg]:w-8 [&>svg]:h-8";

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      {/* Circle */}
      <div
        className={`${circleSize} rounded-full flex items-center justify-center border-2 ${isFuture ? "border-dashed" : ""} ${iconSize}`}
        style={{
          backgroundColor: colors.fill,
          borderColor: colors.stroke,
          boxShadow: colors.glow !== "none"
            ? `0 0 24px ${colors.glow}, 0 0 48px ${colors.glow}`
            : "none",
          color: colors.text,
        }}
      >
        {icon}
      </div>

      {/* Label card */}
      <div
        className="text-center px-5 py-2.5 rounded-xl border bg-black/50 backdrop-blur-sm"
        style={{
          borderColor: `${colors.stroke}44`,
          boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
        }}
      >
        <p className="text-base font-bold text-text-primary">{label}</p>
        {subtitle && (
          <p className="text-sm font-mono mt-0.5" style={{ color: colors.text }}>{subtitle}</p>
        )}
        {power !== undefined && capacity && capacity > 0 && (
          <div className="mt-2 w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.min((power / capacity) * 100, 100)}%`,
                backgroundColor: colors.text,
                boxShadow: `0 0 6px ${colors.text}`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
});

// ============================================
// Shared
// ============================================

function SummaryKPI({ label, value, unit, color, prefix }: {
  label: string; value: number; unit: string; color: string; prefix?: string;
}) {
  return (
    <div className="text-center">
      <p className="text-xs text-text-muted uppercase tracking-wider mb-1.5">{label}</p>
      <p className="text-2xl font-bold font-mono" style={{ color }}>
        {prefix}{value} <span className="text-sm text-text-muted">{unit}</span>
      </p>
    </div>
  );
}

function LegendDot({ status, label }: { status: NodeStatus; label: string }) {
  const colors = NODE_STATUS_COLORS[status];
  return (
    <div className="flex items-center gap-2">
      <div className="w-3.5 h-3.5 rounded-full border-2"
        style={{ backgroundColor: colors.fill, borderColor: colors.stroke }}
      />
      <span className="text-xs text-text-muted">{label}</span>
    </div>
  );
}
