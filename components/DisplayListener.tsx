"use client";

import { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { useDashboardRemote, type DashboardMessage } from "@/hooks/useDashboardRemote";
import { useVoiceIndicator } from "@/providers";

/**
 * Component that listens for remote control commands from the demo/controller page.
 *
 * Activation:
 * - Add ?display=true to any URL to enable display mode
 * - Or set localStorage.setItem('havenz-display-mode', 'true')
 *
 * This allows the demo page on another monitor to control navigation and voice indicator.
 * Note: /demo page is excluded from display mode (it's the controller).
 */
export function DisplayListener() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { show: showVoice, hide: hideVoice } = useVoiceIndicator();
  const [isDisplayMode, setIsDisplayMode] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Check if display mode is enabled
  useEffect(() => {
    // Never enable display mode on the /demo page - it's the controller
    if (pathname === "/demo") {
      setIsDisplayMode(false);
      // Clear any persisted display mode when on controller page
      localStorage.removeItem("havenz-display-mode");
      return;
    }

    const urlParam = searchParams.get("display");
    const localStorageFlag = typeof window !== "undefined"
      ? localStorage.getItem("havenz-display-mode")
      : null;

    const shouldBeDisplay = urlParam === "true" || localStorageFlag === "true";
    setIsDisplayMode(shouldBeDisplay);

    if (shouldBeDisplay) {
      console.log("[Display Mode] Activated - listening for remote commands");
      // Persist the setting if enabled via URL
      if (urlParam === "true") {
        localStorage.setItem("havenz-display-mode", "true");
      }
    }
  }, [searchParams, pathname]);

  // Handle incoming messages
  const handleMessage = (message: DashboardMessage) => {
    switch (message.type) {
      case "voice-indicator":
        if (message.action === "show") {
          showVoice();
        } else {
          hideVoice();
        }
        break;
      case "pong":
        setIsConnected(true);
        break;
    }
  };

  // Use the remote hook in display mode
  useDashboardRemote({
    isDisplay: isDisplayMode,
    onMessage: handleMessage,
  });

  // No visual indicator on display - keep it clean
  return null;
}
