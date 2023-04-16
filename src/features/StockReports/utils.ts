import { IColumn, ReportValues } from './types';

export const getFormattedDate = (value: ReportValues, type: IColumn['type']): string | number => {
  if (typeof value === 'boolean' || !value) {
    return value ? '+' : '-';
  }

  if (type === 'date' && typeof value === 'number') {
    return new Date(value).toDateString();
  }

  return value;
};
