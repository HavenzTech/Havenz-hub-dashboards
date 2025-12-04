"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { BlurFade } from "@/components/ui/BlurFade";
import { COMPANY_NAME, COMPANY_LOGO, COMPANY_URL } from "@/lib/constants";
import { getPortfolioById } from "@/lib/data/portfolios";
import { classNames } from "@/lib/utils";
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, PieChart, Activity, Clock } from "lucide-react";

export default function PortfolioDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const portfolio = getPortfolioById(id);

  const ANIMATION_DELAYS = {
    header: 0,
    backButton: 400,
    portfolioHeader: 500,
    stats: 700,
    holdings: 900,
    chart: 1100,
  };

  if (!portfolio) {
    return (
      <Container>
        <Header
          companyName={COMPANY_NAME}
          companyUrl={COMPANY_URL}
          logoSrc={COMPANY_LOGO}
          className="mb-4"
        />
        <div className="flex flex-col items-center justify-center flex-1 gap-4">
          <h1 className="text-2xl text-text-primary">Portfolio not found</h1>
          <Link href="/portfolio" className="text-accent-primary hover:underline">
            Back to Portfolios
          </Link>
        </div>
      </Container>
    );
  }

  const riskStyles = {
    Low: "bg-status-success/20 text-status-success",
    Medium: "bg-status-warning/20 text-status-warning",
    High: "bg-status-error/20 text-status-error",
  };

  const typeStyles = {
    Stock: "bg-accent-primary/20 text-accent-primary",
    Crypto: "bg-purple-500/20 text-purple-400",
    "Real Estate": "bg-blue-500/20 text-blue-400",
    Mixed: "bg-white/10 text-text-secondary",
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
            href="/portfolio"
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors w-fit"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Portfolios</span>
          </Link>
        </BlurFade>

        {/* Portfolio Header */}
        <BlurFade delay={ANIMATION_DELAYS.portfolioHeader} duration={600} yOffset={16}>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-text-primary">{portfolio.name}</h1>
              {portfolio.description && (
                <p className="text-text-secondary max-w-2xl">{portfolio.description}</p>
              )}
              <div className="flex items-center gap-3">
                <div className={classNames("px-3 py-1 rounded-full text-sm font-medium", typeStyles[portfolio.type])}>
                  {portfolio.type}
                </div>
                <div className={classNames("px-3 py-1 rounded-full text-sm font-medium", riskStyles[portfolio.riskLevel])}>
                  {portfolio.riskLevel} Risk
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-text-primary">{portfolio.totalValue}</p>
              <p className={classNames(
                "text-xl font-semibold",
                portfolio.returnPercent >= 0 ? "text-status-success" : "text-status-error"
              )}>
                {portfolio.totalReturn} ({portfolio.returnPercent >= 0 ? "+" : ""}{portfolio.returnPercent}%)
              </p>
            </div>
          </div>
        </BlurFade>

        {/* Stats Grid */}
        <BlurFade delay={ANIMATION_DELAYS.stats} duration={600} yOffset={16}>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-accent-primary" />
              </div>
              <div>
                <span className="text-xs text-text-muted uppercase tracking-wide">Total Value</span>
                <p className="text-lg font-semibold text-text-primary">{portfolio.totalValue}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className={classNames(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                portfolio.returnPercent >= 0 ? "bg-status-success/20" : "bg-status-error/20"
              )}>
                {portfolio.returnPercent >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-status-success" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-status-error" />
                )}
              </div>
              <div>
                <span className="text-xs text-text-muted uppercase tracking-wide">Total Return</span>
                <p className={classNames(
                  "text-lg font-semibold",
                  portfolio.returnPercent >= 0 ? "text-status-success" : "text-status-error"
                )}>{portfolio.totalReturn}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                <PieChart className="w-5 h-5 text-accent-primary" />
              </div>
              <div>
                <span className="text-xs text-text-muted uppercase tracking-wide">Holdings</span>
                <p className="text-xl font-semibold text-text-primary">{portfolio.holdings.length}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent-primary" />
              </div>
              <div>
                <span className="text-xs text-text-muted uppercase tracking-wide">Last Updated</span>
                <p className="text-sm font-semibold text-text-primary">{portfolio.lastUpdated}</p>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Holdings Table */}
        <BlurFade delay={ANIMATION_DELAYS.holdings} duration={600} yOffset={16}>
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-text-primary">Holdings</h2>
            <div className="bg-white/5 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-xs text-text-muted uppercase tracking-wide p-4">Symbol</th>
                    <th className="text-left text-xs text-text-muted uppercase tracking-wide p-4">Name</th>
                    <th className="text-right text-xs text-text-muted uppercase tracking-wide p-4">Shares</th>
                    <th className="text-right text-xs text-text-muted uppercase tracking-wide p-4">Avg Cost</th>
                    <th className="text-right text-xs text-text-muted uppercase tracking-wide p-4">Current</th>
                    <th className="text-right text-xs text-text-muted uppercase tracking-wide p-4">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.holdings.map((holding, index) => (
                    <tr key={holding.symbol} className={index !== portfolio.holdings.length - 1 ? "border-b border-white/5" : ""}>
                      <td className="p-4">
                        <span className="font-bold text-accent-primary">{holding.symbol}</span>
                      </td>
                      <td className="p-4 text-text-primary">{holding.name}</td>
                      <td className="p-4 text-right text-text-primary font-medium">{holding.shares}</td>
                      <td className="p-4 text-right text-text-secondary">${holding.avgCost.toFixed(2)}</td>
                      <td className="p-4 text-right text-text-primary font-semibold">${holding.currentPrice.toFixed(2)}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {holding.change >= 0 ? (
                            <TrendingUp className="w-4 h-4 text-status-success" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-status-error" />
                          )}
                          <span className={classNames(
                            "font-semibold",
                            holding.change >= 0 ? "text-status-success" : "text-status-error"
                          )}>
                            {holding.change >= 0 ? "+" : ""}{holding.changePercent.toFixed(2)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </BlurFade>

        {/* Chart iframe if available */}
        {portfolio.chartUrl && (
          <BlurFade delay={ANIMATION_DELAYS.chart} duration={600} yOffset={16}>
            <div className="flex flex-col gap-3 pb-6">
              <h2 className="text-xl font-semibold text-text-primary">Live Chart</h2>
              <div className="w-full h-64 rounded-xl overflow-hidden border border-white/10">
                <iframe
                  src={portfolio.chartUrl}
                  title={`${portfolio.name} Chart`}
                  className="w-full h-full"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                />
              </div>
            </div>
          </BlurFade>
        )}
      </div>
    </Container>
  );
}
