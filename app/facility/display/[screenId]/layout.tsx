import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Havenz Facility Display",
  description: "Facility operations dashboard display",
};

/**
 * Layout for facility display screens.
 * Full-screen, no header, no navigation — pure display surface.
 * Auth and health check are provided by the root layout.
 */
export default function FacilityDisplayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen overflow-hidden bg-brand-background">
      {children}
    </div>
  );
}
