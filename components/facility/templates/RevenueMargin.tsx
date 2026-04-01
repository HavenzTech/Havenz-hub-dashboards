"use client";

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { TemplateShell } from "./TemplateShell";
import { BlurFade } from "@/components/ui/BlurFade";
import type { TemplateProps } from "@/types/facility";
import {
  DollarSign,
  TrendingUp,
  Fuel,
  ArrowUpRight,
  CircleDollarSign,
  PiggyBank,
} from "lucide-react";
import { revenueMarginData } from "@/lib/facility/mock-data";

/**
 * SCREEN 9 — REVENUE & OPERATING MARGIN (CEO Dashboard)
 *
 * Layout:
 * 1. Revenue hero + margin gauge (~25%)
 * 2. Cost breakdown strip (~10%)
 * 3. 24h revenue trend (~30%)
 * 4. 7d revenue trend (~30%)
 */
export function RevenueMargin({ screenId }: TemplateProps) {
  const d = revenueMarginData;

  return (
    <TemplateShell template="revenue-margin" screenId={screenId}>
      <div className="h-full flex flex-col gap-5 p-8">

        {/* REVENUE HERO */}
        <BlurFade delay={0} duration={500}>
          <div className="grid grid-cols-3 gap-4">
            {/* Revenue Today — big featured card */}
            <div
              className="rounded-2xl border border-green-500/30 bg-gradient-to-b from-green-500/[0.06] to-transparent p-4 overflow-hidden"
              style={{ boxShadow: "0 0 30px rgba(34,197,94,0.06), inset 0 1px 0 rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-6 h-6 text-green-400" />
                <p className="text-xs text-text-muted uppercase tracking-wider">Revenue Today</p>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-mono text-green-400 leading-none">
                  ${d.revenueToday.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Revenue This Month */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-4 overflow-hidden"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}>
              <div className="flex items-center gap-2 mb-3">
                <CircleDollarSign className="w-6 h-6 text-accent-secondary/60" />
                <p className="text-xs text-text-muted uppercase tracking-wider">This Month</p>
              </div>
              <span className="text-3xl font-bold font-mono text-text-primary leading-none">
                ${(d.revenueMonth / 1000).toFixed(1)}k
              </span>
            </div>

            {/* Margin */}
            <div
              className="rounded-2xl border border-accent-primary/30 bg-gradient-to-b from-accent-primary/[0.06] to-transparent p-4 flex flex-col justify-between overflow-hidden"
              style={{ boxShadow: "0 0 25px rgba(0,212,170,0.06), inset 0 1px 0 rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <PiggyBank className="w-6 h-6 text-accent-primary" />
                <p className="text-xs text-text-muted uppercase tracking-wider">Operating Margin</p>
              </div>
              <span className="text-3xl font-bold font-mono text-accent-primary leading-none">
                {d.marginPercent}%
              </span>
              <p className="text-sm text-text-muted mt-2 font-mono">${d.marginPerMWh}/MWh</p>
            </div>
          </div>
        </BlurFade>

        {/* COST BREAKDOWN */}
        <BlurFade delay={200} duration={500}>
          <div
            className="flex items-center justify-between px-8 py-5 rounded-2xl border border-white/10 bg-white/[0.02]"
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
          >
            <CostItem icon={<ArrowUpRight className="w-5 h-5 text-green-400" />} label="Export Revenue" value={`$${d.revenueExport.toLocaleString()}`} sub="today" color="text-green-400" />
            <div className="w-px h-10 bg-white/10" />
            <CostItem icon={<Fuel className="w-5 h-5 text-orange-400" />} label="Gas Cost" value={`$${d.gasCost.toLocaleString()}`} sub="today" color="text-orange-400" />
            <div className="w-px h-10 bg-white/10" />
            <CostItem icon={<DollarSign className="w-5 h-5 text-text-muted" />} label="Cost / MWh" value={`$${d.costPerMWh}`} color="text-text-secondary" />
            <div className="w-px h-10 bg-white/10" />
            <CostItem icon={<TrendingUp className="w-5 h-5 text-accent-primary" />} label="Margin / MWh" value={`$${d.marginPerMWh}`} color="text-accent-primary" />
          </div>
        </BlurFade>

        {/* 24H REVENUE TREND */}
        <section className="flex-1 min-h-0 flex flex-col">
          <BlurFade delay={400} duration={500}>
            <SectionLabel>24-Hour Revenue</SectionLabel>
          </BlurFade>
          <BlurFade delay={500} duration={600} className="flex-1 min-h-0">
            <TrendChart data={d.trend24h} gradientId="rev24h" color="#22c55e" unit="$" />
          </BlurFade>
        </section>

        {/* 7D REVENUE TREND */}
        <section className="flex-1 min-h-0 flex flex-col">
          <BlurFade delay={700} duration={500}>
            <SectionLabel>7-Day Revenue</SectionLabel>
          </BlurFade>
          <BlurFade delay={800} duration={600} className="flex-1 min-h-0">
            <TrendChart data={d.trend7d} gradientId="rev7d" color="#0ea5e9" unit="$" />
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
  return <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent-primary/70 mb-3">{children}</h2>;
}

function CostItem({ icon, label, value, sub, color }: {
  icon: React.ReactNode; label: string; value: string; sub?: string; color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <p className="text-xs text-text-muted uppercase tracking-wider">{label}</p>
        <div className="flex items-baseline gap-1.5">
          <span className={`text-xl font-bold font-mono ${color}`}>{value}</span>
          {sub && <span className="text-xs text-text-muted">{sub}</span>}
        </div>
      </div>
    </div>
  );
}

function TrendChart({ data, gradientId, color, unit }: {
  data: { time: string; value: number }[];
  gradientId: string; color: string; unit: string;
}) {
  return (
    <div className="h-full rounded-xl border border-white/10 bg-white/[0.02] p-4 pt-2"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.25} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "monospace" }} tickLine={false} axisLine={false} />
          <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "monospace" }} tickLine={false} axisLine={false}
            tickFormatter={(v: number) => `${unit}${v.toLocaleString()}`} />
          <Tooltip
            contentStyle={{ backgroundColor: "rgba(10,22,40,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontFamily: "monospace", fontSize: 12 }}
            formatter={(value: number) => [`${unit}${value.toLocaleString()}`, "Revenue"]}
            labelStyle={{ color: "rgba(255,255,255,0.5)" }}
          />
          <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fill={`url(#${gradientId})`} dot={false}
            activeDot={{ r: 4, stroke: color, strokeWidth: 2, fill: "#0a1628" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
