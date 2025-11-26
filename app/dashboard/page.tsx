"use client";

import { ProfileSection } from "@/components/widgets/ProfileSection";
import { ProjectsGrid } from "@/components/widgets/ProjectsGrid";
import { LinkedInFeed } from "@/components/widgets/LinkedInFeed";
import { CompaniesList } from "@/components/widgets/CompaniesList";
import type { Project, LinkedInPost } from "@/types";

// Profile data
const profileData = {
  name: "Sunny Sarpal",
  title: "CEO",
  handle: "sunnysarpal",
  status: "Available",
  avatarUrl: "/sunnypfp3.png",
};

// Companies data
const companies = [
  {
    name: "Agritech Haven LP",
    location: "Red Deer",
    logoSrc: "/ahi.png",
    logoScale: 0.8,
  },
  {
    name: "Energy Haven",
    location: "Calgary",
    logoSrc: "/energyhaven.png",
  },
  {
    name: "Havenz Tech",
    location: "Calgary",
    logoSrc: "/havenztech.png",
  },
  {
    name: "HavenSure",
    location: "Calgary",
    logoSrc: "/havensure.png",
    logoScale: 1.4,
  },
  {
    name: "Ledgion",
    location: "Calgary",
    logoSrc: "/ledgion.png",
    logoScale: 1.2,
  },
  {
    name: "RISE Basketball",
    location: "Calgary",
    logoSrc: "/rise.png",
  },
];

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Heat Plant Monitoring System",
    startDate: "Jan 2024",
    endDate: "Mar 2024",
    status: "in-progress",
    admin: "Sunny S",
    resource: "Team Alpha",
    progress: 65,
    hoursLogged: "245 hrs",
  },
  {
    id: "2",
    name: "Dashboard Analytics Platform",
    startDate: "Nov 2023",
    endDate: "Feb 2024",
    status: "completed",
    admin: "John B",
    resource: "Team Beta",
    progress: 100,
    hoursLogged: "512 hrs",
  },
  {
    id: "3",
    name: "Mobile App Development",
    startDate: "Feb 2024",
    endDate: "Jun 2024",
    status: "in-progress",
    admin: "Mostapha A",
    resource: "Team Gamma",
    progress: 35,
    hoursLogged: "128 hrs",
  },
];

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

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 h-full overflow-hidden">
      {/* Row 1: Profile Card + Companies */}
      <section className="w-full flex gap-8">
        <div className="w-1/2">
          <ProfileSection
            avatarUrl={profileData.avatarUrl}
            name={profileData.name}
            title={profileData.title}
            handle={profileData.handle}
            status={profileData.status}
            contactText="Contact"
          />
        </div>
        <div className="w-1/2 flex flex-col items-center">
          <h2 className="text-heading font-semibold text-text-primary mb-6 text-center">
            Companies
          </h2>
          <CompaniesList companies={companies} />
        </div>
      </section>

      {/* Row 2: LinkedIn + Projects */}
      <section className="w-full flex gap-8">
        <div className="w-1/2">
          <LinkedInFeed
            posts={mockLinkedInPosts}
            autoRotate={true}
            visibleCount={1}
          />
        </div>
        <div className="w-1/2">
          <ProjectsGrid
            projects={mockProjects}
            visibleCount={1}
            autoRotate={true}
          />
        </div>
      </section>
    </div>
  );
}
