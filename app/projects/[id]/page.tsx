"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { BlurFade } from "@/components/ui/BlurFade";
import { COMPANY_NAME, COMPANY_LOGO, COMPANY_URL } from "@/lib/constants";
import { getProjectById } from "@/lib/data/projects";
import { classNames } from "@/lib/utils";
import { ArrowLeft, Calendar, DollarSign, Users, Building, CheckCircle, Circle, Clock } from "lucide-react";

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const project = getProjectById(id);

  const ANIMATION_DELAYS = {
    header: 0,
    backButton: 400,
    projectHeader: 500,
    progress: 650,
    stats: 800,
    milestones: 1000,
    team: 1200,
  };

  if (!project) {
    return (
      <Container>
        <Header
          companyName={COMPANY_NAME}
          companyUrl={COMPANY_URL}
          logoSrc={COMPANY_LOGO}
          className="mb-4"
        />
        <div className="flex flex-col items-center justify-center flex-1 gap-4">
          <h1 className="text-2xl text-text-primary">Project not found</h1>
          <Link href="/projects" className="text-accent-primary hover:underline">
            Back to Projects
          </Link>
        </div>
      </Container>
    );
  }

  const statusStyles = {
    Active: "bg-status-success/20 text-status-success",
    Completed: "bg-status-info/20 text-status-info",
    "On Hold": "bg-status-warning/20 text-status-warning",
  };

  const milestoneIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-5 h-5 text-status-success" />;
      case "In Progress":
        return <Clock className="w-5 h-5 text-accent-primary" />;
      default:
        return <Circle className="w-5 h-5 text-text-muted" />;
    }
  };

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
              <Image
                src={project.companyLogo}
                alt={project.companyName}
                fill
                className="object-contain"
                style={{ transform: `scale(${project.companyLogoScale || 1})` }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-text-primary">{project.name}</h1>
              <Link
                href={`/companies/${project.companyId}`}
                className="text-lg text-accent-primary hover:underline"
              >
                {project.companyName}
              </Link>
              {project.description && (
                <p className="text-text-secondary text-sm">{project.description}</p>
              )}
              <div
                className={classNames(
                  "px-3 py-1 rounded-full text-sm font-medium w-fit",
                  statusStyles[project.status]
                )}
              >
                <span className="mr-1.5">●</span>
                {project.status}
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Progress Bar */}
        <BlurFade delay={ANIMATION_DELAYS.progress} duration={600} yOffset={16}>
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-text-secondary">Overall Progress</span>
              <span className="text-2xl font-bold text-text-primary">{project.progress}%</span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className={classNames(
                  "h-full rounded-full transition-all",
                  project.progress === 100
                    ? "bg-status-success"
                    : project.status === "On Hold"
                    ? "bg-status-warning"
                    : "bg-accent-primary"
                )}
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        </BlurFade>

        {/* Stats Grid */}
        <BlurFade delay={ANIMATION_DELAYS.stats} duration={600} yOffset={16}>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-accent-primary" />
              </div>
              <div>
                <span className="text-xs text-text-muted uppercase tracking-wide">Timeline</span>
                <p className="text-sm font-semibold text-text-primary">{project.startDate} - {project.endDate}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-accent-primary" />
              </div>
              <div>
                <span className="text-xs text-text-muted uppercase tracking-wide">Budget</span>
                <p className="text-xl font-semibold text-text-primary">{project.budget}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                <Building className="w-5 h-5 text-accent-primary" />
              </div>
              <div>
                <span className="text-xs text-text-muted uppercase tracking-wide">Department</span>
                <p className="text-lg font-semibold text-text-primary">{project.department}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-accent-primary" />
              </div>
              <div>
                <span className="text-xs text-text-muted uppercase tracking-wide">Project Lead</span>
                <p className="text-lg font-semibold text-text-primary">{project.projectLead}</p>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Milestones Section */}
        {project.milestones.length > 0 && (
          <BlurFade delay={ANIMATION_DELAYS.milestones} duration={600} yOffset={16}>
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-text-primary">Milestones</h2>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex flex-col gap-3">
                  {project.milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4"
                    >
                      {milestoneIcon(milestone.status)}
                      <div className="flex-1">
                        <span className={classNames(
                          "font-medium",
                          milestone.status === "Completed" ? "text-text-secondary line-through" : "text-text-primary"
                        )}>
                          {milestone.name}
                        </span>
                      </div>
                      <span className="text-sm text-text-muted">{milestone.dueDate}</span>
                      <span className={classNames(
                        "text-xs px-2 py-0.5 rounded-full",
                        milestone.status === "Completed" ? "bg-status-success/20 text-status-success" :
                        milestone.status === "In Progress" ? "bg-accent-primary/20 text-accent-primary" :
                        "bg-white/10 text-text-muted"
                      )}>
                        {milestone.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </BlurFade>
        )}

        {/* Team Members Section */}
        {project.teamMembers.length > 0 && (
          <BlurFade delay={ANIMATION_DELAYS.team} duration={600} yOffset={16}>
            <div className="flex flex-col gap-3 pb-6">
              <h2 className="text-xl font-semibold text-text-primary">Team Members</h2>
              <div className="grid grid-cols-3 gap-3">
                {project.teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-xl p-4 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary font-semibold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text-primary truncate">{member.name}</h3>
                      <p className="text-xs text-text-secondary">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BlurFade>
        )}
      </div>
    </Container>
  );
}
