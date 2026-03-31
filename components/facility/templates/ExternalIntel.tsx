"use client";

import { TemplateShell } from "./TemplateShell";
import { BlurFade } from "@/components/ui/BlurFade";
import type { TemplateProps } from "@/types/facility";
import {
  CloudSnow,
  Zap,
  TrendingUp,
  FileText,
  AlertTriangle,
  Info,
  CircleAlert,
  Thermometer,
  Wind,
  Droplets,
  Clock,
  Sun,
  Cloud,
  Snowflake,
} from "lucide-react";
import {
  externalIntelData,
  ALERT_SEVERITY_CONFIG,
  type ExternalAlert,
} from "@/lib/facility/mock-data";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  weather: <CloudSnow className="w-5 h-5" />,
  grid: <Zap className="w-5 h-5" />,
  market: <TrendingUp className="w-5 h-5" />,
  regulatory: <FileText className="w-5 h-5" />,
};

const CATEGORY_COLORS: Record<string, string> = {
  weather: "text-blue-400",
  grid: "text-yellow-400",
  market: "text-green-400",
  regulatory: "text-purple-400",
};

const CONDITION_ICONS: Record<string, React.ReactNode> = {
  Clear: <Sun className="w-8 h-8 text-yellow-400" />,
  Cloudy: <Cloud className="w-8 h-8 text-slate-400" />,
  Snow: <Snowflake className="w-8 h-8 text-blue-400" />,
};

/**
 * SCREEN 13 — EXTERNAL INTELLIGENCE
 *
 * Stripped down from the AI slop. Focus on what matters:
 * 1. Weather current + forecast (~30%)
 * 2. External alerts feed (~65%)
 */
export function ExternalIntel({ screenId }: TemplateProps) {
  const { weather, alerts } = externalIntelData;

  return (
    <TemplateShell template="external-intel" screenId={screenId}>
      <div className="h-full flex flex-col gap-6 p-8">

        {/* WEATHER */}
        <section className="flex-[3] min-h-0 flex flex-col gap-4">
          <BlurFade delay={0} duration={500}>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent-primary/70">Weather & Conditions</h2>
          </BlurFade>

          <div className="flex-1 grid grid-cols-6 gap-4">
            {/* Current weather — big card */}
            <BlurFade delay={100} duration={500}>
              <div
                className="col-span-1 h-full rounded-2xl border border-blue-500/20 bg-gradient-to-b from-blue-500/[0.06] to-transparent p-6 flex flex-col items-center justify-center"
                style={{ boxShadow: "0 0 25px rgba(59,130,246,0.06), inset 0 1px 0 rgba(255,255,255,0.05)" }}
              >
                <span className="text-5xl mb-2">{weather.current.icon}</span>
                <span className="text-5xl font-bold font-mono text-text-primary leading-none">{weather.current.temp}°C</span>
                <p className="text-sm text-text-muted mt-2">{weather.current.condition}</p>
                <div className="flex gap-4 mt-4 text-xs text-text-muted">
                  <span className="flex items-center gap-1"><Wind className="w-3 h-3" />{weather.current.wind} km/h</span>
                  <span className="flex items-center gap-1"><Droplets className="w-3 h-3" />{weather.current.humidity}%</span>
                </div>
              </div>
            </BlurFade>

            {/* 5-day forecast */}
            {weather.forecast.map((day, i) => (
              <BlurFade key={day.day} delay={200 + i * 80} duration={400}>
                <div
                  className="h-full rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-5 flex flex-col items-center justify-between"
                  style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}
                >
                  <p className="text-sm font-semibold text-text-secondary">{day.day}</p>
                  <div className="my-3">
                    {CONDITION_ICONS[day.condition] || <Cloud className="w-8 h-8 text-slate-400" />}
                  </div>
                  <p className="text-xs text-text-muted">{day.condition}</p>
                  <div className="mt-3 text-center">
                    <p className="text-2xl font-bold font-mono text-text-primary">{day.high}°</p>
                    <p className="text-sm font-mono text-text-muted">{day.low}°</p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>

          {/* Weather alerts */}
          {weather.alerts.length > 0 && (
            <BlurFade delay={500} duration={400}>
              <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 px-6 py-3 flex items-center gap-4">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-yellow-300">{weather.alerts[0].title}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{weather.alerts[0].description}</p>
                </div>
              </div>
            </BlurFade>
          )}
        </section>

        {/* EXTERNAL ALERTS FEED */}
        <section className="flex-[6.5] min-h-0 flex flex-col">
          <BlurFade delay={600} duration={500}>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent-primary/70 mb-4">External Alerts</h2>
          </BlurFade>
          <div className="flex-1 flex flex-col gap-3">
            {alerts.map((alert, i) => (
              <BlurFade key={alert.id} delay={650 + i * 100} duration={400}>
                <ExternalAlertRow alert={alert} />
              </BlurFade>
            ))}
          </div>
        </section>
      </div>
    </TemplateShell>
  );
}

function ExternalAlertRow({ alert }: { alert: ExternalAlert }) {
  const severityConfig = ALERT_SEVERITY_CONFIG[alert.severity];
  const categoryIcon = CATEGORY_ICONS[alert.category];
  const categoryColor = CATEGORY_COLORS[alert.category];
  const timeAgo = getTimeAgo(alert.timestamp);

  const SeverityIcon = alert.severity === "critical" ? CircleAlert
    : alert.severity === "warning" ? AlertTriangle
    : Info;

  return (
    <div
      className={`flex-1 rounded-xl border px-6 py-5 flex items-start gap-4 ${severityConfig.bgColor}`}
      style={{
        boxShadow: alert.severity === "critical" ? "0 0 12px rgba(239,68,68,0.06)" :
          alert.severity === "warning" ? "0 0 10px rgba(245,158,11,0.04)" : "inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      <SeverityIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${severityConfig.color}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1.5">
          <span className={categoryColor}>{categoryIcon}</span>
          <span className={`text-xs font-bold uppercase tracking-wider ${categoryColor}`}>{alert.category}</span>
          <span className="text-xs text-text-muted">•</span>
          <span className="text-xs text-text-muted">{alert.source}</span>
        </div>
        <p className="text-lg font-semibold text-text-primary">{alert.title}</p>
        <p className="text-sm text-text-secondary mt-1">{alert.description}</p>
      </div>
      <div className="flex items-center gap-1.5 text-text-muted flex-shrink-0 mt-1">
        <Clock className="w-3.5 h-3.5" />
        <span className="text-xs font-mono">{timeAgo}</span>
      </div>
    </div>
  );
}

function getTimeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return `${Math.floor(diff / 60000)}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
