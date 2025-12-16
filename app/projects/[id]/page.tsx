"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { BlurFade } from "@/components/ui/BlurFade";
import { COMPANY_NAME, COMPANY_LOGO, COMPANY_URL } from "@/lib/constants";
import { useProject } from "@/hooks/useProject";
import { useCompany } from "@/hooks/useCompany";
import { classNames } from "@/lib/utils";
import { ArrowLeft, Calendar, DollarSign, Users, Briefcase, Mail, Clock, CheckCircle2, AlertTriangle, TrendingUp, ListTodo, Building2, CircleDot } from "lucide-react";

// Format budget number to display string
function formatBudget(amount?: number | null): string {
  if (amount === null || amount === undefined) return "N/A";
  const formatter = new Intl.NumberFormat('en-CA', { maximumFractionDigits: 2 });
  if (amount >= 1_000_000) {
    return '$' + (amount / 1_000_000).toFixed(1) + 'M';
  }
  if (amount >= 1_000) {
    return '$' + formatter.format(amount);
  }
  return '$' + formatter.format(amount);
}

// Format date string to readable format (handles UTC dates)
function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "N/A";
  try {
    const date = new Date(dateStr);
    // Use UTC methods to avoid timezone shift
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC"
    });
  } catch {
    return dateStr;
  }
}

// Calculate days between two dates (using UTC to avoid timezone issues)
function calculateDaysElapsed(startDate?: string | null): number | null {
  if (!startDate) return null;
  try {
    const start = new Date(startDate);
    const today = new Date();
    // Compare UTC dates only (ignore time)
    const startUTC = Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
    const todayUTC = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
    const diffDays = Math.floor((todayUTC - startUTC) / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  } catch {
    return null;
  }
}

function calculateDaysRemaining(endDate?: string | null): number | null {
  if (!endDate) return null;
  try {
    const end = new Date(endDate);
    const today = new Date();
    // Compare UTC dates only (ignore time)
    const endUTC = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());
    const todayUTC = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
    const diffDays = Math.ceil((endUTC - todayUTC) / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  } catch {
    return null;
  }
}

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { project, isLoading, error } = useProject(id);
  const { company } = useCompany(project?.companyId || null);

  const ANIMATION_DELAYS = {
    header: 0,
    backButton: 400,
    projectHeader: 500,
    progress: 650,
    stats: 800,
    budget: 900,
    team: 1000,
  };

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
        return "bg-red-500/20 text-red-400";
      case "high":
        return "bg-orange-500/20 text-orange-400";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400";
      case "low":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-white/10 text-text-muted";
    }
  };

  const getScheduleStatusColor = (scheduleStatus?: string | null) => {
    const normalized = scheduleStatus?.toLowerCase();
    if (normalized?.includes("ahead")) return "text-status-success";
    if (normalized?.includes("behind")) return "text-status-error";
    if (normalized?.includes("on track") || normalized?.includes("on-track")) return "text-status-info";
    return "text-text-muted";
  };

  const getTaskStatusColor = (status?: string | null) => {
    const normalized = status?.toLowerCase();
    switch (normalized) {
      case "completed":
      case "done":
        return "bg-status-success/20 text-status-success";
      case "in-progress":
      case "in progress":
      case "inprogress":
        return "bg-blue-500/20 text-blue-400";
      case "pending":
      case "todo":
      case "to-do":
        return "bg-yellow-500/20 text-yellow-400";
      case "blocked":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-white/10 text-text-muted";
    }
  };

  const getTaskPriorityColor = (priority?: string | null) => {
    const normalized = priority?.toLowerCase();
    switch (normalized) {
      case "critical":
      case "urgent":
        return "text-red-400";
      case "high":
        return "text-orange-400";
      case "medium":
        return "text-yellow-400";
      case "low":
        return "text-green-400";
      default:
        return "text-text-muted";
    }
  };

  if (isLoading) {
    return (
      <Container>
        <Header
          companyName={COMPANY_NAME}
          companyUrl={COMPANY_URL}
          logoSrc={COMPANY_LOGO}
          className="mb-4"
        />
        <div className="flex flex-col items-center justify-center flex-1 gap-4">
          <div className="text-text-muted">Loading project...</div>
        </div>
      </Container>
    );
  }

  if (error || !project) {
    return (
      <Container>
        <Header
          companyName={COMPANY_NAME}
          companyUrl={COMPANY_URL}
          logoSrc={COMPANY_LOGO}
          className="mb-4"
        />
        <div className="flex flex-col items-center justify-center flex-1 gap-4">
          <h1 className="text-2xl text-text-primary">{error || "Project not found"}</h1>
          <Link href="/projects" className="text-accent-primary hover:underline">
            Back to Projects
          </Link>
        </div>
      </Container>
    );
  }

  const displayStatus = project.statusDisplayName || project.status || "Unknown";

  return (
    <Container>
      <Header
        companyName={COMPANY_NAME}
        companyUrl={COMPANY_URL}
        logoSrc={COMPANY_LOGO}
        className="mb-4"
        baseDelay={ANIMATION_DELAYS.header}
      />

      <div className="flex flex-col flex-1 gap-5 overflow-y-auto">
        {/* Back button */}
        <BlurFade delay={ANIMATION_DELAYS.backButton} duration={600} yOffset={16}>
          <Link
            href="/projects"
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors w-fit"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Projects</span>
          </Link>
        </BlurFade>

        {/* Project Header */}
        <BlurFade delay={ANIMATION_DELAYS.projectHeader} duration={600} yOffset={16}>
          <div className="flex items-center gap-6">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-white/5">
              {company?.logoUrl ? (
                <Image
                  src={company.logoUrl}
                  alt={project.companyName || "Company"}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-muted text-2xl font-bold">
                  {(project.companyName || "?").charAt(0)}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-text-primary">{project.name || "Unnamed Project"}</h1>
              {project.companyId && (project.companyName || company?.name) && (
                <Link
                  href={`/companies/${project.companyId}`}
                  className="text-lg text-accent-primary hover:underline"
                >
                  {project.companyName || company?.name}
                </Link>
              )}
              {project.description && (
                <p className="text-text-secondary text-sm">{project.description}</p>
              )}
              <div className="flex items-center gap-2">
                <div
                  className={classNames(
                    "px-3 py-1 rounded-full text-sm font-medium",
                    getStatusColor(project.status)
                  )}
                >
                  <span className="mr-1.5">●</span>
                  {displayStatus}
                </div>
                {project.priority && (
                  <div
                    className={classNames(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      getPriorityColor(project.priority)
                    )}
                  >
                    {project.priorityDisplayName || project.priority}
                  </div>
                )}
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Progress Bar */}
        <BlurFade delay={ANIMATION_DELAYS.progress} duration={600} yOffset={16}>
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-text-secondary">Overall Progress</span>
              <div className="flex items-center gap-3">
                {project.scheduleStatusFormatted && (
                  <span className={classNames("text-sm font-medium", getScheduleStatusColor(project.scheduleStatus))}>
                    {project.scheduleStatusFormatted}
                  </span>
                )}
                <span className="text-2xl font-bold text-text-primary">{project.progressFormatted || `${project.progress ?? 0}%`}</span>
              </div>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${project.progress ?? 0}%`,
                  minWidth: (project.progress ?? 0) > 0 ? '8px' : '0',
                  backgroundColor: (project.progress ?? 0) === 100
                    ? 'var(--status-success)'
                    : project.status?.toLowerCase() === "on-hold"
                    ? 'var(--status-warning)'
                    : 'var(--accent-primary)'
                }}
              />
            </div>
            {/* Tasks Progress */}
            {(project.totalTasks != null && project.totalTasks > 0) && (
              <div className="flex items-center gap-2 mt-3 text-sm text-text-secondary">
                <ListTodo className="w-4 h-4" />
                <span>{project.completedTasks ?? 0} of {project.totalTasks} tasks completed</span>
              </div>
            )}
          </div>
        </BlurFade>

        {/* Stats Grid */}
        <BlurFade delay={ANIMATION_DELAYS.stats} duration={600} yOffset={16}>
          <div className="grid grid-cols-2 gap-4">
            {/* Timeline Card */}
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-accent-primary" />
                </div>
                <div>
                  <span className="text-xs text-text-muted uppercase tracking-wide">Timeline</span>
                  <p className="text-sm font-semibold text-text-primary">
                    {project.startDateRelative || formatDate(project.startDate)} → {project.endDateRelative || formatDate(project.endDate)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <span className="text-xs text-text-muted">Days Elapsed</span>
                  <p className="text-lg font-semibold text-text-primary">
                    {project.daysElapsed ?? calculateDaysElapsed(project.startDate) ?? 0}
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <span className="text-xs text-text-muted">Days Remaining</span>
                  {(() => {
                    const daysRemaining = project.daysRemaining ?? calculateDaysRemaining(project.endDate) ?? 0;
                    return (
                      <p className={classNames(
                        "text-lg font-semibold",
                        daysRemaining < 7 ? "text-status-warning" : "text-text-primary"
                      )}>{daysRemaining}</p>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Team & Budget Card */}
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent-primary" />
                </div>
                <div>
                  <span className="text-xs text-text-muted uppercase tracking-wide">Team</span>
                  <p className="text-lg font-semibold text-text-primary">
                    {(project.members?.length || 0) + (project.departments?.reduce((sum, dept) => sum + (dept.memberCount || 0), 0) || 0)} members
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {project.teamLead && (
                  <div className="bg-white/5 rounded-lg p-3">
                    <span className="text-xs text-text-muted">Team Lead</span>
                    <p className="text-sm font-semibold text-text-primary truncate">{project.teamLead}</p>
                  </div>
                )}
                <div className="bg-white/5 rounded-lg p-3">
                  <span className="text-xs text-text-muted">Budget</span>
                  <p className="text-lg font-semibold text-text-primary">{formatBudget(project.budgetAllocated)}</p>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Budget Details */}
        {(project.budgetSpent !== undefined || project.budgetRemaining !== undefined) && (
          <BlurFade delay={ANIMATION_DELAYS.budget} duration={600} yOffset={16}>
            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-text-primary mb-4">Budget Overview</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="text-xs text-text-muted uppercase tracking-wide">Allocated</span>
                  <p className="text-lg text-text-primary mt-1">{formatBudget(project.budgetAllocated)}</p>
                </div>
                <div>
                  <span className="text-xs text-text-muted uppercase tracking-wide">Spent</span>
                  <p className="text-lg text-text-primary mt-1">{formatBudget(project.budgetSpent)}</p>
                </div>
                <div>
                  <span className="text-xs text-text-muted uppercase tracking-wide">Remaining</span>
                  <p className="text-lg text-text-primary mt-1">
                    {formatBudget(
                      project.budgetRemaining ??
                      (project.budgetAllocated != null && project.budgetSpent != null
                        ? project.budgetAllocated - project.budgetSpent
                        : null)
                    )}
                  </p>
                </div>
              </div>
              {project.budgetUtilizationPercentage !== undefined && project.budgetUtilizationPercentage !== null && (
                (() => {
                  const displayPercent = project.budgetUtilizationPercentage;
                  return (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-text-muted">Utilization</span>
                        <span className="text-text-primary">{displayPercent.toFixed(0)}%</span>
                      </div>
                      <div className="w-full h-3 bg-white/10 rounded-full">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.min(displayPercent, 100)}%`,
                            minWidth: displayPercent > 0 ? '8px' : '0',
                            backgroundColor: 'var(--accent-primary)'
                          }}
                        />
                      </div>
                    </div>
                  );
                })()
              )}
            </div>
          </BlurFade>
        )}

        {/* Bottom Section: Departments + Members (left) | My Tasks (right) */}
        <BlurFade delay={ANIMATION_DELAYS.team} duration={600} yOffset={16}>
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column: Departments + Members */}
            <div className="flex flex-col gap-3">
              {/* Assigned Departments */}
              {project.departments && project.departments.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-semibold text-text-primary">Assigned Departments</h2>
                  <div className="flex flex-col gap-2">
                    {project.departments.map((dept) => (
                      <Link
                        key={dept.departmentId}
                        href={`/departments/${dept.departmentId}`}
                        className="bg-white/5 hover:bg-white/10 transition-colors rounded-lg p-3 flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-accent-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-text-primary text-sm truncate">{dept.departmentName}</h3>
                          <p className="text-xs text-text-secondary">{dept.memberCount ?? 0} members</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Team Members */}
              {project.members && project.members.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-semibold text-text-primary">Team Members</h2>
                  <div className="flex flex-col gap-2">
                    {project.members.map((member) => (
                      <div
                        key={member.userId}
                        className="bg-white/5 rounded-lg p-3 flex items-center gap-3"
                      >
                        {member.userPictureUrl ? (
                          <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
                            <Image
                              src={member.userPictureUrl}
                              alt={member.userName || "Member"}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary font-semibold text-xs">
                            {(member.userName || "?").split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-text-primary text-sm truncate">{member.userName}</h3>
                          <p className="text-xs text-text-secondary">{member.roleDisplayName || member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: My Tasks */}
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-text-primary">My Tasks</h2>
              {project.myTasks && project.myTasks.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {project.myTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white/5 rounded-lg p-3 flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent-primary/20 flex items-center justify-center shrink-0">
                        <CircleDot className={classNames("w-4 h-4", getTaskPriorityColor(task.priority))} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-text-primary text-sm truncate">{task.title}</h3>
                          <span className={classNames(
                            "px-1.5 py-0.5 rounded-full text-xs font-medium shrink-0",
                            getTaskStatusColor(task.status)
                          )}>
                            {task.statusDisplayName || task.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                          {task.dueDate && (
                            <span className={task.isOverdue ? "text-status-error" : ""}>
                              Due: {task.dueDateFormatted || formatDate(task.dueDate)}
                            </span>
                          )}
                          {task.priorityDisplayName && (
                            <span className={getTaskPriorityColor(task.priority)}>
                              {task.priorityDisplayName}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/5 rounded-lg p-4 text-center text-text-muted text-sm">
                  No tasks assigned to you for this project
                </div>
              )}
            </div>
          </div>
        </BlurFade>
      </div>
    </Container>
  );
}
