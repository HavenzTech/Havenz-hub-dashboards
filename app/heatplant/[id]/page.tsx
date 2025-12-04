"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { BlurFade } from "@/components/ui/BlurFade";
import { COMPANY_NAME, COMPANY_LOGO, COMPANY_URL } from "@/lib/constants";
import { getHeatPlantById } from "@/lib/data/heatplants";
import { classNames } from "@/lib/utils";
import { ArrowLeft, Activity, Gauge, Flame, Zap, Clock, Calendar, TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react";

export default function HeatPlantDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const plant = getHeatPlantById(id);

  const ANIMATION_DELAYS = {
    header: 0,
    backButton: 400,
    plantHeader: 500,
    stats: 700,
    sensors: 900,
    maintenance: 1100,
  };

  if (!plant) {
    return (
      <Container>
        <Header
          companyName={COMPANY_NAME}
          companyUrl={COMPANY_URL}
          logoSrc={COMPANY_LOGO}
          className="mb-4"
        />
        <div className="flex flex-col items-center justify-center flex-1 gap-4">
          <h1 className="text-2xl text-text-primary">Plant not found</h1>
          <Link href="/heatplant" className="text-accent-primary hover:underline">
            Back to Heat Plants
          </Link>
        </div>
      </Container>
    );
  }

  const statusStyles = {
    Online: "bg-status-success/20 text-status-success",
    Offline: "bg-status-error/20 text-status-error",
    Maintenance: "bg-status-warning/20 text-status-warning",
  };

  const sensorStatusStyles = {
    Normal: "bg-status-success/20 text-status-success",
    Warning: "bg-status-warning/20 text-status-warning",
    Critical: "bg-status-error/20 text-status-error",
  };

  const priorityStyles = {
    Low: "bg-white/10 text-text-muted",
    Medium: "bg-status-warning/20 text-status-warning",
    High: "bg-status-error/20 text-status-error",
  };

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-status-warning" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-accent-primary" />;
      default:
        return <Minus className="w-4 h-4 text-text-muted" />;
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
            href="/heatplant"
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors w-fit"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Heat Plants</span>
          </Link>
        </BlurFade>

        {/* Plant Header */}
        <BlurFade delay={ANIMATION_DELAYS.plantHeader} duration={600} yOffset={16}>
          <div className="flex items-center gap-6">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-white/5">
              <Image
                src={plant.companyLogo}
                alt={plant.companyName}
                fill
                className="object-contain"
                style={{ transform: `scale(${plant.companyLogoScale || 1})` }}
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-text-primary">{plant.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs text-text-muted uppercase tracking-wide">Efficiency</span>
                    <p className={classNames(
                      "text-3xl font-bold",
                      plant.efficiency >= 90 ? "text-status-success" : plant.efficiency >= 80 ? "text-status-warning" : "text-status-error"
                    )}>{plant.efficiency}%</p>
                  </div>
                </div>
              </div>
              <Link
                href={`/companies/${plant.companyId}`}
                className="text-lg text-accent-primary hover:underline w-fit"
              >
                {plant.companyName}
              </Link>
              <p className="text-text-secondary">{plant.operationalStatus}</p>
              <div className="flex items-center gap-3">
                <div className={classNames("px-3 py-1 rounded-full text-sm font-medium", statusStyles[plant.status])}>
                  <span className="mr-1.5">●</span>
                  {plant.status}
                </div>
                <span className="text-text-muted">|</span>
                <span className="text-text-secondary text-sm">{plant.location}</span>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Stats Grid */}
        <BlurFade delay={ANIMATION_DELAYS.stats} duration={600} yOffset={16}>
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-accent-primary" />
              </div>
              <div>
                <span className="text-xs text-text-muted uppercase tracking-wide">Power Out</span>
                <p className="text-lg font-semibold text-text-primary">{plant.powerOutput}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <span className="text-xs text-text-muted uppercase tracking-wide">Heat Out</span>
                <p className="text-lg font-semibold text-text-primary">{plant.heatOutput}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                <Gauge className="w-5 h-5 text-accent-primary" />
              </div>
              <div>
                <span className="text-xs text-text-muted uppercase tracking-wide">Capacity</span>
                <p className="text-lg font-semibold text-text-primary">{plant.capacity}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent-primary" />
              </div>
              <div>
                <span className="text-xs text-text-muted uppercase tracking-wide">Op. Hours</span>
                <p className="text-lg font-semibold text-text-primary">{plant.operatingHours.toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-accent-primary" />
              </div>
              <div>
                <span className="text-xs text-text-muted uppercase tracking-wide">Next Inspect</span>
                <p className="text-sm font-semibold text-text-primary">{plant.nextInspection}</p>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Sensor Readings */}
        <BlurFade delay={ANIMATION_DELAYS.sensors} duration={600} yOffset={16}>
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-text-primary">Sensor Readings</h2>
            <div className="grid grid-cols-3 gap-4">
              {plant.sensors.map((sensor, index) => (
                <div
                  key={index}
                  className={classNames(
                    "rounded-xl p-4 flex items-center justify-between",
                    sensor.status === "Normal" ? "bg-white/5" : sensor.status === "Warning" ? "bg-status-warning/10" : "bg-status-error/10"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {sensor.status !== "Normal" && (
                      <AlertTriangle className={classNames(
                        "w-5 h-5",
                        sensor.status === "Warning" ? "text-status-warning" : "text-status-error"
                      )} />
                    )}
                    <div>
                      <span className="text-sm text-text-muted">{sensor.name}</span>
                      <p className="text-xl font-bold text-text-primary">
                        {sensor.value} <span className="text-sm font-normal text-text-secondary">{sensor.unit}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {getTrendIcon(sensor.trend)}
                    <span className={classNames(
                      "text-xs px-2 py-0.5 rounded-full",
                      sensorStatusStyles[sensor.status]
                    )}>{sensor.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* Upcoming Maintenance */}
        {plant.upcomingMaintenance.length > 0 && (
          <BlurFade delay={ANIMATION_DELAYS.maintenance} duration={600} yOffset={16}>
            <div className="flex flex-col gap-3 pb-6">
              <h2 className="text-xl font-semibold text-text-primary">Upcoming Maintenance</h2>
              <div className="bg-white/5 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left text-xs text-text-muted uppercase tracking-wide p-4">Task</th>
                      <th className="text-left text-xs text-text-muted uppercase tracking-wide p-4">Due Date</th>
                      <th className="text-left text-xs text-text-muted uppercase tracking-wide p-4">Assigned To</th>
                      <th className="text-right text-xs text-text-muted uppercase tracking-wide p-4">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plant.upcomingMaintenance.map((task, index) => (
                      <tr key={index} className={index !== plant.upcomingMaintenance.length - 1 ? "border-b border-white/5" : ""}>
                        <td className="p-4 text-text-primary font-medium">{task.task}</td>
                        <td className="p-4 text-text-secondary">{task.dueDate}</td>
                        <td className="p-4 text-text-secondary">{task.assignedTo}</td>
                        <td className="p-4 text-right">
                          <span className={classNames(
                            "text-xs px-2 py-1 rounded-full",
                            priorityStyles[task.priority]
                          )}>{task.priority}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </BlurFade>
        )}
      </div>
    </Container>
  );
}
