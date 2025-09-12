import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import LightTheme from '../theme/LightTheme';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => (
  <ThemeProvider theme={LightTheme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default AppProviders;
