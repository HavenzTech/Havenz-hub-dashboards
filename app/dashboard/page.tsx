"use client";

import { useMemo, useState, useEffect } from "react";
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
import { bmsApi } from "@/services/bms-api";


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
  const formatter = new Intl.NumberFormat('en-CA', { maximumFractionDigits: 0 });
  if (amount >= 1_000_000) {
    return '$' + (amount / 1_000_000).toFixed(1) + 'M';
  }
  if (amount >= 1_000) {
    return '$' + formatter.format(Math.round(amount / 1_000)) + 'K';
  }
  return '$' + formatter.format(amount);
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
  const { user, isLoading: userLoading, error: userError } = useCurrentUser();
  const { companies, isLoading: companiesLoading, error: companiesError } = useCompanies();
  const { projects: apiProjects, isLoading: projectsLoading, error: projectsError } = useProjects();
  const [departmentCounts, setDepartmentCounts] = useState<Record<string, number>>({});

  // Fetch department counts for all projects
  useEffect(() => {
    async function fetchDepartmentCounts() {
      const counts: Record<string, number> = {};
      await Promise.all(
        apiProjects.map(async (project) => {
          if (project.id) {
            try {
              const departments = await bmsApi.projects.getDepartments(project.id);
              counts[project.id] = departments?.length || 0;
            } catch {
              counts[project.id] = 0;
            }
          }
        })
      );
      setDepartmentCounts(counts);
    }
    if (apiProjects.length > 0) {
      fetchDepartmentCounts();
    }
  }, [apiProjects]);

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
    return apiProjects.map((p) => {
      const deptCount = p.id ? departmentCounts[p.id] : 0;
      return {
        id: p.id || "",
        name: p.name || "Unnamed Project",
        companyId: p.companyId || "",
        companyName: p.companyName || "Unknown",
        companyLogo: "", // API doesn't provide this directly
        department: String(deptCount),
        status: (p.status === "active" ? "Active" : p.status === "completed" ? "Completed" : "On Hold") as "Active" | "Completed" | "On Hold",
        progress: p.progress ?? 0,
        startDate: formatDate(p.startDate),
        endDate: formatDate(p.endDate),
        projectLead: p.teamLead || "N/A",
        budget: formatBudget(p.budgetAllocated),
        milestones: [],
        teamMembers: [],
      };
    });
  }, [apiProjects, departmentCounts]);

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
  const hasError = userError || companiesError || projectsError;
  const hasNoData = !user && companies.length === 0 && apiProjects.length === 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-text-muted">Loading dashboard...</div>
      </div>
    );
  }

  // Show maintenance screen if backend is down or no data loaded
  if (hasError || hasNoData) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6">
        <div className="w-16 h-16 rounded-full bg-accent-primary/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-text-primary mb-2">System Under Maintenance</h1>
          <p className="text-text-secondary max-w-md">
            We&apos;re currently performing scheduled updates to improve your experience. Please check back shortly.
          </p>
        </div>
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
