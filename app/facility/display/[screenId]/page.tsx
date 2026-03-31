"use client";

import { use, useState, useEffect, useRef, useCallback } from "react";
import { Suspense } from "react";
import { useScreenConfig } from "@/hooks/facility/useScreenConfig";
import { useScreenHeartbeat } from "@/hooks/facility/useScreenHeartbeat";
import { TemplateRouter } from "@/components/facility/TemplateRouter";
import { ScreenDebugOverlay } from "@/components/facility/ScreenDebugOverlay";
import type { ScreenTemplate } from "@/types/facility";
import { DEFAULT_REFRESH_INTERVAL } from "@/lib/facility/constants";

interface FacilityDisplayPageProps {
  params: Promise<{ screenId: string }>;
}

export default function FacilityDisplayPage({ params }: FacilityDisplayPageProps) {
  const { screenId } = use(params);

  return (
    <Suspense fallback={<LoadingScreen screenId={screenId} />}>
      <DisplayContent screenId={screenId} />
    </Suspense>
  );
}

function DisplayContent({ screenId }: { screenId: string }) {
  const { config, isLoading, error, isConnected } = useScreenConfig(screenId);
  const [activeTemplate, setActiveTemplate] = useState<ScreenTemplate | null>(null);
  const rotateIndexRef = useRef(0);
  const rotateTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Determine the active template (handles auto-rotate)
  const updateActiveTemplate = useCallback(() => {
    if (!config) return;

    if (config.autoRotate?.enabled && config.autoRotate.templates.length > 0) {
      const templates = config.autoRotate.templates;
      const index = rotateIndexRef.current % templates.length;
      setActiveTemplate(templates[index]);
    } else {
      setActiveTemplate(config.template);
    }
  }, [config]);

  // Set template when config loads or changes
  useEffect(() => {
    updateActiveTemplate();
    // Reset rotation index when config changes
    rotateIndexRef.current = 0;
  }, [config, updateActiveTemplate]);

  // Auto-rotate timer
  useEffect(() => {
    if (!config?.autoRotate?.enabled || !config.autoRotate.templates.length) {
      if (rotateTimerRef.current) {
        clearInterval(rotateTimerRef.current);
        rotateTimerRef.current = null;
      }
      return;
    }

    const intervalMs = config.autoRotate.intervalMs || 30000;

    rotateTimerRef.current = setInterval(() => {
      rotateIndexRef.current++;
      updateActiveTemplate();
    }, intervalMs);

    return () => {
      if (rotateTimerRef.current) {
        clearInterval(rotateTimerRef.current);
      }
    };
  }, [config?.autoRotate, updateActiveTemplate]);

  // Send heartbeats
  useScreenHeartbeat(screenId, activeTemplate, error);

  // Loading state
  if (isLoading && !config) {
    return <LoadingScreen screenId={screenId} />;
  }

  // Error state with no config (backend unreachable on first load)
  if (!config && error) {
    return <ErrorScreen screenId={screenId} error={error} />;
  }

  // No config returned (screen not registered in backend yet)
  if (!config) {
    return <UnregisteredScreen screenId={screenId} />;
  }

  return (
    <div className="h-full w-full relative">
      {activeTemplate && (
        <TemplateRouter
          template={activeTemplate}
          params={config.params}
          refreshIntervalMs={config.refreshIntervalMs || DEFAULT_REFRESH_INTERVAL}
          screenId={screenId}
        />
      )}

      <Suspense fallback={null}>
        <ScreenDebugOverlay
          screenId={screenId}
          config={config}
          isConnected={isConnected}
          isLoading={isLoading}
          error={error}
        />
      </Suspense>
    </div>
  );
}

// ============================================
// State Screens
// ============================================

function LoadingScreen({ screenId }: { screenId: string }) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-6">
      <div className="w-16 h-16 border-4 border-accent-teal/30 border-t-accent-teal rounded-full animate-spin" />
      <div className="text-center">
        <p className="text-text-primary text-2xl font-semibold">Connecting...</p>
        <p className="text-text-muted text-lg mt-2">Screen {screenId}</p>
      </div>
    </div>
  );
}

function ErrorScreen({ screenId, error }: { screenId: string; error: string }) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-6 p-12">
      <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
        <span className="text-red-400 text-4xl">!</span>
      </div>
      <div className="text-center space-y-2">
        <p className="text-text-primary text-3xl font-semibold">Connection Error</p>
        <p className="text-text-muted text-lg">Screen {screenId}</p>
        <p className="text-red-400 text-sm mt-4 max-w-md">{error}</p>
      </div>
      <p className="text-text-muted text-sm mt-8">
        Retrying automatically...
      </p>
    </div>
  );
}

function UnregisteredScreen({ screenId }: { screenId: string }) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-6 p-12">
      <div className="w-20 h-20 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center">
        <span className="text-yellow-400 text-4xl">?</span>
      </div>
      <div className="text-center space-y-2">
        <p className="text-text-primary text-3xl font-semibold">Screen Not Configured</p>
        <p className="text-text-muted text-lg font-mono">{screenId}</p>
        <p className="text-text-secondary text-sm mt-4 max-w-md">
          This screen has not been assigned a template yet.
          Use the controller to configure it.
        </p>
      </div>
    </div>
  );
}
