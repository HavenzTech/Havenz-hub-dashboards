import { NextResponse } from "next/server";
import type { Project } from "@/types";

// Mock projects data - replace with database/API call
const mockProjects: Project[] = [
  {
    id: "1",
    name: "Heat Plant Monitoring System",
    startDate: "Jan 2024",
    endDate: "Mar 2024",
    status: "in-progress",
    admin: "John Smith",
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
    admin: "Jane Doe",
    resource: "Team Beta",
    progress: 100,
    hoursLogged: "512 hrs",
  },
  {
    id: "3",
    name: "Mobile App Redesign",
    startDate: "Feb 2024",
    endDate: "May 2024",
    status: "in-progress",
    admin: "Mike Johnson",
    resource: "Team Gamma",
    progress: 35,
    hoursLogged: "128 hrs",
  },
  {
    id: "4",
    name: "API Integration Suite",
    startDate: "Dec 2023",
    endDate: "Jan 2024",
    status: "on-hold",
    admin: "Sarah Wilson",
    resource: "Team Delta",
    progress: 80,
    hoursLogged: "340 hrs",
  },
];

export async function GET() {
  try {
    // TODO: Fetch from database or external API
    return NextResponse.json(mockProjects);
  } catch (error) {
    console.error("Projects API error:", error);
    return NextResponse.json([]);
  }
}

// Cache for 1 minute
export const revalidate = 60;
