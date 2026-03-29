"use client";

import type { ScreenTemplate, TemplateProps } from "@/types/facility";
import { TEMPLATE_REGISTRY } from "@/lib/facility/constants";
import { EngineRoom } from "./templates/EngineRoom";
import { EngineRoomVisual } from "./templates/EngineRoomVisual";
import { PowerPlatform } from "./templates/PowerPlatform";
import { GridInterconnection } from "./templates/GridInterconnection";
import { EnergyFlow } from "./templates/EnergyFlow";
import { CampusHealth } from "./templates/CampusHealth";
import { OperationsMaintenance } from "./templates/OperationsMaintenance";
import { PowerMarket } from "./templates/PowerMarket";
import { RevenueMargin } from "./templates/RevenueMargin";
import { ESGCompliance } from "./templates/ESGCompliance";
import { SecurityCommand } from "./templates/SecurityCommand";
import { AccessPersonnel } from "./templates/AccessPersonnel";
import { ExternalIntel } from "./templates/ExternalIntel";

interface TemplateRouterProps {
  template: ScreenTemplate;
  params: Record<string, string>;
  refreshIntervalMs: number;
  screenId: string;
}

/**
 * Maps a ScreenTemplate name to the corresponding React component.
 * Initially renders placeholder cards — real templates are added in Phases 3-5.
 */
export function TemplateRouter({
  template,
  params,
  refreshIntervalMs,
  screenId,
}: TemplateRouterProps) {
  const templateProps: TemplateProps = {
    params,
    refreshIntervalMs,
    screenId,
  };

  // Route to real templates where implemented, placeholder for the rest.
  switch (template) {
    case "engine-room":
      return <EngineRoom {...templateProps} />;
    case "engine-room-visual":
      return <EngineRoomVisual {...templateProps} />;
    case "power-platform":
      return <PowerPlatform {...templateProps} />;
    case "grid-interconnection":
      return <GridInterconnection {...templateProps} />;
    case "energy-flow":
      return <EnergyFlow {...templateProps} />;
    case "campus-health":
      return <CampusHealth {...templateProps} />;
    case "operations-maintenance":
      return <OperationsMaintenance {...templateProps} />;
    case "power-market":
      return <PowerMarket {...templateProps} />;
    case "revenue-margin":
      return <RevenueMargin {...templateProps} />;
    case "esg-compliance":
      return <ESGCompliance {...templateProps} />;
    case "security-command":
      return <SecurityCommand {...templateProps} />;
    case "access-personnel":
      return <AccessPersonnel {...templateProps} />;
    case "external-intel":
      return <ExternalIntel {...templateProps} />;
    default:
      return <TemplatePlaceholder template={template} {...templateProps} />;
  }
}

// ============================================
// Placeholder (replaced as templates are built)
// ============================================

function TemplatePlaceholder({
  template,
  screenId,
}: TemplateProps & { template: ScreenTemplate }) {
  const meta = TEMPLATE_REGISTRY[template];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-8 p-12">
      {/* Template icon area */}
      <div className="w-32 h-32 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
        <span className="text-5xl text-accent-teal opacity-60">
          {meta?.icon?.charAt(0) || "?"}
        </span>
      </div>

      {/* Template name */}
      <div className="text-center space-y-3">
        <h1 className="text-5xl font-bold text-text-primary tracking-tight">
          {meta?.label || template}
        </h1>
        <p className="text-xl text-text-secondary max-w-lg">
          {meta?.description}
        </p>
      </div>

      {/* Screen info */}
      <div className="flex gap-4 mt-4">
        <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
          <span className="text-text-muted text-sm">Screen</span>
          <p className="text-text-primary font-mono text-lg">{screenId}</p>
        </div>
        <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
          <span className="text-text-muted text-sm">Template</span>
          <p className="text-accent-teal font-mono text-lg">{template}</p>
        </div>
        <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
          <span className="text-text-muted text-sm">Category</span>
          <p className="text-text-primary font-mono text-lg">{meta?.category}</p>
        </div>
      </div>

      {/* Awaiting implementation notice */}
      <div className="mt-8 px-6 py-3 rounded-full bg-accent-teal/10 border border-accent-teal/20">
        <p className="text-accent-teal text-sm font-medium">
          Template ready for implementation
        </p>
      </div>
    </div>
  );
}
