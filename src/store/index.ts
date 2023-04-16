import { configureStore } from '@reduxjs/toolkit';

import { reportsApi } from '../services/reportsApi';
import { stockReportsSlice } from './slice';

export const store = configureStore({
  reducer: { [reportsApi.reducerPath]: reportsApi.reducer, stockReports: stockReportsSlice.reducer },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reportsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
