// Centralized portfolio/investment data

export interface Holding {
  symbol: string;
  name: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  change: number;
  changePercent: number;
}

export interface Portfolio {
  id: string;
  name: string;
  description?: string;
  type: "Stock" | "Crypto" | "Real Estate" | "Mixed";
  totalValue: string;
  totalReturn: string;
  returnPercent: number;
  riskLevel: "Low" | "Medium" | "High";
  holdings: Holding[];
  lastUpdated: string;
  chartUrl?: string;
}

export const portfolios: Portfolio[] = [
  {
    id: "tech-growth",
    name: "Tech Growth Portfolio",
    description: "Growth-focused technology stocks portfolio with emphasis on AI and cloud computing companies.",
    type: "Stock",
    totalValue: "$1,245,000",
    totalReturn: "+$245,000",
    returnPercent: 24.5,
    riskLevel: "High",
    holdings: [
      { symbol: "TSLA", name: "Tesla Inc.", shares: 150, avgCost: 180.50, currentPrice: 245.20, change: 12.30, changePercent: 5.28 },
      { symbol: "NVDA", name: "NVIDIA Corp.", shares: 200, avgCost: 285.00, currentPrice: 485.50, change: -8.20, changePercent: -1.66 },
      { symbol: "MSFT", name: "Microsoft Corp.", shares: 100, avgCost: 310.00, currentPrice: 378.90, change: 4.50, changePercent: 1.20 },
      { symbol: "GOOGL", name: "Alphabet Inc.", shares: 80, avgCost: 125.00, currentPrice: 142.80, change: 2.10, changePercent: 1.49 },
    ],
    lastUpdated: "Dec 4, 2024 4:00 PM",
    chartUrl: "https://tradingbotdev.ngrok.app/chart/TSLA/2025-12-04",
  },
  {
    id: "dividend-income",
    name: "Dividend Income Portfolio",
    description: "Conservative dividend-paying stocks for steady income generation.",
    type: "Stock",
    totalValue: "$580,000",
    totalReturn: "+$48,000",
    returnPercent: 9.0,
    riskLevel: "Low",
    holdings: [
      { symbol: "JNJ", name: "Johnson & Johnson", shares: 300, avgCost: 155.00, currentPrice: 162.50, change: 0.80, changePercent: 0.49 },
      { symbol: "KO", name: "Coca-Cola Co.", shares: 500, avgCost: 58.00, currentPrice: 62.30, change: -0.20, changePercent: -0.32 },
      { symbol: "PG", name: "Procter & Gamble", shares: 250, avgCost: 142.00, currentPrice: 158.40, change: 1.20, changePercent: 0.76 },
    ],
    lastUpdated: "Dec 4, 2024 4:00 PM",
  },
  {
    id: "energy-sector",
    name: "Energy Sector Fund",
    description: "Strategic investments in traditional and renewable energy companies.",
    type: "Stock",
    totalValue: "$425,000",
    totalReturn: "+$75,000",
    returnPercent: 21.4,
    riskLevel: "Medium",
    holdings: [
      { symbol: "XOM", name: "Exxon Mobil", shares: 400, avgCost: 95.00, currentPrice: 108.20, change: 2.40, changePercent: 2.27 },
      { symbol: "CVX", name: "Chevron Corp.", shares: 250, avgCost: 145.00, currentPrice: 152.80, change: -1.10, changePercent: -0.71 },
      { symbol: "NEE", name: "NextEra Energy", shares: 200, avgCost: 72.00, currentPrice: 78.50, change: 0.90, changePercent: 1.16 },
    ],
    lastUpdated: "Dec 4, 2024 4:00 PM",
  },
  {
    id: "real-estate-holdings",
    name: "Real Estate Holdings",
    description: "Commercial and residential real estate investments through REITs.",
    type: "Real Estate",
    totalValue: "$320,000",
    totalReturn: "+$28,000",
    returnPercent: 9.6,
    riskLevel: "Medium",
    holdings: [
      { symbol: "O", name: "Realty Income Corp.", shares: 600, avgCost: 52.00, currentPrice: 56.80, change: 0.35, changePercent: 0.62 },
      { symbol: "AMT", name: "American Tower", shares: 150, avgCost: 195.00, currentPrice: 218.40, change: -2.80, changePercent: -1.27 },
      { symbol: "VICI", name: "VICI Properties", shares: 800, avgCost: 28.50, currentPrice: 31.20, change: 0.45, changePercent: 1.46 },
    ],
    lastUpdated: "Dec 4, 2024 4:00 PM",
  },
];

export function getPortfolioById(id: string): Portfolio | undefined {
  return portfolios.find((portfolio) => portfolio.id === id);
}

export function getAllPortfolioIds(): string[] {
  return portfolios.map((portfolio) => portfolio.id);
}
