export * from "./project";
export * from "./linkedin";

// Personal Info types
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

// Header types
export interface HeaderProps {
  companyName: string;
  companyUrl?: string;
  logoSrc: string;
}
