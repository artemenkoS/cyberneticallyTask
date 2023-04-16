import { styled } from '@mui/material';
import { CircularProgress } from '@mui/material';

export const Layout = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
}));

export const CellText = styled('div')(() => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

export const Preloader = styled(CircularProgress)(() => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
}));
