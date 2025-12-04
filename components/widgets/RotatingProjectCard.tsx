"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { classNames } from "@/lib/utils";

interface Project {
  name: string;
  companyName: string;
  companyLogo: string;
  companyLogoScale?: number;
  status: "Active" | "Completed" | "On Hold";
  progress: number;
  startDate: string;
  endDate: string;
  projectLead: string;
  budget: string;
  department: string;
}

interface RotatingProjectCardProps {
  projects: Project[];
  rotateInterval?: number;
  initialDelay?: number;
  className?: string;
}

export function RotatingProjectCard({
  projects,
  rotateInterval = 5000,
  initialDelay = 0,
  className,
}: RotatingProjectCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (projects.length <= 1) return;

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % projects.length);
          setIsAnimating(false);
        }, 300);
      }, rotateInterval);

      return () => clearInterval(interval);
    }, initialDelay);

    return () => clearTimeout(startTimeout);
  }, [projects.length, rotateInterval, initialDelay]);

  const currentProject = projects[currentIndex];

  if (!currentProject) return null;

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "Active":
        return "bg-status-success/20 text-status-success";
      case "Completed":
        return "bg-status-info/20 text-status-info";
      case "On Hold":
        return "bg-status-warning/20 text-status-warning";
      default:
        return "bg-white/10 text-text-muted";
    }
  };

  return (
    <div
      className={classNames(
        "flex flex-col items-center gap-3 w-full px-4",
        className
      )}
    >
      {/* Content with fade animation */}
      <div
        className={classNames(
          "flex flex-col items-center gap-3 w-full transition-all duration-300 ease-in-out",
          isAnimating ? "opacity-0 blur-sm" : "opacity-100 blur-0"
        )}
      >
        {/* Top Section: Project Name + Company + Status */}
        <div className="flex items-center justify-between w-full">
          {/* Left: Project Name */}
          <h3 className="text-xl font-bold text-text-primary">
            {currentProject.name}
          </h3>

          {/* Center: Company */}
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
              <Image
                src={currentProject.companyLogo}
                alt={`${currentProject.companyName} logo`}
                fill
                className="object-contain"
                style={{ transform: `scale(${currentProject.companyLogoScale || 1})` }}
              />
            </div>
            <span className="text-base text-text-secondary">
              {currentProject.companyName}
            </span>
          </div>

          {/* Right: Status Badge */}
          <div
            className={classNames(
              "px-3 py-0.5 rounded-full text-xs font-medium",
              getStatusColor(currentProject.status)
            )}
          >
            <span className="mr-1">●</span>
            {currentProject.status}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10" />

        {/* Progress Bar */}
        <div className="w-full">
          <div className="flex justify-between text-xs text-text-muted mb-1">
            <span>Progress</span>
            <span>{currentProject.progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className={classNames(
                "h-full rounded-full transition-all duration-500",
                currentProject.progress === 100
                  ? "bg-status-success"
                  : "bg-brand-accent"
              )}
              style={{ width: `${currentProject.progress}%` }}
            />
          </div>
        </div>

        {/* Info Grid - All in one row */}
        <div className="grid grid-cols-5 gap-x-6 text-center w-full">
          <div className="flex flex-col">
            <span className="text-xs text-text-muted uppercase tracking-wide">Start</span>
            <span className="text-sm font-semibold text-text-primary">{currentProject.startDate}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-text-muted uppercase tracking-wide">End</span>
            <span className="text-sm font-semibold text-text-primary">{currentProject.endDate}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-text-muted uppercase tracking-wide">Lead</span>
            <span className="text-sm font-semibold text-text-primary">{currentProject.projectLead}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-text-muted uppercase tracking-wide">Budget</span>
            <span className="text-sm font-semibold text-text-primary">{currentProject.budget}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-text-muted uppercase tracking-wide">Dept</span>
            <span className="text-sm font-semibold text-text-primary">{currentProject.department}</span>
          </div>
        </div>
      </div>

      {/* Pagination dots */}
      {projects.length > 1 && (
        <div className="flex gap-1.5">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setIsAnimating(false);
                }, 300);
              }}
              className={classNames(
                "w-1.5 h-1.5 rounded-full transition-all",
                currentIndex === index
                  ? "bg-brand-accent w-4"
                  : "bg-white/20 hover:bg-white/40"
              )}
              aria-label={`Go to ${projects[index].name}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
