import { NextResponse } from "next/server";
import type { LinkedInPost } from "@/types";

// Mock LinkedIn posts - replace with LinkedIn API integration
const mockPosts: LinkedInPost[] = [
  {
    id: "1",
    author: {
      name: "Sunny",
      title: "Software Engineer at Havenz Tech",
      avatarUrl: "/avatar.jpg",
    },
    content: "Excited to share our latest project milestone! The heat plant monitoring system is now live and running smoothly. Great teamwork from everyone involved. #Engineering #Innovation",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 142,
    comments: 23,
    shares: 8,
  },
  {
    id: "2",
    author: {
      name: "Sunny",
      title: "Software Engineer at Havenz Tech",
      avatarUrl: "/avatar.jpg",
    },
    content: "Just completed an amazing workshop on React Three Fiber. 3D visualization in web apps has never been easier! Looking forward to implementing these techniques in our upcoming projects.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    likes: 89,
    comments: 15,
    shares: 5,
  },
  {
    id: "3",
    author: {
      name: "Sunny",
      title: "Software Engineer at Havenz Tech",
      avatarUrl: "/avatar.jpg",
    },
    content: "The future of dashboards is here! Working on a beautiful portrait-mode display for our office. Stay tuned for the reveal. #NextJS #TailwindCSS #WebDev",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 215,
    comments: 42,
    shares: 18,
  },
  {
    id: "4",
    author: {
      name: "Sunny",
      title: "Software Engineer at Havenz Tech",
      avatarUrl: "/avatar.jpg",
    },
    content: "Grateful for the incredible team at Havenz Tech. Together we're building solutions that make a real difference. Here's to more innovation in 2024!",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 178,
    comments: 31,
    shares: 12,
  },
];

export async function GET() {
  try {
    // TODO: Integrate with LinkedIn API
    // const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    // const response = await fetch('https://api.linkedin.com/v2/...', {
    //   headers: { Authorization: `Bearer ${accessToken}` }
    // });

    return NextResponse.json(mockPosts);
  } catch (error) {
    console.error("LinkedIn API error:", error);
    return NextResponse.json([]);
  }
}

// Cache for 5 minutes
export const revalidate = 300;
