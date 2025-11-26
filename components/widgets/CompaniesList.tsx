"use client";

import Image from "next/image";
import { classNames } from "@/lib/utils";

interface Company {
  name: string;
  location: string;
  logoSrc: string;
  logoScale?: number;
}

interface CompaniesListProps {
  companies: Company[];
  className?: string;
}

export function CompaniesList({ companies, className }: CompaniesListProps) {
  return (
    <div className={classNames("flex flex-col gap-4", className)}>
      {companies.map((company, index) => (
        <div key={index} className="flex items-center gap-4">
          {/* Logo */}
          <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
            <Image
              src={company.logoSrc}
              alt={`${company.name} logo`}
              fill
              className="object-contain"
              style={{ transform: `scale(${company.logoScale || 1})` }}
            />
          </div>

          {/* Name and Location */}
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-text-primary">
              {company.name}
            </span>
            <div className="flex items-center gap-1.5 text-sm text-text-muted">
              {/* Location Pin Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3.5 h-3.5 text-brand-accent"
              >
                <path
                  fillRule="evenodd"
                  d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{company.location}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
