"use client";

import { useState } from "react";
import { useVoiceIndicator } from "@/providers";
import { useDashboardRemote } from "@/hooks/useDashboardRemote";
import { useCompanies } from "@/hooks/useCompanies";
import { useDepartments } from "@/hooks/useDepartments";
import { useProjects } from "@/hooks/useProjects";
import { useProperties } from "@/hooks/useProperties";

const pages = [
  { name: "Idle Screen", href: "/idle-screen" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Dashboard 2", href: "/dashboard-2" },
  { name: "Heat Plant", href: "/heatplant" },
];

type ExpandedSection = "companies" | "departments" | "projects" | "properties" | null;

export default function DemoPage() {
  const { show, hide, isVisible } = useVoiceIndicator();
  const { sendNavigation, sendVoiceIndicator } = useDashboardRemote();
  const [lastSentPage, setLastSentPage] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<ExpandedSection>(null);

  // Fetch all data
  const { companies, isLoading: companiesLoading } = useCompanies();
  const { departments, isLoading: departmentsLoading } = useDepartments();
  const { projects, isLoading: projectsLoading } = useProjects();
  const { properties, isLoading: propertiesLoading } = useProperties();

  // Toggle voice indicator - sends to display
  const toggleVoiceIndicator = () => {
    if (isVisible) {
      hide();
      sendVoiceIndicator("hide");
    } else {
      show();
      sendVoiceIndicator("show");
    }
  };

  // Handle page navigation - always sends to display, never navigates this page
  const handlePageClick = (href: string) => {
    sendNavigation(href);
    setLastSentPage(href);
    setTimeout(() => setLastSentPage(null), 2000);
  };

  // Toggle section expansion
  const toggleSection = (section: ExpandedSection) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Data sections config
  interface DataItem {
    id?: string;
    name?: string | null;
  }

  interface DataSection {
    key: "companies" | "departments" | "projects" | "properties";
    name: string;
    listHref: string;
    items: DataItem[];
    isLoading: boolean;
    getItemHref: (id: string) => string;
  }

  const dataSections: DataSection[] = [
    {
      key: "companies",
      name: "Companies",
      listHref: "/companies",
      items: companies,
      isLoading: companiesLoading,
      getItemHref: (id: string) => `/companies/${id}`,
    },
    {
      key: "departments",
      name: "Departments",
      listHref: "/departments",
      items: departments,
      isLoading: departmentsLoading,
      getItemHref: (id: string) => `/departments/${id}`,
    },
    {
      key: "projects",
      name: "Projects",
      listHref: "/projects",
      items: projects,
      isLoading: projectsLoading,
      getItemHref: (id: string) => `/projects/${id}`,
    },
    {
      key: "properties",
      name: "Properties",
      listHref: "/properties",
      items: properties,
      isLoading: propertiesLoading,
      getItemHref: (id: string) => `/properties/${id}`,
    },
  ];

  return (
    <div className="min-h-screen bg-brand-background flex flex-col items-center p-6 overflow-auto relative">
      {/* Controller Mode Badge */}
      <div className="fixed bottom-2 left-2 px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full border border-cyan-500/30 z-50">
        Controller Mode
      </div>

      <h1 className="text-3xl font-bold text-text-primary mb-2">
        Dashboard Controller
      </h1>

      <p className="text-text-muted text-sm max-w-md text-center mb-1">
        Open <code className="bg-white/10 px-2 py-1 rounded">?display=true</code> on your other monitor
      </p>
      {lastSentPage && (
        <p className="text-green-400 text-sm animate-pulse mb-2">
          Sent: {lastSentPage}
        </p>
      )}

      {/* Voice Indicator Toggle Button */}
      <button
        onClick={toggleVoiceIndicator}
        className={`mb-6 px-6 py-3 rounded-xl text-lg font-semibold transition-all hover:scale-105 ${
          isVisible
            ? "bg-red-500 hover:bg-red-400 text-white"
            : "bg-cyan-500 hover:bg-cyan-400 text-black"
        }`}
      >
        {isVisible ? "Hide Voice Indicator" : "Show Voice Indicator"}
      </button>

      {/* Quick Navigation */}
      <div className="grid grid-cols-4 gap-3 w-full max-w-4xl mb-6">
        {pages.map((page) => (
          <button
            key={page.href}
            onClick={() => handlePageClick(page.href)}
            className={`px-4 py-3 rounded-lg text-center text-sm font-semibold transition-all hover:scale-105 ${
              lastSentPage === page.href
                ? "bg-green-500/30 text-green-300 border-2 border-green-500"
                : "bg-white/10 hover:bg-white/20 text-text-primary"
            }`}
          >
            {page.name}
          </button>
        ))}
      </div>

      {/* Data Sections */}
      <div className="w-full max-w-4xl space-y-3">
        {dataSections.map((section) => (
          <div key={section.key} className="bg-white/5 rounded-xl overflow-hidden">
            {/* Section Header - Click to expand or go to list */}
            <div className="flex">
              <button
                onClick={() => toggleSection(section.key)}
                className={`flex-1 px-4 py-3 text-left font-semibold transition-all flex items-center justify-between ${
                  expandedSection === section.key
                    ? "bg-white/10 text-text-primary"
                    : "hover:bg-white/5 text-text-primary"
                }`}
              >
                <span className="flex items-center gap-2">
                  {section.name}
                  <span className="text-xs text-text-muted">
                    ({section.isLoading ? "..." : section.items.length})
                  </span>
                </span>
                <span className="text-text-muted">
                  {expandedSection === section.key ? "▼" : "▶"}
                </span>
              </button>
              <button
                onClick={() => handlePageClick(section.listHref)}
                className={`px-4 py-3 text-sm font-medium transition-all border-l border-white/10 ${
                  lastSentPage === section.listHref
                    ? "bg-green-500/30 text-green-300"
                    : "hover:bg-white/10 text-cyan-400"
                }`}
              >
                View All
              </button>
            </div>

            {/* Expanded Items */}
            {expandedSection === section.key && (
              <div className="border-t border-white/10 max-h-64 overflow-y-auto">
                {section.isLoading ? (
                  <div className="p-4 text-text-muted text-sm">Loading...</div>
                ) : section.items.length === 0 ? (
                  <div className="p-4 text-text-muted text-sm">No items found</div>
                ) : (
                  <div className="grid grid-cols-2 gap-1 p-2">
                    {section.items.map((item) => {
                      if (!item.id) return null;
                      const href = section.getItemHref(item.id);
                      return (
                        <button
                          key={item.id}
                          onClick={() => handlePageClick(href)}
                          className={`px-3 py-2 rounded-lg text-left text-sm transition-all truncate ${
                            lastSentPage === href
                              ? "bg-green-500/30 text-green-300 border border-green-500"
                              : "hover:bg-white/10 text-text-primary"
                          }`}
                        >
                          {item.name || "Unnamed"}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Instructions - Collapsible */}
      <details className="mt-6 w-full max-w-4xl">
        <summary className="text-text-muted text-sm cursor-pointer hover:text-text-primary">
          Setup Instructions
        </summary>
        <div className="mt-2 p-4 bg-white/5 rounded-xl space-y-3">
          <div>
            <p className="text-text-muted text-xs uppercase tracking-wide mb-1">Deployed</p>
            <code className="bg-white/10 px-2 py-1 rounded text-sm text-cyan-400 block">
              https://havenz-hub-dashboards.vercel.app/dashboard?display=true
            </code>
          </div>
          <div>
            <p className="text-text-muted text-xs uppercase tracking-wide mb-1">Local</p>
            <code className="bg-white/10 px-2 py-1 rounded text-sm text-text-muted block">
              http://localhost:3000/dashboard?display=true
            </code>
          </div>
          <ol className="text-text-muted text-sm space-y-1 list-decimal list-inside pt-2 border-t border-white/10">
            <li>Open the display URL on your other monitor</li>
            <li>Keep this controller page open on your main screen</li>
            <li>Click any button to navigate the display</li>
            <li>Expand sections to see individual items</li>
          </ol>
        </div>
      </details>
    </div>
  );
}
