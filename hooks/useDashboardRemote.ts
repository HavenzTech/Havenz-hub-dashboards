"use client";

import { useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

// Channel name for dashboard communication
const DASHBOARD_CHANNEL = "havenz-dashboard-remote";

// Message types
export type DashboardMessage =
  | { type: "navigate"; path: string }
  | { type: "voice-indicator"; action: "show" | "hide" }
  | { type: "refresh" }
  | { type: "ping" }
  | { type: "pong"; windowId: string };

interface UseDashboardRemoteOptions {
  /** If true, this window will listen for and respond to navigation commands */
  isDisplay?: boolean;
  /** Callback when a message is received */
  onMessage?: (message: DashboardMessage) => void;
}

/**
 * Hook for cross-window communication between controller (demo) and display (dashboard)
 *
 * Usage:
 * - On demo/controller page: const { sendNavigation, sendVoiceIndicator } = useDashboardRemote();
 * - On display page: useDashboardRemote({ isDisplay: true });
 */
export function useDashboardRemote(options: UseDashboardRemoteOptions = {}) {
  const { isDisplay = false, onMessage } = options;
  const router = useRouter();
  const channelRef = useRef<BroadcastChannel | null>(null);
  const windowIdRef = useRef<string>(Math.random().toString(36).substring(7));

  // Initialize channel
  useEffect(() => {
    // BroadcastChannel is not available in SSR
    if (typeof window === "undefined") return;

    channelRef.current = new BroadcastChannel(DASHBOARD_CHANNEL);

    const handleMessage = (event: MessageEvent<DashboardMessage>) => {
      const message = event.data;

      // Call custom handler if provided
      onMessage?.(message);

      // Handle navigation if this is a display window
      if (isDisplay) {
        switch (message.type) {
          case "navigate":
            console.log("[Dashboard Display] Navigating to:", message.path);
            router.push(message.path);
            break;
          case "refresh":
            console.log("[Dashboard Display] Refreshing...");
            router.refresh();
            break;
          case "ping":
            // Respond to ping with pong
            channelRef.current?.postMessage({
              type: "pong",
              windowId: windowIdRef.current,
            } as DashboardMessage);
            break;
        }
      }
    };

    channelRef.current.addEventListener("message", handleMessage);

    return () => {
      channelRef.current?.removeEventListener("message", handleMessage);
      channelRef.current?.close();
    };
  }, [isDisplay, router, onMessage]);

  // Send navigation command to display window
  const sendNavigation = useCallback((path: string) => {
    console.log("[Dashboard Remote] Sending navigation:", path);
    channelRef.current?.postMessage({
      type: "navigate",
      path,
    } as DashboardMessage);
  }, []);

  // Send voice indicator command
  const sendVoiceIndicator = useCallback((action: "show" | "hide") => {
    console.log("[Dashboard Remote] Sending voice indicator:", action);
    channelRef.current?.postMessage({
      type: "voice-indicator",
      action,
    } as DashboardMessage);
  }, []);

  // Send refresh command
  const sendRefresh = useCallback(() => {
    console.log("[Dashboard Remote] Sending refresh");
    channelRef.current?.postMessage({
      type: "refresh",
    } as DashboardMessage);
  }, []);

  // Ping to check if display window is connected
  const pingDisplay = useCallback(() => {
    channelRef.current?.postMessage({
      type: "ping",
    } as DashboardMessage);
  }, []);

  return {
    sendNavigation,
    sendVoiceIndicator,
    sendRefresh,
    pingDisplay,
    windowId: windowIdRef.current,
  };
}
