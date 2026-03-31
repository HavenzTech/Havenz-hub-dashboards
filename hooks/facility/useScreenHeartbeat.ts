"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/providers";
import { facilityApi } from "@/lib/facility/api";
import type { ScreenTemplate, ScreenHeartbeat } from "@/types/facility";
import { HEARTBEAT_INTERVAL } from "@/lib/facility/constants";

/**
 * Sends periodic heartbeats to the backend reporting this screen's status.
 */
export function useScreenHeartbeat(
  screenId: string,
  currentTemplate: ScreenTemplate | null,
  error?: string | null
) {
  const { isAuthenticated } = useAuth();
  const currentTemplateRef = useRef(currentTemplate);
  const errorRef = useRef(error);

  useEffect(() => {
    currentTemplateRef.current = currentTemplate;
  }, [currentTemplate]);

  useEffect(() => {
    errorRef.current = error;
  }, [error]);

  useEffect(() => {
    if (!isAuthenticated || !screenId) return;

    const sendHeartbeat = async () => {
      try {
        const heartbeat: ScreenHeartbeat = {
          screenId,
          currentTemplate: currentTemplateRef.current || "facility-overview",
          online: true,
          error: errorRef.current || undefined,
          timestamp: new Date().toISOString(),
        };

        await facilityApi.sendHeartbeat(screenId, heartbeat);
      } catch (err) {
        // Heartbeat failures are non-critical
        console.warn(`[Screen ${screenId}] Heartbeat failed:`, err);
      }
    };

    sendHeartbeat();
    const interval = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL);
    return () => clearInterval(interval);
  }, [isAuthenticated, screenId]);
}
