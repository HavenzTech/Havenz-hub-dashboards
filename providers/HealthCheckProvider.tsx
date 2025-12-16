"use client";

import { useState, useEffect, ReactNode } from "react";
import { checkBackendHealth } from "@/services/bms-api";

interface HealthCheckProviderProps {
  children: ReactNode;
}

export function HealthCheckProvider({ children }: HealthCheckProviderProps) {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    let mounted = true;

    async function checkHealth() {
      const healthy = await checkBackendHealth();

      if (!mounted) return;

      if (healthy) {
        setIsHealthy(true);
      } else if (retryCount < maxRetries) {
        // Retry after a delay
        setTimeout(() => {
          if (mounted) {
            setRetryCount((prev) => prev + 1);
          }
        }, 2000); // 2 second delay between retries
      } else {
        setIsHealthy(false);
      }
    }

    checkHealth();

    return () => {
      mounted = false;
    };
  }, [retryCount]);

  // Loading state
  if (isHealthy === null) {
    return (
      <div className="min-h-screen bg-brand-background flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
        <p className="text-text-muted text-sm">
          Connecting to backend{retryCount > 0 ? ` (attempt ${retryCount + 1}/${maxRetries + 1})` : "..."}
        </p>
      </div>
    );
  }

  // Error state
  if (isHealthy === false) {
    return (
      <div className="min-h-screen bg-brand-background flex flex-col items-center justify-center gap-4 p-8">
        <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
          <span className="text-red-500 text-3xl">!</span>
        </div>
        <h1 className="text-xl font-semibold text-text-primary">Backend Unavailable</h1>
        <p className="text-text-muted text-sm text-center max-w-md">
          Unable to connect to the backend server. Please ensure the server is running and try again.
        </p>
        <button
          onClick={() => {
            setIsHealthy(null);
            setRetryCount(0);
          }}
          className="mt-4 px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-all"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  // Healthy - render children
  return <>{children}</>;
}
