export interface Weather {
  temp: number;
  unit: "C" | "F";
  condition: string;
  icon?: string;
  location?: string;
  humidity?: number;
  feelsLike?: number;
}
