"use client";

import { TemplateShell } from "./TemplateShell";
import { BlurFade } from "@/components/ui/BlurFade";
import type { TemplateProps } from "@/types/facility";
import {
  Users,
  Calendar,
  ClipboardList,
  Package,
  AlertTriangle,
  CircleAlert,
  Info,
  CheckCircle2,
  Clock,
  Wrench,
  BrainCircuit,
} from "lucide-react";
import {
  operationsMaintenanceData,
  TASK_PRIORITY_CONFIG,
  TASK_STATUS_CONFIG,
  TECH_STATUS_CONFIG,
  ALERT_SEVERITY_CONFIG,
  type MockTask,
  type MockTechnician,
  type MockSparePart,
  type MockAlert,
} from "@/lib/facility/mock-data";

/**
 * SCREEN 7 — OPERATIONS + MAINTENANCE
 *
 * Layout (portrait):
 * 1. Staff + Zones hero bar (~8%)
 * 2. Task Tracker (~35%)
 * 3. Maintenance Windows + Spare Parts side-by-side (~27%)
 * 4. System Alerts (~25%)
 */
export function OperationsMaintenance({ screenId }: TemplateProps) {
  const { staff, tasks, maintenanceWindows, spareParts, alerts } = operationsMaintenanceData;

  const overdueTasks = tasks.filter(t => t.status === "overdue");
  const activeTasks = tasks.filter(t => (t.status as string) !== "completed");
  const unresolvedAlerts = alerts.filter(a => !a.resolved);

  return (
    <TemplateShell template="operations-maintenance" screenId={screenId}>
      <div className="h-full flex flex-col gap-5 p-8">

        {/* ── STAFF HERO BAR ── */}
        <BlurFade delay={0} duration={500}>
          <div
            className="flex items-center justify-between px-8 py-5 rounded-2xl border border-white/10 bg-white/[0.02]"
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
          >
            {/* Technicians on site */}
            <div className="flex items-center gap-4">
              <Users className="w-6 h-6 text-accent-primary/60" />
              <div>
                <p className="text-3xl font-bold font-mono text-text-primary">
                  {staff.technicians.filter(t => t.status === "on-site").length}
                  <span className="text-lg text-text-muted">/{staff.technicians.length}</span>
                </p>
                <p className="text-xs text-text-muted">Technicians On Site</p>
              </div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            {/* Zones active */}
            <div className="text-center">
              <p className="text-3xl font-bold font-mono text-accent-secondary">
                {staff.zonesActive}<span className="text-lg text-text-muted">/{staff.totalZones}</span>
              </p>
              <p className="text-xs text-text-muted">Zones Active</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            {/* Overdue count */}
            <div className="text-center">
              <p className={`text-3xl font-bold font-mono ${overdueTasks.length > 0 ? "text-red-400" : "text-green-400"}`}>
                {overdueTasks.length}
              </p>
              <p className="text-xs text-text-muted">Overdue Tasks</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            {/* Unresolved alerts */}
            <div className="text-center">
              <p className={`text-3xl font-bold font-mono ${unresolvedAlerts.length > 0 ? "text-yellow-400" : "text-green-400"}`}>
                {unresolvedAlerts.length}
              </p>
              <p className="text-xs text-text-muted">Active Alerts</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            {/* Staff list */}
            <div className="flex gap-3">
              {staff.technicians.map((tech) => (
                <TechBadge key={tech.id} tech={tech} />
              ))}
            </div>
          </div>
        </BlurFade>

        {/* ── TASK TRACKER ── */}
        <section className="flex-[3.5] min-h-0 flex flex-col">
          <BlurFade delay={200} duration={500}>
            <div className="flex items-center gap-3 mb-3">
              <ClipboardList className="w-4 h-4 text-accent-primary/60" />
              <SectionLabel>Task Tracker</SectionLabel>
              <span className="text-xs text-text-muted font-mono">{activeTasks.length} active</span>
            </div>
          </BlurFade>
          <div className="flex-1 flex flex-col gap-2">
            {activeTasks.map((task, i) => (
              <BlurFade key={task.id} delay={250 + i * 70} duration={400}>
                <TaskRow task={task} />
              </BlurFade>
            ))}
          </div>
        </section>

        {/* ── MAINTENANCE + SPARE PARTS (side by side) ── */}
        <section className="flex-[2.5] min-h-0 grid grid-cols-2 gap-4">
          {/* Maintenance windows */}
          <BlurFade delay={700} duration={500}>
            <div
              className="h-full rounded-xl border border-white/10 bg-white/[0.02] p-5 flex flex-col"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-accent-primary/60" />
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent-primary/70">Upcoming Maintenance</p>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                {maintenanceWindows.map((mw) => (
                  <div key={mw.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-3">
                      {mw.type === "predictive" ? (
                        <BrainCircuit className="w-4 h-4 text-purple-400/60" />
                      ) : (
                        <Wrench className="w-4 h-4 text-text-muted/40" />
                      )}
                      <div>
                        <p className="text-sm text-text-primary font-medium">{mw.label}</p>
                        {mw.type === "predictive" && (
                          <span className="text-[10px] text-purple-400 font-medium">AI PREDICTED</span>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-text-muted font-mono">{mw.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </BlurFade>

          {/* Spare parts */}
          <BlurFade delay={800} duration={500}>
            <div
              className="h-full rounded-xl border border-white/10 bg-white/[0.02] p-5 flex flex-col"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-4 h-4 text-accent-primary/60" />
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent-primary/70">Spare Parts</p>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                {spareParts.map((part) => (
                  <SparePartRow key={part.name} part={part} />
                ))}
              </div>
            </div>
          </BlurFade>
        </section>

        {/* ── SYSTEM ALERTS ── */}
        <section className="flex-[2] min-h-0 flex flex-col">
          <BlurFade delay={1000} duration={500}>
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-4 h-4 text-accent-primary/60" />
              <SectionLabel>System Alerts</SectionLabel>
            </div>
          </BlurFade>
          <div className="flex-1 flex flex-col gap-2">
            {alerts.map((alert, i) => (
              <BlurFade key={alert.id} delay={1050 + i * 70} duration={400}>
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
// Sub-components
// ============================================

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-accent-primary/70">{children}</h2>
  );
}

function TechBadge({ tech }: { tech: MockTechnician }) {
  const config = TECH_STATUS_CONFIG[tech.status];
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-bold text-text-primary">
        {tech.name.split(" ").map(n => n[0]).join("")}
      </div>
      <div
        className={`w-2 h-2 rounded-full ${config.dotColor}`}
        style={{ boxShadow: tech.status === "on-site" ? "0 0 4px rgba(34,197,94,0.5)" : "none" }}
      />
    </div>
  );
}

function TaskRow({ task }: { task: MockTask }) {
  const priority = TASK_PRIORITY_CONFIG[task.priority];
  const status = TASK_STATUS_CONFIG[task.status];
  const isOverdue = task.status === "overdue";

  return (
    <div
      className={`flex-1 rounded-lg border px-5 py-3 flex items-center gap-4 ${
        isOverdue ? "border-red-500/30 bg-red-500/5" : "border-white/10 bg-white/[0.02]"
      }`}
      style={{
        boxShadow: isOverdue ? "0 0 12px rgba(239,68,68,0.05)" : "inset 0 1px 0 rgba(255,255,255,0.02)",
      }}
    >
      {/* Priority badge */}
      <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${priority.bgColor} ${priority.color}`}>
        {priority.label}
      </span>

      {/* Task info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-primary truncate">{task.title}</p>
        <p className="text-xs text-text-muted">{task.assignee} • {task.zone}</p>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2">
        {isOverdue ? <Clock className="w-4 h-4 text-red-400" /> :
         task.status === "in-progress" ? <Clock className="w-4 h-4 text-accent-primary animate-pulse" /> : null}
        <span className={`text-xs font-bold ${status.color}`}>{status.label}</span>
      </div>

      {/* Due date */}
      <span className={`text-xs font-mono ${isOverdue ? "text-red-400" : "text-text-muted"}`}>
        {formatDate(task.dueDate)}
      </span>
    </div>
  );
}

function SparePartRow({ part }: { part: MockSparePart }) {
  const isCritical = part.status === "critical";
  const isLow = part.status === "low";
  const barColor = isCritical ? "#ef4444" : isLow ? "#f59e0b" : "#00d4aa";
  const barWidth = Math.min((part.inStock / (part.minRequired * 3)) * 100, 100);

  return (
    <div className="flex items-center gap-3 py-1.5 border-b border-white/5 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm text-text-primary font-medium truncate">{part.name}</p>
      </div>
      <div className="w-24">
        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${barWidth}%`, backgroundColor: barColor, boxShadow: `0 0 4px ${barColor}55` }} />
        </div>
      </div>
      <span className={`text-sm font-mono w-12 text-right font-bold ${isCritical ? "text-red-400" : isLow ? "text-yellow-400" : "text-text-secondary"}`}>
        {part.inStock}
      </span>
    </div>
  );
}

function AlertRow({ alert }: { alert: MockAlert }) {
  const config = ALERT_SEVERITY_CONFIG[alert.severity];
  const AlertIcon = alert.severity === "critical" ? CircleAlert : alert.severity === "warning" ? AlertTriangle : Info;
  const timeAgo = getTimeAgo(alert.timestamp);

  return (
    <div
      className={`flex-1 rounded-lg border px-5 py-3 flex items-center gap-4 ${
        alert.resolved ? "border-white/5 bg-white/[0.01] opacity-50" : `${config.bgColor}`
      }`}
    >
      {alert.resolved ? (
        <CheckCircle2 className="w-5 h-5 text-green-400/50 flex-shrink-0" />
      ) : (
        <AlertIcon className={`w-5 h-5 flex-shrink-0 ${config.color}`} />
      )}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${alert.resolved ? "text-text-muted" : "text-text-primary"}`}>{alert.message}</p>
      </div>
      <span className="text-xs text-text-muted">{alert.source}</span>
      <span className="text-xs text-text-muted font-mono">{timeAgo}</span>
    </div>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function getTimeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}
