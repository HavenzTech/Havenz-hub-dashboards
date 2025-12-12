"use client";

import { useMemo } from "react";
import { ProfileSection } from "@/components/widgets/ProfileSection";
import { ProjectsGrid } from "@/components/widgets/ProjectsGrid";
import { LinkedInFeed } from "@/components/widgets/LinkedInFeed";
import { CompaniesList } from "@/components/widgets/CompaniesList";
import { BlurFade } from "@/components/ui/BlurFade";
import { BlurText } from "@/components/ui/BlurText";
import type { LinkedInPost } from "@/types";
import type { Project } from "@/lib/data/projects";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useCompanies } from "@/hooks/useCompanies";
import { useProjects } from "@/hooks/useProjects";


const mockLinkedInPosts: LinkedInPost[] = [
  {
    id: "1",
    author: {
      name: "Sunny",
      title: "CEO at Havenz",
      avatarUrl: "/sunny.jpg",
    },
    content:
      "Excited to share our latest project milestone! The heat plant monitoring system is now live and running smoothly. Great teamwork from everyone involved. #Engineering #Innovation",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 142,
    comments: 23,
    shares: 8,
  },
  {
    id: "2",
    author: {
      name: "Sunny",
      title: "CEO at Havenz",
      avatarUrl: "/sunny.jpg",
    },
    content:
      "Just completed an amazing workshop on React Three Fiber. 3D visualization in web apps has never been easier! Looking forward to implementing these techniques in our upcoming projects.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    likes: 89,
    comments: 15,
    shares: 5,
  },
  {
    id: "3",
    author: {
      name: "Sunny",
      title: "CEO at Havenz",
      avatarUrl: "/sunny.jpg",
    },
    content:
      "The future of dashboards is here! Working on a beautiful portrait-mode display for our office. Stay tuned for the reveal. #NextJS #TailwindCSS #WebDev",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 215,
    comments: 42,
    shares: 18,
  },
  {
    id: "4",
    author: {
      name: "Sunny",
      title: "CEO at Havenz",
      avatarUrl: "/sunny.jpg",
    },
    content:
      "Grateful for the incredible team at Havenz Tech. Together we're building solutions that make a real difference. Here's to more innovation in 2025!",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 178,
    comments: 31,
    shares: 12,
  },
];

// Helper to format budget
function formatBudget(amount?: number | null): string {
  if (amount === null || amount === undefined) return "N/A";
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(0)}K`;
  }
  return `$${amount}`;
}

// Helper to format date
function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "N/A";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return dateStr;
  }
}

export default function DashboardPage() {
  const { user, isLoading: userLoading } = useCurrentUser();
  const { companies, isLoading: companiesLoading } = useCompanies();
  const { projects: apiProjects, isLoading: projectsLoading } = useProjects();

  // Map API companies to CompaniesList format
  const companiesList = useMemo(() => {
    return companies.map((c) => ({
      name: c.name || "Unknown",
      location: c.location || "N/A",
      logoSrc: c.logoUrl || "",
    }));
  }, [companies]);

  // Map API projects to Project format for ProjectsGrid
  const projectsList = useMemo((): Project[] => {
    return apiProjects.map((p) => ({
      id: p.id || "",
      name: p.name || "Unnamed Project",
      companyId: p.companyId || "",
      companyName: p.companyName || "Unknown",
      companyLogo: "", // API doesn't provide this directly
      department: p.departmentName || "N/A",
      status: (p.status === "active" ? "Active" : p.status === "completed" ? "Completed" : "On Hold") as "Active" | "Completed" | "On Hold",
      progress: p.progress ?? 0,
      startDate: formatDate(p.startDate),
      endDate: formatDate(p.endDate),
      projectLead: p.teamLead || "N/A",
      budget: p.budgetAllocatedFormatted || formatBudget(p.budgetAllocated),
      milestones: [],
      teamMembers: [],
    }));
  }, [apiProjects]);

  // Get user info with fallbacks
  const userName = user?.name || "User";
  const userRole = (user?.roleDisplayName || user?.role || "Member").toUpperCase();
  const userAvatar = user?.pictureUrl || "/sunnypfp3.png"; // Fallback to default

  // Animation timing configuration (in ms)
  const ANIMATION_DELAYS = {
    profileWelcome: 0,
    profileName: 200,
    profileTitle: 400,
    profileAvatar: 600,
    companiesTitle: 100,
    companiesListStart: 300,
    companiesStagger: 100,
    linkedInFeed: 900,
    projectsGrid: 1000,
  };

  const isLoading = userLoading || companiesLoading || projectsLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-text-muted">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 h-full overflow-hidden">
      {/* Row 1: Profile Card + Companies */}
      <section className="w-full flex gap-8">
        <div className="w-1/2">
          <ProfileSection
            avatarUrl={userAvatar}
            name={userName}
            title={userRole}
            handle=""
            status="Available"
            contactText="Contact"
            baseDelay={ANIMATION_DELAYS.profileWelcome}
          />
        </div>
        <div className="w-1/2 flex flex-col items-center">
          <h2 className="text-heading font-semibold text-text-primary mb-6 text-center">
            <BlurText text="Companies" delay={ANIMATION_DELAYS.companiesTitle} duration={800} />
          </h2>
          {companiesList.length > 0 ? (
            <CompaniesList
              companies={companiesList}
              baseDelay={ANIMATION_DELAYS.companiesListStart}
              staggerDelay={ANIMATION_DELAYS.companiesStagger}
            />
          ) : (
            <div className="text-text-muted">No companies found</div>
          )}
        </div>
      </section>

      {/* Row 2: LinkedIn + Projects */}
      <section className="w-full flex gap-8">
        <div className="w-1/2">
          <LinkedInFeed
            posts={mockLinkedInPosts}
            autoRotate={true}
            visibleCount={1}
            baseDelay={ANIMATION_DELAYS.linkedInFeed}
          />
        </div>
        <div className="w-1/2">
          <ProjectsGrid
            projects={projectsList}
            visibleCount={1}
            autoRotate={true}
            baseDelay={ANIMATION_DELAYS.projectsGrid}
          />
        </div>
      </section>
    </div>
  );
}
