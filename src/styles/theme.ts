import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          display: 'flex',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          paddingRight: 0,
          fontWeight: 500,
        },
      },
    },
  },
  palette: {
    background: {
      default: '#f5f5f5',
    },
  },
});
