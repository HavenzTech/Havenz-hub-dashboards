"use client";

import Link from "next/link";

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
  return (
    <div className="min-h-screen bg-brand-background flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-text-primary mb-12">
        Dashboard Demo
      </h1>
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
