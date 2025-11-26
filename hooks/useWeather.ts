"use client";

import { useState, useEffect } from "react";
import { REFRESH_INTERVALS, API_URL } from "@/lib/constants";
import type { Weather } from "@/types";

interface UseWeatherResult {
  weather: Weather | null;
  isLoading: boolean;
  error: string | null;
}

// Mock weather data for development
const mockWeather: Weather = {
  temp: 22,
  unit: "C",
  condition: "Partly Cloudy",
  location: "Sydney",
  humidity: 65,
  feelsLike: 24,
};

export function useWeather(): UseWeatherResult {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        setIsLoading(true);
        setError(null);

        // Try to fetch from API, fallback to mock data
        try {
          const response = await fetch(`${API_URL}/weather`);
          if (response.ok) {
            const data = await response.json();
            setWeather(data);
            return;
          }
        } catch {
          // API not available, use mock data
        }

        // Use mock data as fallback
        setWeather(mockWeather);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch weather");
        setWeather(mockWeather); // Still show mock data on error
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeather();

    // Refresh weather data periodically
    const interval = setInterval(fetchWeather, REFRESH_INTERVALS.weather);
    return () => clearInterval(interval);
  }, []);

  return { weather, isLoading, error };
}
