import React from 'react';
import { GlobalStyles } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { StockReports } from './features/StockReports/StockReports';

import { theme } from './styles/theme';
import { globalStyle } from './styles/global';

export const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles styles={globalStyle} />
    <ErrorBoundary>
      <StockReports />
    </ErrorBoundary>
  </ThemeProvider>
);
