// lib/facility/api.ts - Facility screen API client
// Uses the same backend as bmsApi but with its own fetch helper for screen-specific endpoints.
// Falls back to local Next.js API routes when backend screen endpoints don't exist yet.

import { bmsApi } from "@/services/bms-api";
import { FACILITY_API } from "./constants";
import type { ScreenConfig, ScreenHeartbeat } from "@/types/facility";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
const TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "30000");

/**
 * Determines the base URL for screen config requests.
 * Uses local API routes (/api/facility/...) until the backend has screen endpoints.
 * Set NEXT_PUBLIC_FACILITY_API_MODE=backend to use the real backend.
 */
function getScreenApiBase(): string {
  const mode = process.env.NEXT_PUBLIC_FACILITY_API_MODE;
  if (mode === "backend") {
    return BASE_URL;
  }
  // Default: use local Next.js API routes (works without backend screen endpoints)
  return typeof window !== "undefined" ? window.location.origin : "";
}

async function facilityRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  useBackend: boolean = false
): Promise<T> {
  const base = useBackend ? BASE_URL : getScreenApiBase();
  const url = `${base}${endpoint}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  // Reuse auth token from bmsApi via localStorage
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const companyId = bmsApi.getCompanyId();
  if (companyId) {
    headers["X-Company-Id"] = companyId;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.status === 204) {
      return undefined as T;
    }

    if (!response.ok) {
      throw new Error(`Facility API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

// ============================================
// Screen Config API
// ============================================

export const facilityApi = {
  /** Fetches screen config — uses local mock API by default, backend when configured */
  getScreenConfig: (screenId: string) =>
    facilityRequest<ScreenConfig>(`/api/facility/config/${screenId}`),

  /** Sends heartbeat — silently fails when using local mock (no endpoint needed) */
  sendHeartbeat: async (screenId: string, heartbeat: ScreenHeartbeat) => {
    try {
      await facilityRequest<void>(`/api/facility/heartbeat/${screenId}`, {
        method: "POST",
        body: JSON.stringify(heartbeat),
      });
    } catch {
      // Heartbeat endpoint may not exist in mock mode — that's fine
    }
  },
};
