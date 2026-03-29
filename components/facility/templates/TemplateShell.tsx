"use client";

import { useCurrentTime } from "@/hooks/useCurrentTime";
import DarkVeil from "@/components/DarkVeil";
import type { ScreenTemplate } from "@/types/facility";
import { TEMPLATE_REGISTRY } from "@/lib/facility/constants";

interface TemplateShellProps {
  template: ScreenTemplate;
  screenId: string;
  children: React.ReactNode;
}

/**
 * Shared wrapper for all facility display templates.
 * Provides the animated background, consistent header bar, and screen identity.
 */
export function TemplateShell({ template, screenId, children }: TemplateShellProps) {
  const { formattedTime, formattedDate } = useCurrentTime();
  const meta = TEMPLATE_REGISTRY[template];

  return (
    <div className="h-full w-full relative bg-brand-background">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <DarkVeil speed={0.8} hueShift={40} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header bar */}
        <div
          className="flex-shrink-0 flex items-center justify-between px-8 py-4 border-b border-white/10"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)",
            boxShadow: "0 1px 0 rgba(255,255,255,0.03)",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-1 h-8 rounded-full bg-accent-primary" />
            <h1 className="text-2xl font-bold text-text-primary tracking-tight">
              {meta?.label || template}
            </h1>
            <span className="text-xs text-text-muted font-mono px-2 py-1 rounded-md bg-white/5 border border-white/10">
              {screenId}
            </span>
          </div>
          <div className="flex items-center gap-6 text-right">
            <div>
              <p className="text-xl font-mono text-text-primary tabular-nums">{formattedTime}</p>
              <p className="text-xs text-text-muted">{formattedDate}</p>
            </div>
            {/* Live indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <div
                className="w-2 h-2 rounded-full bg-green-500"
                style={{ boxShadow: "0 0 6px rgba(34, 197, 94, 0.5)", animation: "pulse 2s ease-in-out infinite" }}
              />
              <span className="text-xs text-green-400 font-medium">LIVE</span>
            </div>
          </div>
        </div>

        {/* Template content */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
