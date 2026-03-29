"use client";

import { TemplateShell } from "./TemplateShell";
import { BlurFade } from "@/components/ui/BlurFade";
import type { TemplateProps } from "@/types/facility";
import {
  Leaf,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileCheck,
  TrendingDown,
  Factory,
  Target,
} from "lucide-react";
import {
  esgComplianceData,
  type ComplianceDeadline,
  type RegulatoryAlert,
} from "@/lib/facility/mock-data";

const AUDIT_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  ready: { label: "AUDIT READY", color: "text-green-400", bg: "border-green-500/30 bg-green-500/5", icon: <ShieldCheck className="w-8 h-8 text-green-400" /> },
  issues: { label: "ISSUES FOUND", color: "text-yellow-400", bg: "border-yellow-500/30 bg-yellow-500/5", icon: <AlertTriangle className="w-8 h-8 text-yellow-400" /> },
  "not-ready": { label: "NOT READY", color: "text-red-400", bg: "border-red-500/30 bg-red-500/5", icon: <AlertTriangle className="w-8 h-8 text-red-400" /> },
};

const DEADLINE_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  "on-track": { label: "On Track", color: "text-green-400", icon: <CheckCircle2 className="w-4 h-4 text-green-400" /> },
  "at-risk": { label: "At Risk", color: "text-yellow-400", icon: <Clock className="w-4 h-4 text-yellow-400" /> },
  overdue: { label: "Overdue", color: "text-red-400", icon: <AlertTriangle className="w-4 h-4 text-red-400" /> },
  submitted: { label: "Submitted", color: "text-accent-primary", icon: <FileCheck className="w-4 h-4 text-accent-primary" /> },
};

/**
 * SCREEN 10 — ESG & COMPLIANCE
 *
 * Stripped down — no fluff. Focus on:
 * 1. Emissions snapshot + audit status (~30%)
 * 2. Compliance deadlines (~35%)
 * 3. Regulatory alerts (~25%)
 */
export function ESGCompliance({ screenId }: TemplateProps) {
  const { emissions, auditStatus, lastAudit, nextAudit, deadlines, alerts } = esgComplianceData;
  const audit = AUDIT_CONFIG[auditStatus];

  return (
    <TemplateShell template="esg-compliance" screenId={screenId}>
      <div className="h-full flex flex-col gap-6 p-8">

        {/* EMISSIONS + AUDIT STATUS */}
        <section className="flex-[3] min-h-0 flex flex-col gap-4">
          <BlurFade delay={0} duration={500}>
            <SectionLabel>Emissions & Audit Status</SectionLabel>
          </BlurFade>

          <div className="flex-1 grid grid-cols-3 gap-4">
            {/* Emissions metrics */}
            <BlurFade delay={100} duration={500}>
              <div className="h-full grid grid-rows-2 gap-4">
                <EmissionCard
                  icon={<Factory className="w-6 h-6" />}
                  label="CO₂ Today"
                  value={emissions.co2Today}
                  unit="tonnes"
                  color="#f59e0b"
                />
                <EmissionCard
                  icon={<TrendingDown className="w-6 h-6" />}
                  label="CO₂ This Month"
                  value={emissions.co2Month}
                  unit="tonnes"
                  color="#0ea5e9"
                />
              </div>
            </BlurFade>

            <BlurFade delay={200} duration={500}>
              <div className="h-full grid grid-rows-2 gap-4">
                <EmissionCard
                  icon={<Leaf className="w-6 h-6" />}
                  label="Emissions Reduction"
                  value={emissions.co2Reduction}
                  unit="% vs baseline"
                  color="#22c55e"
                />
                <div className="rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-5 flex flex-col justify-between"
                  style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}>
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-accent-primary/60" />
                    <p className="text-xs text-text-muted uppercase tracking-wider">Emissions Intensity</p>
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className={`text-4xl font-bold font-mono leading-none ${
                      emissions.intensity <= emissions.intensityTarget ? "text-green-400" : "text-yellow-400"
                    }`}>{emissions.intensity}</span>
                    <span className="text-sm text-text-muted">tCO₂/MWh</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-text-muted">Target: {emissions.intensityTarget}</span>
                      <span className={emissions.intensity <= emissions.intensityTarget ? "text-green-400 font-bold" : "text-yellow-400 font-bold"}>
                        {emissions.intensity <= emissions.intensityTarget ? "BELOW TARGET" : "ABOVE TARGET"}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden relative">
                      <div className="h-full rounded-full" style={{
                        width: `${Math.min((emissions.intensity / emissions.intensityTarget) * 100, 100)}%`,
                        backgroundColor: emissions.intensity <= emissions.intensityTarget ? "#22c55e" : "#f59e0b",
                        boxShadow: `0 0 6px ${emissions.intensity <= emissions.intensityTarget ? "rgba(34,197,94,0.4)" : "rgba(245,158,11,0.4)"}`,
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            </BlurFade>

            {/* Audit Status — big card */}
            <BlurFade delay={300} duration={500}>
              <div
                className={`h-full rounded-2xl border-2 p-7 flex flex-col items-center justify-center text-center ${audit.bg}`}
                style={{
                  boxShadow: auditStatus === "ready"
                    ? "0 0 30px rgba(34,197,94,0.08), inset 0 1px 0 rgba(255,255,255,0.05)"
                    : "inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                {audit.icon}
                <span className={`text-3xl font-black tracking-wide mt-4 ${audit.color}`}>{audit.label}</span>
                <div className="mt-6 space-y-2 w-full">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Last Audit</span>
                    <span className="text-text-secondary font-mono">{formatDate(lastAudit)}</span>
                  </div>
                  <div className="w-full h-px bg-white/10" />
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Next Audit</span>
                    <span className="text-text-secondary font-mono">{formatDate(nextAudit)}</span>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* COMPLIANCE DEADLINES */}
        <section className="flex-[3.5] min-h-0 flex flex-col">
          <BlurFade delay={500} duration={500}>
            <SectionLabel>Compliance Deadlines</SectionLabel>
          </BlurFade>
          <div className="flex-1 flex flex-col gap-3">
            {deadlines.map((deadline, i) => (
              <BlurFade key={deadline.id} delay={550 + i * 80} duration={400}>
                <DeadlineRow deadline={deadline} />
              </BlurFade>
            ))}
          </div>
        </section>

        {/* REGULATORY ALERTS */}
        <section className="flex-[2.5] min-h-0 flex flex-col">
          <BlurFade delay={800} duration={500}>
            <SectionLabel>Regulatory Alerts</SectionLabel>
          </BlurFade>
          <div className="flex-1 flex flex-col gap-3">
            {alerts.map((alert, i) => (
              <BlurFade key={alert.id} delay={850 + i * 100} duration={400}>
                <RegAlertRow alert={alert} />
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

function EmissionCard({ icon, label, value, unit, color }: {
  icon: React.ReactNode; label: string; value: number; unit: string; color: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-5 flex flex-col justify-between"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}>
      <div className="flex items-center gap-2">
        <span style={{ color, opacity: 0.6 }}>{icon}</span>
        <p className="text-xs text-text-muted uppercase tracking-wider">{label}</p>
      </div>
      <div className="flex items-baseline gap-2 mt-2">
        <span className="text-4xl font-bold font-mono leading-none" style={{ color }}>{value}</span>
        <span className="text-sm text-text-muted">{unit}</span>
      </div>
    </div>
  );
}

function DeadlineRow({ deadline }: { deadline: ComplianceDeadline }) {
  const config = DEADLINE_CONFIG[deadline.status];

  return (
    <div
      className={`flex-1 rounded-xl border px-6 py-4 flex items-center gap-5 ${
        deadline.status === "at-risk" ? "border-yellow-500/30 bg-yellow-500/5"
        : deadline.status === "overdue" ? "border-red-500/30 bg-red-500/5"
        : deadline.status === "submitted" ? "border-accent-primary/20 bg-accent-primary/5"
        : "border-white/10 bg-white/[0.02]"
      }`}
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}
    >
      {config.icon}
      <div className="flex-1 min-w-0">
        <p className="text-base font-semibold text-text-primary">{deadline.title}</p>
        <p className="text-xs text-text-muted mt-0.5">{deadline.agency}</p>
      </div>
      <span className={`text-xs font-bold ${config.color}`}>{config.label}</span>
      <span className="text-sm text-text-muted font-mono">{formatDate(deadline.dueDate)}</span>
    </div>
  );
}

function RegAlertRow({ alert }: { alert: RegulatoryAlert }) {
  const isWarning = alert.severity === "warning";
  const isCritical = alert.severity === "critical";

  return (
    <div
      className={`flex-1 rounded-xl border px-6 py-4 flex items-center gap-4 ${
        isCritical ? "border-red-500/30 bg-red-500/5"
        : isWarning ? "border-yellow-500/30 bg-yellow-500/5"
        : "border-white/10 bg-white/[0.02]"
      }`}
    >
      {isCritical ? <AlertTriangle className="w-5 h-5 text-red-400" /> :
       isWarning ? <AlertTriangle className="w-5 h-5 text-yellow-400" /> :
       <Calendar className="w-5 h-5 text-blue-400" />}
      <p className="flex-1 text-base text-text-primary">{alert.message}</p>
      <span className="text-xs text-text-muted font-mono">{getTimeAgo(alert.date)}</span>
    </div>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getTimeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
