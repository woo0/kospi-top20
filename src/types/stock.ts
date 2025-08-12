export interface Stock {
  code: string;
  name: string;
  currentPrice: number;
  changePercent: number;
  changeAmount: number;
  marketCap: number;
  rank: number;
}

export interface StockResponse {
  success: boolean;
  data: Stock[];
  lastUpdated: string;
  error?: string;
}