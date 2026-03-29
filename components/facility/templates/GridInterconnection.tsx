"use client";

import { TemplateShell } from "./TemplateShell";
import { BlurFade } from "@/components/ui/BlurFade";
import type { TemplateProps } from "@/types/facility";
import {
  Battery,
  BatteryCharging,
  Thermometer,
  Heart,
  RefreshCw,
  Zap,
  Gauge,
  Cable,
  ArrowUpRight,
  ArrowDownLeft,
  Radio,
  ShieldCheck,
  AlertCircle,
  ToggleRight,
} from "lucide-react";
import {
  gridInterconnectionData,
  BREAKER_STATUS_CONFIG,
  LINE_STATUS_CONFIG,
} from "@/lib/facility/mock-data";

/**
 * SCREEN 4 — BATTERY + SUBSTATION + GRID INTERCONNECTION
 *
 * Layout (portrait, no scroll):
 * 1. BESS (Battery) — ~33%
 * 2. Substation — ~33%
 * 3. Grid Interconnection — ~33%
 *
 * ALL data sources TBD.
 */
export function GridInterconnection({ screenId }: TemplateProps) {
  const { battery, substation, grid } = gridInterconnectionData;

  return (
    <TemplateShell template="grid-interconnection" screenId={screenId}>
      <div className="h-full flex flex-col gap-5 p-8">
        {/* BATTERY (BESS) */}
        <section className="flex-1 min-h-0 flex flex-col">
          <BlurFade delay={0} duration={600}>
            <div className="flex items-center gap-3 mb-4">
              <SectionLabel>Battery Energy Storage (BESS)</SectionLabel>
              <TBDBadge />
            </div>
          </BlurFade>
          <div className="flex-1 flex gap-4">
            {/* Large charge gauge */}
            <BlurFade delay={100} duration={500}>
              <div
                className="h-full w-48 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 flex flex-col items-center justify-center"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}
              >
                <BatteryCharging className="w-8 h-8 text-accent-primary mb-3" />
                <span className="text-6xl font-bold font-mono text-accent-primary leading-none">
                  {battery.chargeLevel}
                </span>
                <span className="text-lg text-text-muted mt-1">%</span>
                <div className="w-full mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-all"
                    style={{ width: `${battery.chargeLevel}%` }}
                  />
                </div>
                <p className="text-xs text-text-muted mt-2">
                  {battery.chargeRate > 0 ? "Charging" : battery.dischargeRate > 0 ? "Discharging" : "Idle"}
                </p>
              </div>
            </BlurFade>

            {/* Battery metrics grid */}
            <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-3">
              <BlurFade delay={150} duration={400}>
                <MetricCard icon={<Zap className="w-5 h-5" />} label="Charge Rate" value={battery.chargeRate} unit="MW" color="text-accent-primary" />
              </BlurFade>
              <BlurFade delay={200} duration={400}>
                <MetricCard icon={<Battery className="w-5 h-5" />} label="Available" value={battery.availableMW} unit="MW" color="text-text-primary" />
              </BlurFade>
              <BlurFade delay={250} duration={400}>
                <MetricCard icon={<Heart className="w-5 h-5" />} label="Health" value={battery.health} unit="%" color={battery.health > 90 ? "text-green-400" : "text-yellow-400"} />
              </BlurFade>
              <BlurFade delay={300} duration={400}>
                <MetricCard icon={<RefreshCw className="w-5 h-5" />} label="Cycle Count" value={battery.cycleCount} unit="" color="text-text-primary" />
              </BlurFade>
              <BlurFade delay={350} duration={400}>
                <MetricCard icon={<Thermometer className="w-5 h-5" />} label="Temperature" value={battery.temperature} unit="°C" color={battery.thermalStatus === "hot" ? "text-red-400" : "text-text-primary"} />
              </BlurFade>
              <BlurFade delay={400} duration={400}>
                <MetricCard icon={<Gauge className="w-5 h-5" />} label="Capacity" value={battery.capacity} unit="MWh" color="text-text-primary" />
              </BlurFade>
            </div>
          </div>
        </section>

        {/* SUBSTATION */}
        <section className="flex-1 min-h-0 flex flex-col">
          <BlurFade delay={500} duration={600}>
            <div className="flex items-center gap-3 mb-4">
              <SectionLabel>Substation</SectionLabel>
              <TBDBadge />
            </div>
          </BlurFade>
          <div className="flex-1 grid grid-cols-4 grid-rows-2 gap-3">
            <BlurFade delay={550} duration={400}>
              <MetricCard icon={<Gauge className="w-5 h-5" />} label="Transformer Load" value={substation.transformerLoad} unit="%" color={substation.transformerLoad > 85 ? "text-yellow-400" : "text-text-primary"} />
            </BlurFade>
            <BlurFade delay={600} duration={400}>
              <MetricCard icon={<Zap className="w-5 h-5" />} label="Voltage (HV)" value={substation.voltageHV} unit="kV" color="text-text-primary" />
            </BlurFade>
            <BlurFade delay={650} duration={400}>
              <MetricCard icon={<Zap className="w-5 h-5" />} label="Voltage (LV)" value={substation.voltageLV} unit="kV" color="text-text-primary" />
            </BlurFade>
            <BlurFade delay={700} duration={400}>
              <StatusCard
                label="Breaker"
                status={substation.breakerStatus}
                config={BREAKER_STATUS_CONFIG[substation.breakerStatus]}
                icon={<ToggleRight className="w-5 h-5" />}
              />
            </BlurFade>
            <BlurFade delay={750} duration={400}>
              <MetricCard icon={<Cable className="w-5 h-5" />} label="Current (HV)" value={substation.currentHV} unit="A" color="text-text-primary" />
            </BlurFade>
            <BlurFade delay={800} duration={400}>
              <MetricCard icon={<Cable className="w-5 h-5" />} label="Current (LV)" value={substation.currentLV.toLocaleString()} unit="A" color="text-text-primary" />
            </BlurFade>
            <BlurFade delay={850} duration={400}>
              <MetricCard icon={<Radio className="w-5 h-5" />} label="Power Factor" value={substation.powerFactor} unit="" color="text-text-primary" />
            </BlurFade>
            <BlurFade delay={900} duration={400}>
              <StatusCard
                label="Switchgear"
                status={substation.switchgearStatus}
                config={{
                  normal: { label: "NORMAL", color: "text-green-400", dotColor: "bg-green-500" },
                  alarm: { label: "ALARM", color: "text-yellow-400", dotColor: "bg-yellow-500" },
                  fault: { label: "FAULT", color: "text-red-400", dotColor: "bg-red-500" },
                }[substation.switchgearStatus]}
                icon={<ShieldCheck className="w-5 h-5" />}
              />
            </BlurFade>
          </div>
        </section>

        {/* GRID INTERCONNECTION */}
        <section className="flex-1 min-h-0 flex flex-col">
          <BlurFade delay={1000} duration={600}>
            <div className="flex items-center gap-3 mb-4">
              <SectionLabel>Grid Interconnection</SectionLabel>
              <TBDBadge />
            </div>
          </BlurFade>
          <div className="flex-1 flex gap-4">
            {/* Net flow indicator */}
            <BlurFade delay={1050} duration={500}>
              <div
                className={`h-full w-48 rounded-2xl border p-6 flex flex-col items-center justify-center ${
                  grid.netFlow > 0
                    ? "border-green-500/30 bg-green-500/5"
                    : grid.netFlow < 0
                      ? "border-orange-500/30 bg-orange-500/5"
                      : "border-white/10 bg-white/[0.02]"
                }`}
                style={{
                  boxShadow: grid.netFlow > 0
                    ? "0 0 20px rgba(34, 197, 94, 0.08)"
                    : grid.netFlow < 0
                      ? "0 0 20px rgba(249, 115, 22, 0.08)"
                      : "none",
                }}
              >
                {grid.netFlow > 0 ? (
                  <ArrowUpRight className="w-10 h-10 text-green-400 mb-2" />
                ) : grid.netFlow < 0 ? (
                  <ArrowDownLeft className="w-10 h-10 text-orange-400 mb-2" />
                ) : (
                  <Cable className="w-10 h-10 text-text-muted mb-2" />
                )}
                <span className={`text-5xl font-bold font-mono leading-none ${
                  grid.netFlow > 0 ? "text-green-400" : grid.netFlow < 0 ? "text-orange-400" : "text-text-muted"
                }`}>
                  {Math.abs(grid.netFlow)}
                </span>
                <span className="text-lg text-text-muted mt-1">MW</span>
                <p className={`text-sm font-bold mt-2 ${
                  grid.netFlow > 0 ? "text-green-400" : grid.netFlow < 0 ? "text-orange-400" : "text-text-muted"
                }`}>
                  {grid.netFlow > 0 ? "EXPORTING" : grid.netFlow < 0 ? "IMPORTING" : "BALANCED"}
                </p>
              </div>
            </BlurFade>

            {/* Grid metrics */}
            <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-3">
              <BlurFade delay={1100} duration={400}>
                <MetricCard icon={<ArrowUpRight className="w-5 h-5" />} label="Export" value={grid.exportMW} unit="MW" color="text-green-400" />
              </BlurFade>
              <BlurFade delay={1150} duration={400}>
                <MetricCard icon={<ArrowDownLeft className="w-5 h-5" />} label="Import" value={grid.importMW} unit="MW" color={grid.importMW > 0 ? "text-orange-400" : "text-text-muted"} />
              </BlurFade>
              <BlurFade delay={1200} duration={400}>
                <MetricCard icon={<Radio className="w-5 h-5" />} label="Grid Frequency" value={grid.gridFrequency} unit="Hz" color="text-text-primary" />
              </BlurFade>
              <BlurFade delay={1250} duration={400}>
                <MetricCard icon={<Zap className="w-5 h-5" />} label="Grid Voltage" value={grid.gridVoltage} unit="kV" color="text-text-primary" />
              </BlurFade>
              <BlurFade delay={1300} duration={400}>
                <StatusCard
                  label="Transmission Line"
                  status={grid.lineStatus}
                  config={LINE_STATUS_CONFIG[grid.lineStatus]}
                  icon={<Cable className="w-5 h-5" />}
                />
              </BlurFade>
              <BlurFade delay={1350} duration={400}>
                <StatusCard
                  label="Tie-Line Breaker"
                  status={grid.tieLineStatus}
                  config={BREAKER_STATUS_CONFIG[grid.tieLineStatus]}
                  icon={<ToggleRight className="w-5 h-5" />}
                />
              </BlurFade>
            </div>
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
    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent-primary/70">
      {children}
    </h2>
  );
}

function TBDBadge() {
  return (
    <span className="flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500/70 border border-yellow-500/20 font-medium">
      <AlertCircle className="w-3 h-3" />
      DATA SOURCE TBD
    </span>
  );
}

function MetricCard({
  icon,
  label,
  value,
  unit,
  color = "text-text-primary",
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  unit: string;
  color?: string;
}) {
  return (
    <div
      className="h-full rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-4 flex flex-col justify-center"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-accent-secondary/50">{icon}</span>
        <p className="text-xs text-text-muted font-medium">{label}</p>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className={`text-3xl font-bold font-mono leading-none ${color}`}>
          {value}
        </span>
        {unit && <span className="text-sm text-text-muted">{unit}</span>}
      </div>
    </div>
  );
}

function StatusCard({
  label,
  status,
  config,
  icon,
}: {
  label: string;
  status: string;
  config: { label: string; color: string; dotColor: string };
  icon: React.ReactNode;
}) {
  return (
    <div
      className="h-full rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-4 flex flex-col justify-center"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-accent-secondary/50">{icon}</span>
        <p className="text-xs text-text-muted font-medium">{label}</p>
      </div>
      <div className="flex items-center gap-2">
        <div
          className={`w-3 h-3 rounded-full ${config.dotColor}`}
          style={{ boxShadow: `0 0 6px ${config.dotColor === "bg-green-500" ? "rgba(34,197,94,0.5)" : config.dotColor === "bg-red-500" ? "rgba(239,68,68,0.5)" : "rgba(245,158,11,0.5)"}` }}
        />
        <span className={`text-xl font-black tracking-wide ${config.color}`}>
          {config.label}
        </span>
      </div>
    </div>
  );
}
