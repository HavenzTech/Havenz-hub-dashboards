"use client";

import { TemplateShell } from "./TemplateShell";
import { BlurFade } from "@/components/ui/BlurFade";
import type { TemplateProps } from "@/types/facility";
import {
  UserCheck,
  Users,
  DoorOpen,
  ShieldAlert,
  ScanFace,
  CreditCard,
  KeyRound,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  accessPersonnelData,
  DOOR_STATUS_CONFIG,
  type PersonnelOnSite,
  type DoorStatus,
} from "@/lib/facility/mock-data";

const METHOD_ICONS: Record<string, React.ReactNode> = {
  "facial-recognition": <ScanFace className="w-4 h-4 text-accent-primary" />,
  badge: <CreditCard className="w-4 h-4 text-accent-secondary" />,
  pin: <KeyRound className="w-4 h-4 text-yellow-400" />,
};

/**
 * SCREEN 12 — ACCESS CONTROL + PERSONNEL
 *
 * Layout:
 * 1. Stats bar (~8%)
 * 2. Personnel on site + Door status side-by-side (~42%)
 * 3. Access log feed (~45%)
 */
export function AccessPersonnel({ screenId }: TemplateProps) {
  const { personnelOnSite, recentAccess, doors, stats } = accessPersonnelData;

  return (
    <TemplateShell template="access-personnel" screenId={screenId}>
      <div className="h-full flex flex-col gap-5 p-8">

        {/* STATS BAR */}
        <BlurFade delay={0} duration={500}>
          <div className="flex items-center justify-between px-8 py-5 rounded-2xl border border-white/10 bg-white/[0.02]"
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}>
            <StatBlock icon={<Users className="w-6 h-6 text-accent-primary" />} label="On Site" value={stats.totalOnSite.toString()} color="text-accent-primary" />
            <div className="w-px h-12 bg-white/10" />
            <StatBlock icon={<UserCheck className="w-6 h-6 text-green-400" />} label="Entries Today" value={stats.entriestoday.toString()} color="text-green-400" />
            <div className="w-px h-12 bg-white/10" />
            <StatBlock icon={<ShieldAlert className="w-6 h-6 text-red-400" />} label="Denied Today" value={stats.deniedToday.toString()} color={stats.deniedToday > 0 ? "text-red-400" : "text-green-400"} />
            <div className="w-px h-12 bg-white/10" />
            <StatBlock icon={<DoorOpen className="w-6 h-6 text-yellow-400" />} label="Doors Unlocked" value={`${stats.doorsUnlocked}/${stats.doorsTotal}`} color={stats.doorsUnlocked > 0 ? "text-yellow-400" : "text-green-400"} />
          </div>
        </BlurFade>

        {/* PERSONNEL + DOORS — side by side */}
        <section className="flex-[4.2] min-h-0 grid grid-cols-2 gap-4">
          {/* Personnel on site */}
          <BlurFade delay={200} duration={500}>
            <div className="h-full rounded-xl border border-white/10 bg-white/[0.02] p-5 flex flex-col"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}>
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-4 h-4 text-accent-primary/60" />
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent-primary/70">Personnel On Site</p>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                {personnelOnSite.map((person) => (
                  <PersonRow key={person.id} person={person} />
                ))}
              </div>
            </div>
          </BlurFade>

          {/* Door status */}
          <BlurFade delay={300} duration={500}>
            <div className="h-full rounded-xl border border-white/10 bg-white/[0.02] p-5 flex flex-col"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}>
              <div className="flex items-center gap-2 mb-4">
                <DoorOpen className="w-4 h-4 text-accent-primary/60" />
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent-primary/70">Door Status</p>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                {doors.map((door) => (
                  <DoorRow key={door.id} door={door} />
                ))}
              </div>
            </div>
          </BlurFade>
        </section>

        {/* ACCESS LOG FEED */}
        <section className="flex-[4.5] min-h-0 flex flex-col">
          <BlurFade delay={500} duration={500}>
            <div className="flex items-center gap-3 mb-3">
              <ScanFace className="w-4 h-4 text-accent-primary/60" />
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent-primary/70">Live Access Feed</h2>
            </div>
          </BlurFade>
          <div className="flex-1 flex flex-col gap-2">
            {recentAccess.map((entry, i) => (
              <BlurFade key={i} delay={550 + i * 80} duration={400}>
                <AccessRow entry={entry} />
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

function StatBlock({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <p className="text-xs text-text-muted uppercase tracking-wider">{label}</p>
        <p className={`text-3xl font-bold font-mono ${color}`}>{value}</p>
      </div>
    </div>
  );
}

function PersonRow({ person }: { person: PersonnelOnSite }) {
  const entryTime = new Date(person.entryTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  const methodIcon = METHOD_ICONS[person.method];

  return (
    <div className="flex items-center gap-4 py-2 border-b border-white/5 last:border-0">
      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-bold text-text-primary flex-shrink-0">
        {person.name.split(" ").map(n => n[0]).join("")}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-primary">{person.name}</p>
        <p className="text-xs text-text-muted">{person.role}</p>
      </div>
      <span className="text-xs text-text-muted px-2 py-0.5 rounded bg-white/5">{person.zone}</span>
      {methodIcon}
      <span className="text-xs text-text-muted font-mono">{entryTime}</span>
    </div>
  );
}

function DoorRow({ door }: { door: DoorStatus }) {
  const config = DOOR_STATUS_CONFIG[door.status];
  const lastTime = getTimeAgo(door.lastAccess);

  return (
    <div className="flex items-center gap-4 py-2 border-b border-white/5 last:border-0">
      <div
        className={`w-3 h-3 rounded-full ${config.dotColor} flex-shrink-0`}
        style={{ boxShadow: `0 0 6px ${door.status === "locked" ? "rgba(34,197,94,0.4)" : door.status === "forced" ? "rgba(239,68,68,0.5)" : "rgba(245,158,11,0.4)"}` }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary">{door.name}</p>
        <p className="text-[10px] text-text-muted">{door.zone}</p>
      </div>
      <span className={`text-xs font-black ${config.color}`}>{config.label}</span>
      <span className="text-[10px] text-text-muted font-mono">{lastTime}</span>
    </div>
  );
}

function AccessRow({ entry }: { entry: { time: string; name: string; action: string; granted: boolean } }) {
  const timeStr = new Date(entry.time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

  return (
    <div className={`flex-1 rounded-xl border px-5 py-3 flex items-center gap-4 ${
      entry.granted ? "border-white/10 bg-white/[0.02]" : "border-red-500/30 bg-red-500/5"
    }`}>
      {entry.granted ? (
        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
      ) : (
        <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${entry.granted ? "text-text-primary" : "text-red-300"}`}>{entry.action}</p>
      </div>
      <span className={`text-sm font-semibold ${entry.granted ? "text-text-secondary" : "text-red-400"}`}>{entry.name}</span>
      <div className="flex items-center gap-1.5 text-text-muted flex-shrink-0">
        <Clock className="w-3.5 h-3.5" />
        <span className="text-xs font-mono">{timeStr}</span>
      </div>
    </div>
  );
}

function getTimeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
