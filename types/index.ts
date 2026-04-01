// BMS types (backend-aligned)
export * from "./bms";

// Facility display system types
export * from "./facility";

// UI/Component types
export interface PersonalDetail {
  label: string;
  value: string;
}

export interface PersonalInfo {
  name: string;
  age: number;
  title: string;
  company: string;
  details: PersonalDetail[];
  avatarSrc?: string;
}

export interface HeaderProps {
  companyName: string;
  companyUrl?: string;
  logoSrc: string;
}
