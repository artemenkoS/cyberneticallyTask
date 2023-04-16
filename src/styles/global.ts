import { css } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

export const globalStyle = (theme: Theme) => css`
  body {
    height: 100%;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${theme.palette.text.primary};
    background: ${theme.palette.background.default};
  }
`;
