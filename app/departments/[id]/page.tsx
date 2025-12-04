"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { BlurFade } from "@/components/ui/BlurFade";
import { COMPANY_NAME, COMPANY_LOGO, COMPANY_URL } from "@/lib/constants";
import { getDepartmentById } from "@/lib/data/departments";
import { classNames } from "@/lib/utils";
import { ArrowLeft, Mail, Phone, Users, Briefcase, DollarSign, FolderOpen } from "lucide-react";

export default function DepartmentDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const department = getDepartmentById(id);

  const ANIMATION_DELAYS = {
    header: 0,
    backButton: 400,
    deptHeader: 500,
    stats: 700,
    team: 900,
    projects: 1100,
  };

  if (!department) {
    return (
      <Container>
        <Header
          companyName={COMPANY_NAME}
          companyUrl={COMPANY_URL}
          logoSrc={COMPANY_LOGO}
          className="mb-4"
        />
        <div className="flex flex-col items-center justify-center flex-1 gap-4">
          <h1 className="text-2xl text-text-primary">Department not found</h1>
          <Link href="/departments" className="text-accent-primary hover:underline">
            Back to Departments
          </Link>
        </div>
      </Container>
    );
  }

  const statusStyles = {
    Active: "bg-status-success/20 text-status-success",
    Completed: "bg-status-info/20 text-status-info",
    "On Hold": "bg-status-warning/20 text-status-warning",
    Inactive: "bg-white/10 text-text-muted",
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

      <div className="flex flex-col flex-1 gap-6 overflow-y-auto">
        {/* Back button */}
        <BlurFade delay={ANIMATION_DELAYS.backButton} duration={600} yOffset={16}>
          <Link
            href="/departments"
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors w-fit"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Departments</span>
          </Link>
        </BlurFade>

        {/* Department Header */}
        <BlurFade delay={ANIMATION_DELAYS.deptHeader} duration={600} yOffset={16}>
          <div className="flex items-center gap-6">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-white/5">
              <Image
                src={department.companyLogo}
                alt={department.companyName}
                fill
                className="object-contain"
                style={{ transform: `scale(${department.companyLogoScale || 1})` }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold text-text-primary">{department.name}</h1>
              <Link
                href={`/companies/${department.companyId}`}
                className="text-lg text-accent-primary hover:underline"
              >
                {department.companyName}
              </Link>
              {department.description && (
                <p className="text-text-secondary">{department.description}</p>
              )}
              <div
                className={classNames(
                  "px-3 py-1 rounded-full text-sm font-medium w-fit",
                  statusStyles[department.status]
                )}
              >
                <span className="mr-1.5">●</span>
                {department.status}
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Stats Grid */}
        <BlurFade delay={ANIMATION_DELAYS.stats} duration={600} yOffset={16}>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-accent-primary" />
              </div>
              <div>
                <span className="text-xs text-text-muted uppercase tracking-wide">Employees</span>
                <p className="text-2xl font-semibold text-text-primary">{department.employees}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-accent-primary" />
              </div>
              <div>
                <span className="text-xs text-text-muted uppercase tracking-wide">Led By</span>
                <p className="text-xl font-semibold text-text-primary">{department.ledBy}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-accent-primary" />
              </div>
              <div>
                <span className="text-xs text-text-muted uppercase tracking-wide">Budget</span>
                <p className="text-2xl font-semibold text-text-primary">{department.budget}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-accent-primary" />
              </div>
              <div>
                <span className="text-xs text-text-muted uppercase tracking-wide">Active Projects</span>
                <p className="text-2xl font-semibold text-text-primary">{department.activeProjects}</p>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Team Members Section */}
        {department.teamMembers.length > 0 && (
          <BlurFade delay={ANIMATION_DELAYS.team} duration={600} yOffset={16}>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold text-text-primary">Team Members</h2>
              <div className="grid grid-cols-2 gap-3">
                {department.teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-xl p-4 flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary font-semibold text-lg">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-primary">{member.name}</h3>
                      <p className="text-sm text-text-secondary">{member.role}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center gap-1 text-xs text-accent-primary hover:underline"
                        >
                          <Mail className="w-3 h-3" />
                          {member.email}
                        </a>
                        {member.phone && (
                          <span className="flex items-center gap-1 text-xs text-text-muted">
                            <Phone className="w-3 h-3" />
                            {member.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BlurFade>
        )}

        {/* Projects Section */}
        {department.projects.length > 0 && (
          <BlurFade delay={ANIMATION_DELAYS.projects} duration={600} yOffset={16}>
            <div className="flex flex-col gap-4 pb-6">
              <h2 className="text-2xl font-semibold text-text-primary">Projects</h2>
              <div className="flex flex-col gap-3">
                {department.projects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-xl p-4 flex items-center gap-6"
                  >
                    {/* Project Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-text-primary">
                          {project.name}
                        </h3>
                        <div
                          className={classNames(
                            "px-2 py-0.5 rounded-full text-xs font-medium",
                            statusStyles[project.status]
                          )}
                        >
                          {project.status}
                        </div>
                      </div>
                      <div className="flex gap-6 text-sm text-text-secondary">
                        <span>{project.startDate} - {project.endDate}</span>
                        <span>{project.budget}</span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="flex flex-col items-end gap-1 min-w-[100px]">
                      <span className="text-sm text-text-secondary">{project.progress}%</span>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
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
