"use client";

import { useState, useEffect } from "react";
import { REFRESH_INTERVALS } from "@/lib/constants";

interface CurrentTime {
  date: Date;
  formattedDate: string;
  formattedTime: string;
}

export function useCurrentTime(): CurrentTime {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, REFRESH_INTERVALS.clock);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).toUpperCase();

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return {
    date: currentTime,
    formattedDate,
    formattedTime,
  };
}
