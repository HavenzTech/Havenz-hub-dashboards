"use client";

import DarkVeil from "@/components/DarkVeil";

interface PortfolioLayoutProps {
  children: React.ReactNode;
}

export default function PortfolioLayout({ children }: PortfolioLayoutProps) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Dark Veil Background */}
      <div className="absolute inset-0 opacity-30">
        <DarkVeil speed={1.2} hueShift={50} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
