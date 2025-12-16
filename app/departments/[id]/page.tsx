"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { BlurFade } from "@/components/ui/BlurFade";
import { COMPANY_NAME, COMPANY_LOGO, COMPANY_URL } from "@/lib/constants";
import { useDepartment } from "@/hooks/useDepartment";
import { useCompany } from "@/hooks/useCompany";
import { ArrowLeft, Mail, Users, Briefcase, DollarSign } from "lucide-react";

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

export default function DepartmentDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { department, isLoading, error } = useDepartment(id);
  const { company } = useCompany(department?.companyId || null);

  const ANIMATION_DELAYS = {
    header: 0,
    backButton: 400,
    deptHeader: 500,
    stats: 700,
    team: 900,
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
          <div className="text-text-muted">Loading department...</div>
        </div>
      </Container>
    );
  }

  if (error || !department) {
    return (
      <Container>
        <Header
          companyName={COMPANY_NAME}
          companyUrl={COMPANY_URL}
          logoSrc={COMPANY_LOGO}
          className="mb-4"
        />
        <div className="flex flex-col items-center justify-center flex-1 gap-4">
          <h1 className="text-2xl text-text-primary">{error || "Department not found"}</h1>
          <Link href="/departments" className="text-accent-primary hover:underline">
            Back to Departments
          </Link>
        </div>
      </Container>
    );
  }

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
              {company?.logoUrl ? (
                <Image
                  src={company.logoUrl}
                  alt={department.companyName || "Company"}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-muted text-2xl font-bold">
                  {(department.companyName || "?").charAt(0)}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold text-text-primary">{department.name}</h1>
              {department.companyId && (
                <Link
                  href={`/companies/${department.companyId}`}
                  className="text-lg text-accent-primary hover:underline"
                >
                  {department.companyName}
                </Link>
              )}
              {department.description && (
                <p className="text-text-secondary">{department.description}</p>
              )}
            </div>
          </div>
        </BlurFade>

        {/* Stats Grid */}
        <BlurFade delay={ANIMATION_DELAYS.stats} duration={600} yOffset={16}>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-accent-primary" />
              </div>
              <div>
                <span className="text-xs text-text-muted uppercase tracking-wide">Members</span>
                <p className="text-2xl font-semibold text-text-primary">{department.memberCount ?? 0}</p>
              </div>
            </div>
            {department.headName && (
              <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-accent-primary" />
                </div>
                <div>
                  <span className="text-xs text-text-muted uppercase tracking-wide">Led By</span>
                  <p className="text-xl font-semibold text-text-primary">{department.headName}</p>
                </div>
              </div>
            )}
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-accent-primary" />
              </div>
              <div>
                <span className="text-xs text-text-muted uppercase tracking-wide">Budget</span>
                <p className="text-2xl font-semibold text-text-primary">{formatBudget(department.budgetAllocated)}</p>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Budget Details */}
        {(department.budgetSpent !== undefined || department.budgetRemaining !== undefined) && (
          <BlurFade delay={ANIMATION_DELAYS.stats + 100} duration={600} yOffset={16}>
            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-text-primary mb-4">Budget Overview</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="text-xs text-text-muted uppercase tracking-wide">Allocated</span>
                  <p className="text-lg text-text-primary mt-1">{formatBudget(department.budgetAllocated)}</p>
                </div>
                <div>
                  <span className="text-xs text-text-muted uppercase tracking-wide">Spent</span>
                  <p className="text-lg text-text-primary mt-1">{formatBudget(department.budgetSpent)}</p>
                </div>
                <div>
                  <span className="text-xs text-text-muted uppercase tracking-wide">Remaining</span>
                  <p className="text-lg text-text-primary mt-1">{formatBudget(department.budgetRemaining)}</p>
                </div>
              </div>
              {department.budgetUtilizationPercentage !== undefined && department.budgetUtilizationPercentage !== null && (
                (() => {
                  // API returns percentage as number (10 = 10%)
                  const displayPercent = department.budgetUtilizationPercentage;
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

        {/* Head Contact Info */}
        {(department.headEmail || department.headPhone) && (
          <BlurFade delay={ANIMATION_DELAYS.stats + 200} duration={600} yOffset={16}>
            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-text-primary mb-4">Department Head Contact</h2>
              <div className="flex gap-6">
                {department.headEmail && (
                  <a
                    href={`mailto:${department.headEmail}`}
                    className="flex items-center gap-2 text-accent-primary hover:underline"
                  >
                    <Mail className="w-4 h-4" />
                    {department.headEmail}
                  </a>
                )}
              </div>
            </div>
          </BlurFade>
        )}

        {/* Team Members Section */}
        {department.members && department.members.length > 0 && (
          <BlurFade delay={ANIMATION_DELAYS.team} duration={600} yOffset={16}>
            <div className="flex flex-col gap-4 pb-6">
              <h2 className="text-2xl font-semibold text-text-primary">Team Members</h2>
              <div className="grid grid-cols-2 gap-3">
                {department.members.map((member) => (
                  <div
                    key={member.userId}
                    className="bg-white/5 rounded-xl p-4 flex items-center gap-4"
                  >
                    {member.userPictureUrl ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                        <Image
                          src={member.userPictureUrl}
                          alt={member.userName || "Member"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary font-semibold text-lg shrink-0">
                        {(member.userName || "?").split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text-primary truncate">{member.userName}</h3>
                      <p className="text-sm text-text-secondary">{member.roleDisplayName || member.role}</p>
                      {member.userEmail && (
                        <a
                          href={`mailto:${member.userEmail}`}
                          className="flex items-center gap-1 text-xs text-accent-primary hover:underline mt-1"
                        >
                          <Mail className="w-3 h-3" />
                          <span className="truncate">{member.userEmail}</span>
                        </a>
                      )}
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
