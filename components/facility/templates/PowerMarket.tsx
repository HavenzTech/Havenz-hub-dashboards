"use client";

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";
import { TemplateShell } from "./TemplateShell";
import { BlurFade } from "@/components/ui/BlurFade";
import type { TemplateProps } from "@/types/facility";
import {
  TrendingUp,
  TrendingDown,
  Zap,
  Gauge,
  BarChart3,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  Radio,
} from "lucide-react";
import { powerMarketData, type MarketSignal } from "@/lib/facility/mock-data";

/**
 * SCREEN 8 — POWER MARKET INTELLIGENCE (AESO)
 *
 * Layout:
 * 1. Market hero stats (~15%)
 * 2. 1-Day price forecast chart (~28%)
 * 3. 7-Day price forecast chart (~28%)
 * 4. Trading signals (~25%)
 */
export function PowerMarket({ screenId }: TemplateProps) {
  const { poolPrice, poolPriceChange, demandMW, demandCapacityMW, dayAheadAvg, volatility, forecast1d, forecast7d, signals } = powerMarketData;
  const demandPercent = Math.round((demandMW / demandCapacityMW) * 100);
  const priceUp = poolPriceChange > 0;

  return (
    <TemplateShell template="power-market" screenId={screenId}>
      <div className="h-full flex flex-col gap-5 p-8">

        {/* MARKET HERO */}
        <BlurFade delay={0} duration={500}>
          <div className="grid grid-cols-4 gap-4">
            {/* Pool Price — featured */}
            <div
              className="col-span-2 rounded-2xl border border-accent-primary/30 bg-gradient-to-b from-accent-primary/[0.06] to-transparent p-4 flex items-center gap-4 overflow-hidden"
              style={{ boxShadow: "0 0 30px rgba(0,212,170,0.06), inset 0 1px 0 rgba(255,255,255,0.05)" }}
            >
              <Zap className="w-8 h-8 text-accent-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider mb-1">AESO Pool Price</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold font-mono text-accent-primary leading-none">${poolPrice}</span>
                  <span className="text-sm text-text-muted">/MWh</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  {priceUp ? <TrendingUp className="w-4 h-4 text-green-400" /> : <TrendingDown className="w-4 h-4 text-red-400" />}
                  <span className={`text-sm font-bold font-mono ${priceUp ? "text-green-400" : "text-red-400"}`}>
                    {priceUp ? "+" : ""}{poolPriceChange}%
                  </span>
                </div>
              </div>
            </div>

            {/* Demand */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-4 flex flex-col justify-between overflow-hidden"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Gauge className="w-5 h-5 text-accent-secondary/60 flex-shrink-0" />
                <p className="text-xs text-text-muted uppercase tracking-wider">System Demand</p>
              </div>
              <span className="text-3xl font-bold font-mono text-text-primary">{demandMW.toLocaleString()}</span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-text-muted">of {demandCapacityMW.toLocaleString()} MW</span>
                <span className={`text-sm font-bold font-mono ${demandPercent > 85 ? "text-yellow-400" : "text-text-secondary"}`}>{demandPercent}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mt-1">
                <div className="h-full rounded-full" style={{
                  width: `${demandPercent}%`,
                  background: demandPercent > 85 ? "#f59e0b" : "linear-gradient(90deg, #00d4aa, #0ea5e9)",
                }} />
              </div>
            </div>

            {/* Day-ahead + Volatility */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-4 flex flex-col justify-between overflow-hidden"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-accent-secondary/60 flex-shrink-0" />
                  <p className="text-xs text-text-muted uppercase tracking-wider">Day-Ahead Avg</p>
                </div>
                <span className="text-2xl font-bold font-mono text-text-primary">${dayAheadAvg}</span>
                <span className="text-sm text-text-muted ml-1">/MWh</span>
              </div>
              <div className="mt-3">
                <div className="flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-text-muted/40 flex-shrink-0" />
                  <span className="text-xs text-text-muted">Volatility</span>
                </div>
                <span className={`text-xs font-bold ml-5 ${volatility === "high" ? "text-red-400" : volatility === "moderate" ? "text-yellow-400" : "text-green-400"}`}>
                  {volatility.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* 1-DAY FORECAST */}
        <section className="flex-[2.8] min-h-0 flex flex-col">
          <BlurFade delay={200} duration={500}>
            <SectionLabel>1-Day Price Forecast</SectionLabel>
          </BlurFade>
          <BlurFade delay={300} duration={600} className="flex-1 min-h-0">
            <PriceChart data={forecast1d} gradientId="forecast1d" avgLine={dayAheadAvg} />
          </BlurFade>
        </section>

        {/* 7-DAY FORECAST */}
        <section className="flex-[2.8] min-h-0 flex flex-col">
          <BlurFade delay={500} duration={500}>
            <SectionLabel>7-Day Price Forecast</SectionLabel>
          </BlurFade>
          <BlurFade delay={600} duration={600} className="flex-1 min-h-0">
            <PriceChart data={forecast7d} gradientId="forecast7d" color="#0ea5e9" />
          </BlurFade>
        </section>

        {/* TRADING SIGNALS */}
        <section className="flex-[2.5] min-h-0 flex flex-col">
          <BlurFade delay={800} duration={500}>
            <SectionLabel>Trading Signals</SectionLabel>
          </BlurFade>
          <div className="flex-1 flex flex-col gap-3">
            {signals.map((signal, i) => (
              <BlurFade key={signal.id} delay={850 + i * 100} duration={400}>
                <SignalRow signal={signal} />
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
  return <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent-primary/70 mb-3">{children}</h2>;
}

function PriceChart({ data, gradientId, color = "#00d4aa", avgLine }: {
  data: { time: string; price: number }[];
  gradientId: string;
  color?: string;
  avgLine?: number;
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
          <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "monospace" }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `$${v}`} />
          <Tooltip
            contentStyle={{ backgroundColor: "rgba(10,22,40,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontFamily: "monospace", fontSize: 12 }}
            formatter={(value: number) => [`$${value.toFixed(2)}/MWh`, "Price"]}
            labelStyle={{ color: "rgba(255,255,255,0.5)" }}
          />
          {avgLine && (
            <ReferenceLine y={avgLine} stroke="rgba(255,255,255,0.2)" strokeDasharray="6 6" label={{ value: `Avg $${avgLine}`, fill: "rgba(255,255,255,0.3)", fontSize: 10 }} />
          )}
          <Area type="monotone" dataKey="price" stroke={color} strokeWidth={2} fill={`url(#${gradientId})`} dot={false}
            activeDot={{ r: 4, stroke: color, strokeWidth: 2, fill: "#0a1628" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

const SIGNAL_ICONS: Record<string, React.ReactNode> = {
  "export-opportunity": <ArrowUpRight className="w-5 h-5" />,
  "peak-demand": <Gauge className="w-5 h-5" />,
  "low-price": <TrendingDown className="w-5 h-5" />,
  "price-spike": <AlertTriangle className="w-5 h-5" />,
};

const SIGNAL_COLORS: Record<string, { color: string; bg: string }> = {
  high: { color: "text-green-400", bg: "bg-green-500/10 border-green-500/30" },
  medium: { color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/30" },
  low: { color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30" },
};

function SignalRow({ signal }: { signal: MarketSignal }) {
  const config = SIGNAL_COLORS[signal.severity];
  const icon = SIGNAL_ICONS[signal.type];
  const timeAgo = getTimeAgo(signal.timestamp);

  return (
    <div className={`flex-1 rounded-xl border px-6 py-4 flex items-center gap-4 ${config.bg}`}>
      <span className={config.color}>{icon}</span>
      <div className="flex-1">
        <p className="text-base text-text-primary font-medium">{signal.message}</p>
      </div>
      {signal.actionable && (
        <span className="text-[10px] px-2 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary font-bold">
          ACTIONABLE
        </span>
      )}
      <div className="flex items-center gap-1.5 text-text-muted">
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
