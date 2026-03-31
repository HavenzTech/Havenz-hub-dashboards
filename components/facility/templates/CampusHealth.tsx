"use client";

import { TemplateShell } from "./TemplateShell";
import { BlurFade } from "@/components/ui/BlurFade";
import type { TemplateProps } from "@/types/facility";
import {
  Network,
  Droplets,
  Wind,
  Leaf,
  Building2,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  Thermometer,
  Wifi,
  Shield,
} from "lucide-react";
import {
  campusHealthData,
  SYSTEM_STATUS_CONFIG,
  type TenantUsage,
} from "@/lib/facility/mock-data";

/**
 * SCREEN 6 — CAMPUS HEALTH
 *
 * Simplified layout — 3 major sections with visual variety.
 * Hero stats at top, HVAC zone strip in middle, tenant breakdown at bottom.
 */
export function CampusHealth({ screenId }: TemplateProps) {
  const { network, water, hvac, environmental, tenantUsage } = campusHealthData;

  return (
    <TemplateShell template="campus-health" screenId={screenId}>
      <div className="h-full flex flex-col gap-6 p-8">

        {/* ── SECTION 1: INFRASTRUCTURE OVERVIEW (~30%) ── */}
        <section className="flex-[3] min-h-0 flex flex-col gap-4">
          <BlurFade delay={0} duration={500}>
            <SectionLabel>Infrastructure</SectionLabel>
          </BlurFade>

          {/* Hero stats row */}
          <BlurFade delay={100} duration={500}>
            <div className="grid grid-cols-4 gap-4">
              <HeroStat
                icon={<Wifi className="w-6 h-6" />}
                label="Fiber Uptime"
                value={network.fiberUptime.toString()}
                unit="%"
                color="#22c55e"
              />
              <HeroStat
                icon={<Droplets className="w-6 h-6" />}
                label="Water Flow"
                value="42.5"
                unit="m³/hr"
                color="#0ea5e9"
              />
              <HeroStat
                icon={<Leaf className="w-6 h-6" />}
                label="Air Quality"
                value="32"
                unit="AQI"
                color="#22c55e"
                badge="Good"
              />
              <HeroStat
                icon={<Shield className="w-6 h-6" />}
                label="CO₂ Level"
                value="412"
                unit="ppm"
                color="#00d4aa"
              />
            </div>
          </BlurFade>

          {/* System status rows */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            <BlurFade delay={200} duration={400}>
              <StatusPanel title="Network Nodes" items={network.nodes.map(n => ({
                name: n.name,
                status: n.status,
                detail: n.detail || "",
              }))} />
            </BlurFade>
            <BlurFade delay={300} duration={400}>
              <StatusPanel title="Water & Environmental" items={[
                ...water.systems.map(s => ({ name: s.name, status: s.status, detail: `${s.value} ${s.unit}` })),
                ...environmental.readings.slice(2).map(r => ({ name: r.name, status: r.status, detail: `${r.value} ${r.unit}` })),
              ]} />
            </BlurFade>
          </div>
        </section>

        {/* ── SECTION 2: HVAC ZONES (~30%) ── */}
        <section className="flex-[3] min-h-0 flex flex-col">
          <BlurFade delay={400} duration={500}>
            <SectionLabel>HVAC — Zone Temperatures</SectionLabel>
          </BlurFade>
          <div className="flex-1 grid grid-cols-5 gap-4 mt-2">
            {hvac.zones.map((zone, i) => (
              <BlurFade key={zone.name} delay={450 + i * 80} duration={400}>
                <ZoneCard zone={zone} />
              </BlurFade>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: TENANT USAGE (~30%) ── */}
        <section className="flex-[3] min-h-0 flex flex-col">
          <BlurFade delay={800} duration={500}>
            <div className="flex items-center gap-3">
              <SectionLabel>Energy by Building</SectionLabel>
              <TBDBadge />
            </div>
          </BlurFade>
          <div className="flex-1 flex flex-col gap-3 mt-2">
            {tenantUsage.map((tenant, i) => (
              <BlurFade key={tenant.building} delay={850 + i * 80} duration={400}>
                <TenantRow tenant={tenant} maxConsumption={120} />
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

function HeroStat({ icon, label, value, unit, color, badge }: {
  icon: React.ReactNode; label: string; value: string; unit: string; color: string; badge?: string;
}) {
  return (
    <div
      className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 flex flex-col justify-between"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <span style={{ color, opacity: 0.6 }}>{icon}</span>
        {badge && (
          <span className="text-xs px-2 py-0.5 rounded-full border font-medium"
            style={{ color, borderColor: `${color}44`, backgroundColor: `${color}11` }}>
            {badge}
          </span>
        )}
      </div>
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold font-mono leading-none" style={{ color }}>{value}</span>
          <span className="text-lg text-text-muted">{unit}</span>
        </div>
        <p className="text-sm text-text-muted mt-2 font-medium">{label}</p>
      </div>
    </div>
  );
}

function StatusPanel({ title, items }: {
  title: string;
  items: { name: string; status: "healthy" | "warning" | "critical" | "offline"; detail: string }[];
}) {
  return (
    <div
      className="h-full rounded-xl border border-white/10 bg-white/[0.02] p-5 flex flex-col"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}
    >
      <p className="text-xs text-text-muted font-semibold uppercase tracking-wider mb-3">{title}</p>
      <div className="flex-1 flex flex-col justify-between">
        {items.map((item) => {
          const config = SYSTEM_STATUS_CONFIG[item.status];
          return (
            <div key={item.name} className="flex items-center justify-between py-1.5">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-2 h-2 rounded-full ${config.dotColor}`}
                  style={{ boxShadow: item.status === "healthy" ? "0 0 4px rgba(34,197,94,0.4)" : item.status === "warning" ? "0 0 4px rgba(245,158,11,0.4)" : "none" }}
                />
                <span className="text-sm text-text-primary">{item.name}</span>
              </div>
              <span className="text-xs text-text-muted font-mono">{item.detail}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ZoneCard({ zone }: { zone: { name: string; temperature: number; humidity: number; status: string; coolingLoad: number } }) {
  const isWarm = zone.status === "warm";
  const tempColor = isWarm ? "#f59e0b" : zone.temperature < 20 ? "#0ea5e9" : "#00d4aa";

  return (
    <div
      className={`h-full rounded-2xl border p-5 flex flex-col justify-between ${
        isWarm ? "border-yellow-500/30 bg-yellow-500/5" : "border-white/10 bg-white/[0.02]"
      }`}
      style={{
        boxShadow: isWarm
          ? "0 0 20px rgba(245, 158, 11, 0.06), inset 0 1px 0 rgba(255,255,255,0.03)"
          : "inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      <p className="text-xs text-text-muted font-semibold mb-3">{zone.name}</p>

      {/* Big temperature */}
      <div className="flex items-center gap-2 mb-4">
        <Thermometer className="w-5 h-5" style={{ color: tempColor }} />
        <span className="text-4xl font-bold font-mono leading-none" style={{ color: tempColor }}>
          {zone.temperature}
        </span>
        <span className="text-lg text-text-muted">°C</span>
      </div>

      {/* Details */}
      <div className="space-y-2 mt-auto">
        <div className="flex justify-between text-xs">
          <span className="text-text-muted">Humidity</span>
          <span className="text-text-secondary font-mono">{zone.humidity}%</span>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-text-muted">Cooling Load</span>
            <span className={`font-mono font-semibold ${zone.coolingLoad > 80 ? "text-yellow-400" : "text-text-secondary"}`}>
              {zone.coolingLoad}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${zone.coolingLoad}%`,
                backgroundColor: zone.coolingLoad > 80 ? "#f59e0b" : "#00d4aa",
                boxShadow: zone.coolingLoad > 80 ? "0 0 6px rgba(245,158,11,0.5)" : "0 0 4px rgba(0,212,170,0.3)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TenantRow({ tenant, maxConsumption }: { tenant: TenantUsage; maxConsumption: number }) {
  const TrendIcon = tenant.trend === "up" ? TrendingUp : tenant.trend === "down" ? TrendingDown : Minus;
  const trendColor = tenant.trend === "up" ? "text-yellow-400" : tenant.trend === "down" ? "text-green-400" : "text-text-muted";
  const barWidth = (tenant.consumption / maxConsumption) * 100;

  return (
    <div
      className="flex-1 rounded-xl border border-white/10 bg-white/[0.02] px-6 py-4 flex items-center gap-6"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}
    >
      {/* Building name */}
      <div className="w-32 flex-shrink-0">
        <p className="text-base font-semibold text-text-primary">{tenant.building}</p>
      </div>

      {/* Consumption bar */}
      <div className="flex-1">
        <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${barWidth}%`,
              background: "linear-gradient(90deg, #00d4aa, #0ea5e9)",
              boxShadow: "0 0 8px rgba(0,212,170,0.3)",
            }}
          />
        </div>
      </div>

      {/* Value */}
      <div className="w-24 text-right">
        <span className="text-2xl font-bold font-mono text-text-primary">{tenant.consumption}</span>
        <span className="text-sm text-text-muted ml-1">kW</span>
      </div>

      {/* Share */}
      <div className="w-16 text-right">
        <span className="text-lg font-mono text-accent-secondary">{tenant.percentage}%</span>
      </div>

      {/* Trend */}
      <TrendIcon className={`w-5 h-5 flex-shrink-0 ${trendColor}`} />
    </div>
  );
}
