"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TemplateShell } from "./TemplateShell";
import { BlurFade } from "@/components/ui/BlurFade";
import type { TemplateProps } from "@/types/facility";
import {
  Zap,
  Gauge,
  Flame,
  Fuel,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
} from "lucide-react";
import {
  powerPlatformData,
  type MockKPI,
  type MockTrendPoint,
} from "@/lib/facility/mock-data";

const KPI_ICONS: Record<string, React.ReactNode> = {
  totalGeneration: <Zap className="w-6 h-6" />,
  systemLoad: <Gauge className="w-6 h-6" />,
  heatRecovery: <Flame className="w-6 h-6" />,
  systemEfficiency: <TrendingUp className="w-6 h-6" />,
  fuelInput: <Fuel className="w-6 h-6" />,
  operatingMargin: <DollarSign className="w-6 h-6" />,
};

/**
 * SCREEN 3 — POWER PLATFORM OVERVIEW
 *
 * Layout (portrait, no scroll):
 * 1. KPI Cards (3x2 grid) — ~30%
 * 2. 24h Generation Trend — ~32%
 * 3. 7-Day Generation Trend — ~32%
 */
export function PowerPlatform({ screenId }: TemplateProps) {
  const { kpis, trend24h, trend7d } = powerPlatformData;

  const kpiEntries = Object.entries(kpis) as [string, MockKPI][];

  return (
    <TemplateShell template="power-platform" screenId={screenId}>
      <div className="h-full flex flex-col gap-5 p-8">
        {/* KPI CARDS — ~30% */}
        <section className="flex-[3] min-h-0">
          <BlurFade delay={0} duration={600}>
            <SectionLabel>Generation Performance</SectionLabel>
          </BlurFade>
          <div className="h-[calc(100%-2rem)] grid grid-cols-3 grid-rows-2 gap-4">
            {kpiEntries.map(([key, kpi], i) => (
              <BlurFade key={key} delay={100 + i * 100} duration={500}>
                <KPICard
                  kpi={kpi}
                  icon={KPI_ICONS[key]}
                  isPrimary={key === "totalGeneration"}
                />
              </BlurFade>
            ))}
          </div>
        </section>

        {/* 24H TREND — ~32% */}
        <section className="flex-[3.2] min-h-0 flex flex-col">
          <BlurFade delay={700} duration={600}>
            <SectionLabel>24-Hour Generation</SectionLabel>
          </BlurFade>
          <BlurFade delay={800} duration={600} className="flex-1 min-h-0">
            <TrendChart
              data={trend24h}
              color="#00d4aa"
              gradientId="grad24h"
              unit="MW"
            />
          </BlurFade>
        </section>

        {/* 7D TREND — ~32% */}
        <section className="flex-[3.2] min-h-0 flex flex-col">
          <BlurFade delay={1000} duration={600}>
            <SectionLabel>7-Day Generation</SectionLabel>
          </BlurFade>
          <BlurFade delay={1100} duration={600} className="flex-1 min-h-0">
            <TrendChart
              data={trend7d}
              color="#0ea5e9"
              gradientId="grad7d"
              unit="MW"
            />
          </BlurFade>
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

function KPICard({
  kpi,
  icon,
  isPrimary,
}: {
  kpi: MockKPI;
  icon: React.ReactNode;
  isPrimary?: boolean;
}) {
  const TrendIcon = kpi.trend === "up" ? TrendingUp : kpi.trend === "down" ? TrendingDown : Minus;
  const trendColor = kpi.trend === "up" ? "text-green-400" : kpi.trend === "down" ? "text-red-400" : "text-text-muted";

  return (
    <div
      className={`h-full rounded-xl border bg-gradient-to-b from-white/[0.04] to-transparent p-6 flex flex-col justify-between transition-colors ${
        isPrimary ? "border-accent-primary/30" : "border-white/10"
      }`}
      style={{
        boxShadow: isPrimary
          ? "0 0 25px rgba(0, 212, 170, 0.08), inset 0 1px 0 rgba(255,255,255,0.05)"
          : "inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      {/* Top row: icon + trend */}
      <div className="flex items-center justify-between">
        <div className={`${isPrimary ? "text-accent-primary" : "text-accent-secondary/60"}`}>
          {icon}
        </div>
        <div className="flex items-center gap-1">
          {kpi.unknown && (
            <AlertCircle className="w-3.5 h-3.5 text-yellow-500/50" />
          )}
          <TrendIcon className={`w-4 h-4 ${trendColor}`} />
        </div>
      </div>

      {/* Value */}
      <div className="mt-3">
        <div className="flex items-baseline gap-2">
          <span className={`text-5xl font-bold font-mono leading-none ${isPrimary ? "text-accent-primary" : "text-text-primary"}`}>
            {typeof kpi.value === "number" && kpi.unit === "$/MWh"
              ? kpi.value.toFixed(2)
              : kpi.value}
          </span>
          <span className="text-lg text-text-muted">{kpi.unit}</span>
        </div>
      </div>

      {/* Label */}
      <div className="mt-2 flex items-center gap-2">
        <p className="text-sm text-text-muted font-medium">{kpi.label}</p>
        {kpi.unknown && (
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-500/70 border border-yellow-500/20 font-medium">
            TBD
          </span>
        )}
      </div>
    </div>
  );
}

function TrendChart({
  data,
  color,
  gradientId,
  unit,
}: {
  data: MockTrendPoint[];
  color: string;
  gradientId: string;
  unit: string;
}) {
  return (
    <div
      className="h-full rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent p-4 pt-2"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.25} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="time"
            stroke="rgba(255,255,255,0.2)"
            tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "monospace" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="rgba(255,255,255,0.2)"
            tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "monospace" }}
            tickLine={false}
            axisLine={false}
            domain={["auto", "auto"]}
            tickFormatter={(v: number) => `${v}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(10, 22, 40, 0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              color: "#fff",
              fontFamily: "monospace",
              fontSize: 12,
            }}
            formatter={(value: number) => [`${value} ${unit}`, "Generation"]}
            labelStyle={{ color: "rgba(255,255,255,0.5)" }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            dot={false}
            activeDot={{
              r: 4,
              stroke: color,
              strokeWidth: 2,
              fill: "#0a1628",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
