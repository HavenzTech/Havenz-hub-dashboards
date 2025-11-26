"use client";

import { useState, useEffect } from "react";
import { ProjectCard } from "./ProjectCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { classNames } from "@/lib/utils";
import { REFRESH_INTERVALS } from "@/lib/constants";
import type { Project } from "@/types";

interface ProjectsGridProps {
  projects: Project[];
  className?: string;
  visibleCount?: number;
  title?: string;
  subtitle?: string;
  autoRotate?: boolean;
  rotateInterval?: number;
}

export function ProjectsGrid({
  projects,
  className,
  visibleCount = 1,
  title = "Projects",
  subtitle,
  autoRotate = true,
  rotateInterval = REFRESH_INTERVALS.linkedIn,
}: ProjectsGridProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!autoRotate || projects.length <= visibleCount) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + visibleCount) % projects.length);
        setIsAnimating(false);
      }, 300);
    }, rotateInterval);

    return () => clearInterval(interval);
  }, [autoRotate, projects.length, rotateInterval, visibleCount]);

  const visibleProjects = projects.slice(currentIndex, currentIndex + visibleCount);

  // Handle wrap-around if we're at the end
  if (visibleProjects.length < visibleCount && projects.length > visibleCount) {
    const remaining = visibleCount - visibleProjects.length;
    visibleProjects.push(...projects.slice(0, remaining));
  }

  return (
    <div className={classNames("w-full", className)}>
      <SectionTitle
        subtitle={projects.length > visibleCount ? `Showing ${currentIndex + 1}-${Math.min(currentIndex + visibleCount, projects.length)} of ${projects.length}` : subtitle}
      >
        {title}
      </SectionTitle>

      <div className="grid grid-cols-1 gap-4">
        {visibleProjects.map((project) => (
          <div
            key={`${project.id}-${currentIndex}`}
            className={classNames(
              "transition-all duration-300 ease-in-out",
              isAnimating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
            )}
          >
            <ProjectCard {...project} />
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12 text-text-muted text-body">
          No projects to display
        </div>
      )}

      {/* Pagination Dots */}
      {projects.length > visibleCount && (
        <div className="flex justify-center gap-2 mt-1">
          {Array.from({ length: Math.ceil(projects.length / visibleCount) }).map((_, index) => (
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
