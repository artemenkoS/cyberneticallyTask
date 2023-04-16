import { IColumn } from './types';

export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 10;
export const ROWS_PER_PAGE_OPTIONS = [5, 10, 15];

export const SELECTED_COMPANY = [
  'AAPL',
  'MSFT',
  'GOOG',
  'AMZN',
  'NVDA',
  'TSLA',
  'META',
  'JNJ',
  'TSM',
  'JPM',
  'WMT',
  'KO',
  'MCD',
].sort();

export const COLUMNS: IColumn[] = [
  {
    id: 'companyName',
    value: 'Company name',
    type: 'string',
    isDisabled: true,
  },
  {
    id: 'symbol',
    value: 'Symbol',
    type: 'string',
    isDisabled: true,
  },
  {
    id: 'currency',
    value: 'Currency',
    type: 'string',
  },
  {
    id: 'close',
    value: 'Close',
    type: 'number',
  },
  {
    id: 'change',
    value: 'Change',
    type: 'number',
  },
  {
    id: 'extendedChange',
    value: 'Extended change',
    type: 'number',
  },
  {
    id: 'extendedChangePercent',
    value: 'Extended change percent',
    type: 'number',
  },
  {
    id: 'avgTotalVolume',
    value: 'Average Volume',
    type: 'number',
  },
  {
    id: 'iexAskPrice',
    value: 'IEX Ask Price',
    type: 'number',
  },
  {
    id: 'primaryExchange',
    value: 'Primary Exchange',
    type: 'string',
  },

  {
    id: 'iexBidPrice',
    value: 'IEX Bid Price',
    type: 'number',
  },
  { id: 'previousClose', value: 'Previous Close', type: 'number' },
  { id: 'closeTime', value: 'Close  Time', type: 'date' },
];

export const DEFAULT_PARAMS = COLUMNS.map((column) => column.value);
