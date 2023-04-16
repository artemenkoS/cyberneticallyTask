import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IReport } from '../features/StockReports/types';

export const reportsApi = createApi({
  reducerPath: 'reportsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_IEX_API,
  }),
  endpoints: (builder) => ({
    getReport: builder.query<IReport, string>({
      query: (id) => `${id}/quote?token=${process.env.REACT_APP_IEX_TOKEN}`,
    }),
    getReports: builder.query<IReport[], string[]>({
      query: (ids) => `market/batch?symbols=${ids.join(',')}&types=quote&token=${process.env.REACT_APP_IEX_TOKEN}`,
      transformResponse: (response: Record<string, { quote: IReport }>) => {
        return Object.values(response).map(({ quote }) => quote);
      },
    }),
  }),
});

export const { useGetReportsQuery } = reportsApi;
