// Entity types
export * from "./user";
export * from "./project";
export * from "./department";
export * from "./company";
export * from "./linkedin";

// API types
export * from "./api";

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
