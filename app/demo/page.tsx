"use client";

import Link from "next/link";
import { useVoiceIndicator } from "@/providers";

const pages = [
  { name: "Idle Screen", href: "/idle-screen" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Dashboard 2", href: "/dashboard-2" },
  { name: "Companies", href: "/companies" },
  { name: "Departments", href: "/departments" },
  { name: "Projects", href: "/projects" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Properties", href: "/properties" },
  { name: "Heat Plant", href: "/heatplant" },
];

export default function DemoPage() {
  const { show, hide, isVisible } = useVoiceIndicator();

  const testVoiceIndicator = () => {
    show();
    setTimeout(() => {
      hide();
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-brand-background flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-text-primary mb-12">
        Dashboard Demo
      </h1>

      {/* Voice Indicator Test Button */}
      <button
        onClick={testVoiceIndicator}
        disabled={isVisible}
        className="mb-8 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/50 rounded-xl text-xl font-semibold text-black transition-all hover:scale-105 disabled:scale-100"
      >
        {isVisible ? "Voice Indicator Active (5s)..." : "Test Voice Indicator"}
      </button>

      <div className="grid grid-cols-2 gap-6 max-w-2xl w-full">
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="px-8 py-6 bg-white/10 hover:bg-white/20 rounded-xl text-center text-xl font-semibold text-text-primary transition-all hover:scale-105"
          >
            {page.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
