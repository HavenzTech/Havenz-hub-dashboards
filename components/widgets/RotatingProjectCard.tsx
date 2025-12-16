"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { classNames } from "@/lib/utils";

interface Project {
  id?: string;
  name?: string | null;
  companyName?: string | null;
  companyLogo?: string | null;
  status?: string | null;
  statusDisplayName?: string | null;
  priority?: string | null;
  priorityDisplayName?: string | null;
  progress?: number;
  startDate?: string | null;
  endDate?: string | null;
  teamLead?: string | null;
  budgetAllocated?: number | null;
  budgetAllocatedFormatted?: string | null;
}

// Format budget number to display string
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

// Format date string to readable format
function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "N/A";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return dateStr;
  }
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

  const getStatusColor = (status?: string | null) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case "active":
        return "bg-status-success/20 text-status-success";
      case "completed":
        return "bg-status-info/20 text-status-info";
      case "on-hold":
      case "on hold":
        return "bg-status-warning/20 text-status-warning";
      case "planning":
        return "bg-blue-500/20 text-blue-400";
      case "cancelled":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-white/10 text-text-muted";
    }
  };

  const getPriorityColor = (priority?: string | null) => {
    const normalizedPriority = priority?.toLowerCase();
    switch (normalizedPriority) {
      case "critical":
      case "urgent":
        return "bg-red-500/20 text-red-400";
      case "high":
        return "bg-orange-500/20 text-orange-400";
      case "medium":
      case "normal":
        return "bg-yellow-500/20 text-yellow-400";
      case "low":
        return "bg-green-500/20 text-green-400";
      default:
        return null;
    }
  };

  const displayStatus = currentProject.statusDisplayName || currentProject.status || "Unknown";
  const displayPriority = currentProject.priorityDisplayName || currentProject.priority;
  const priorityColor = getPriorityColor(currentProject.priority);

  return (
    <div
      className={classNames(
        "flex flex-col items-center gap-3 w-full px-4",
        className
      )}
    >
      {/* Content with fade animation */}
      {currentProject.id ? (
        <Link href={`/projects/${currentProject.id}`} className="w-full">
          <div
            className={classNames(
              "flex flex-col items-center gap-3 w-full transition-all duration-300 ease-in-out cursor-pointer hover:scale-[1.01]",
              isAnimating ? "opacity-0 blur-sm" : "opacity-100 blur-0"
            )}
          >
        {/* Top Section: Project Name + Company + Status */}
        <div className="flex items-center justify-between w-full">
          {/* Left: Project Name */}
          <h3 className="text-xl font-bold text-text-primary">
            {currentProject.name || "Unnamed Project"}
          </h3>

          {/* Center: Company */}
          <div className="flex items-center gap-2">
            {currentProject.companyLogo ? (
              <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white/5">
                <Image
                  src={currentProject.companyLogo}
                  alt={`${currentProject.companyName || "Company"} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-text-muted font-bold">
                {(currentProject.companyName || "?").charAt(0)}
              </div>
            )}
            <span className="text-base text-text-secondary">
              {currentProject.companyName || "Unknown"}
            </span>
          </div>

          {/* Right: Priority + Status Badges */}
          <div className="flex items-center gap-2">
            {priorityColor && displayPriority && (
              <div
                className={classNames(
                  "px-3 py-0.5 rounded-full text-xs font-medium",
                  priorityColor
                )}
              >
                {displayPriority}
              </div>
            )}
            <div
              className={classNames(
                "px-3 py-0.5 rounded-full text-xs font-medium",
                getStatusColor(currentProject.status)
              )}
            >
              <span className="mr-1">●</span>
              {displayStatus}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10" />

        {/* Progress Bar */}
        <div className="w-full">
          <div className="flex justify-between text-xs text-text-muted mb-1">
            <span>Progress</span>
            <span>{currentProject.progress ?? 0}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className={classNames(
                "h-full rounded-full transition-all duration-500",
                (currentProject.progress ?? 0) === 100
                  ? "bg-status-success"
                  : "bg-brand-accent"
              )}
              style={{ width: `${currentProject.progress ?? 0}%` }}
            />
          </div>
        </div>

        {/* Info Grid - All in one row */}
        <div className="grid grid-cols-4 gap-x-6 text-center w-full">
          <div className="flex flex-col">
            <span className="text-xs text-text-muted uppercase tracking-wide">Start</span>
            <span className="text-sm font-semibold text-text-primary">{formatDate(currentProject.startDate)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-text-muted uppercase tracking-wide">End</span>
            <span className="text-sm font-semibold text-text-primary">{formatDate(currentProject.endDate)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-text-muted uppercase tracking-wide">Lead</span>
            <span className="text-sm font-semibold text-text-primary">{currentProject.teamLead || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-text-muted uppercase tracking-wide">Budget</span>
            <span className="text-sm font-semibold text-text-primary">{formatBudget(currentProject.budgetAllocated)}</span>
          </div>
        </div>
          </div>
        </Link>
      ) : (
        <div
          className={classNames(
            "flex flex-col items-center gap-3 w-full transition-all duration-300 ease-in-out",
            isAnimating ? "opacity-0 blur-sm" : "opacity-100 blur-0"
          )}
        >
          {/* Top Section: Project Name + Company + Status */}
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-bold text-text-primary">
              {currentProject.name || "Unnamed Project"}
            </h3>
            <div className="flex items-center gap-2">
              {currentProject.companyLogo ? (
                <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white/5">
                  <Image
                    src={currentProject.companyLogo}
                    alt={`${currentProject.companyName || "Company"} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-text-muted font-bold">
                  {(currentProject.companyName || "?").charAt(0)}
                </div>
              )}
              <span className="text-base text-text-secondary">
                {currentProject.companyName || "Unknown"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {priorityColor && displayPriority && (
                <div
                  className={classNames(
                    "px-3 py-0.5 rounded-full text-xs font-medium",
                    priorityColor
                  )}
                >
                  {displayPriority}
                </div>
              )}
              <div
                className={classNames(
                  "px-3 py-0.5 rounded-full text-xs font-medium",
                  getStatusColor(currentProject.status)
                )}
              >
                <span className="mr-1">●</span>
                {displayStatus}
              </div>
            </div>
          </div>
          <div className="w-full h-px bg-white/10" />
          <div className="w-full">
            <div className="flex justify-between text-xs text-text-muted mb-1">
              <span>Progress</span>
              <span>{currentProject.progress ?? 0}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className={classNames(
                  "h-full rounded-full transition-all duration-500",
                  (currentProject.progress ?? 0) === 100
                    ? "bg-status-success"
                    : "bg-brand-accent"
                )}
                style={{ width: `${currentProject.progress ?? 0}%` }}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-x-6 text-center w-full">
            <div className="flex flex-col">
              <span className="text-xs text-text-muted uppercase tracking-wide">Start</span>
              <span className="text-sm font-semibold text-text-primary">{formatDate(currentProject.startDate)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-text-muted uppercase tracking-wide">End</span>
              <span className="text-sm font-semibold text-text-primary">{formatDate(currentProject.endDate)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-text-muted uppercase tracking-wide">Lead</span>
              <span className="text-sm font-semibold text-text-primary">{currentProject.teamLead || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-text-muted uppercase tracking-wide">Budget</span>
              <span className="text-sm font-semibold text-text-primary">{formatBudget(currentProject.budgetAllocated)}</span>
            </div>
          </div>
        </div>
      )}

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
