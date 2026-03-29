"use client";

import { useSearchParams } from "next/navigation";
import type { ScreenConfig } from "@/types/facility";

interface ScreenDebugOverlayProps {
  screenId: string;
  config: ScreenConfig | null;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Debug overlay shown when ?debug=true is in the URL.
 * Displays screen ID, current config, connection status, and errors.
 * Hidden in production — useful during screen setup.
 */
export function ScreenDebugOverlay({
  screenId,
  config,
  isConnected,
  isLoading,
  error,
}: ScreenDebugOverlayProps) {
  const searchParams = useSearchParams();
  const showDebug = searchParams.get("debug") === "true";

  if (!showDebug) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-80 bg-black/90 border border-white/20 rounded-xl p-4 font-mono text-xs space-y-2 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <span className="text-text-muted uppercase tracking-wider">Debug</span>
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isConnected ? "bg-green-500" : error ? "bg-red-500" : "bg-yellow-500"
            }`}
          />
          <span className="text-text-secondary">
            {isConnected ? "Connected" : isLoading ? "Connecting..." : "Disconnected"}
          </span>
        </div>
      </div>

      <div className="border-t border-white/10 pt-2 space-y-1">
        <Row label="Screen ID" value={screenId} />
        <Row label="Template" value={config?.template || "—"} highlight />
        <Row label="Label" value={config?.label || "—"} />
        <Row label="Refresh" value={config ? `${config.refreshIntervalMs / 1000}s` : "—"} />
        <Row
          label="Auto-rotate"
          value={config?.autoRotate?.enabled ? `ON (${config.autoRotate.intervalMs / 1000}s)` : "OFF"}
        />
        <Row label="Updated" value={config?.updatedAt ? new Date(config.updatedAt).toLocaleTimeString() : "—"} />
      </div>

      {config?.params && Object.keys(config.params).length > 0 && (
        <div className="border-t border-white/10 pt-2">
          <span className="text-text-muted">Params:</span>
          {Object.entries(config.params).map(([key, value]) => (
            <Row key={key} label={key} value={value} />
          ))}
        </div>
      )}

      {error && (
        <div className="border-t border-red-500/30 pt-2">
          <span className="text-red-400">{error}</span>
        </div>
      )}
    </div>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-text-muted">{label}</span>
      <span className={highlight ? "text-accent-teal" : "text-text-primary"}>
        {value}
      </span>
    </div>
  );
}
