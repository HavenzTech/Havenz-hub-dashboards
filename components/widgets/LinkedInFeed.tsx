"use client";

import { useState, useEffect } from "react";
import { LinkedInPost } from "./LinkedInPost";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { classNames } from "@/lib/utils";
import { REFRESH_INTERVALS } from "@/lib/constants";
import type { LinkedInPost as LinkedInPostType } from "@/types";

interface LinkedInFeedProps {
  posts: LinkedInPostType[];
  className?: string;
  autoRotate?: boolean;
  rotateInterval?: number;
  visibleCount?: number;
  title?: string;
}

export function LinkedInFeed({
  posts,
  className,
  autoRotate = true,
  rotateInterval = REFRESH_INTERVALS.linkedIn,
  visibleCount = 2,
  title = "LinkedIn Feed",
}: LinkedInFeedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!autoRotate || posts.length <= visibleCount) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + visibleCount) % posts.length);
        setIsAnimating(false);
      }, 300);
    }, rotateInterval);

    return () => clearInterval(interval);
  }, [autoRotate, posts.length, rotateInterval, visibleCount]);

  const visiblePosts = posts.slice(currentIndex, currentIndex + visibleCount);

  // Handle wrap-around if we're at the end
  if (visiblePosts.length < visibleCount && posts.length > visibleCount) {
    const remaining = visibleCount - visiblePosts.length;
    visiblePosts.push(...posts.slice(0, remaining));
  }

  return (
    <div className={classNames("w-full", className)}>
      <SectionTitle
        subtitle={posts.length > visibleCount ? `Showing ${currentIndex + 1}-${Math.min(currentIndex + visibleCount, posts.length)} of ${posts.length}` : undefined}
      >
        {title}
      </SectionTitle>

      <div className="grid grid-cols-1 gap-4">
        {visiblePosts.map((post) => (
          <div
            key={`${post.id}-${currentIndex}`}
            className={classNames(
              "transition-all duration-300 ease-in-out",
              isAnimating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
            )}
          >
            <LinkedInPost {...post} />
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12 text-text-muted text-body">
          No posts to display
        </div>
      )}

      {/* Pagination Dots */}
      {posts.length > visibleCount && (
        <div className="flex justify-center gap-2 mt-2">
          {Array.from({ length: Math.ceil(posts.length / visibleCount) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * visibleCount)}
              className={classNames(
                "w-2 h-2 rounded-full transition-all",
                Math.floor(currentIndex / visibleCount) === index
                  ? "bg-brand-accent w-6"
                  : "bg-white/20 hover:bg-white/40"
              )}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
