export type ReportValues = boolean | string | number | null;

export interface IColumn {
  id: keyof IReport;
  isDisabled?: boolean;
  value: string;
  type: 'string' | 'number' | 'date' | 'boolean';
}

export interface IReport {
  avgTotalVolume: number;
  calculationPrice: string;
  change: number;
  changePercent: number;
  close: number;
  closeSource: string;
  closeTime: number;
  companyName: string;
  currency: string;
  delayedPrice: number;
  delayedPriceTime: number;
  extendedChange: number;
  extendedChangePercent: number;
  extendedPrice: number;
  extendedPriceTime: number;
  high: number;
  highSource: string;
  highTime: number;
  iexAskPrice: number | null;
  iexAskSize: number | null;
  iexBidPrice: number | null;
  iexBidSize: number | null;
  iexClose: number | null;
  iexCloseTime: number | null;
  iexLastUpdated: number | null;
  iexMarketPercent: number | null;
  iexOpen: number | null;
  iexOpenTime: number | null;
  iexRealtimePrice: number | null;
  iexRealtimeSize: number | null;
  iexVolume: number | null;
  lastTradeTime: number;
  latestPrice: number;
  latestSource: string;
  latestTime: string;
  latestUpdate: number;
  latestVolume: number;
  low: number;
  lowSource: string;
  lowTime: number;
  marketCap: number;
  oddLotDelayedPrice: number;
  oddLotDelayedPriceTime: number;
  open: number;
  openTime: number;
  openSource: string;
  peRatio: number | null;
  previousClose: number;
  previousVolume: number;
  primaryExchange: string;
  symbol: string;
  volume: number;
  week52High: number;
  week52Low: number;
  ytdChange: number;
  isUSMarketOpen: boolean;
}
