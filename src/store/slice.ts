import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_PAGE, DEFAULT_PARAMS, DEFAULT_PER_PAGE } from '../features/StockReports/constants';
import { IReport } from '../features/StockReports/types';

interface StockReportsState {
  selectedColumns: string[];
  currentPage: number;
  currentReports: IReport[];
  reportsPerPage: number;
}

const initialState: StockReportsState = {
  selectedColumns: DEFAULT_PARAMS,
  currentPage: DEFAULT_PAGE,
  currentReports: [],
  reportsPerPage: DEFAULT_PER_PAGE,
};

export const stockReportsSlice = createSlice({
  name: 'stockReports',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setReportsPerPage: (state, action: PayloadAction<number>) => {
      state.reportsPerPage = action.payload;
    },
    setDisplayColumns: (state, action: PayloadAction<string[]>) => {
      state.selectedColumns = action.payload;
    },
    setCurrentReports: (state, action: PayloadAction<IReport[]>) => {
      state.currentReports = action.payload;
    },
  },
});

export const { setCurrentPage, setReportsPerPage, setDisplayColumns, setCurrentReports } = stockReportsSlice.actions;

export default stockReportsSlice.reducer;
