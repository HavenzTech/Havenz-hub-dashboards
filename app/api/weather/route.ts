import { NextResponse } from "next/server";
import type { Weather } from "@/types";

// Calgary coordinates
const LATITUDE = 51.0447;
const LONGITUDE = -114.0719;

// Fallback weather data
const fallbackWeather: Weather = {
  temp: -5,
  unit: "C",
  condition: "Clear",
  location: "Calgary",
  humidity: 60,
  feelsLike: -8,
};

export async function GET() {
  try {
    // Using Open-Meteo API (free, no API key required)
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code`
    );

    if (!response.ok) {
      throw new Error("Weather API request failed");
    }

    const data = await response.json();

    const weather: Weather = {
      temp: Math.round(data.current.temperature_2m),
      unit: "C",
      condition: getWeatherCondition(data.current.weather_code),
      location: "Calgary",
      humidity: data.current.relative_humidity_2m,
      feelsLike: Math.round(data.current.apparent_temperature),
    };

    return NextResponse.json(weather);
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(fallbackWeather);
  }
}

// Convert WMO weather codes to readable conditions
function getWeatherCondition(code: number): string {
  if (code === 0) return "Clear";
  if (code === 1) return "Mainly Clear";
  if (code === 2) return "Partly Cloudy";
  if (code === 3) return "Overcast";
  if (code >= 45 && code <= 48) return "Foggy";
  if (code >= 51 && code <= 55) return "Drizzle";
  if (code >= 56 && code <= 57) return "Freezing Drizzle";
  if (code >= 61 && code <= 65) return "Rain";
  if (code >= 66 && code <= 67) return "Freezing Rain";
  if (code >= 71 && code <= 75) return "Snow";
  if (code === 77) return "Snow Grains";
  if (code >= 80 && code <= 82) return "Rain Showers";
  if (code >= 85 && code <= 86) return "Snow Showers";
  if (code === 95) return "Thunderstorm";
  if (code >= 96 && code <= 99) return "Thunderstorm with Hail";
  return "Unknown";
}

// Cache for 5 minutes
export const revalidate = 300;
