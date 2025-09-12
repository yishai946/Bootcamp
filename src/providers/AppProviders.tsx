import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import LightTheme from '../theme/LightTheme';
import Column from '@components/Containers/Column';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => (
  <ThemeProvider theme={LightTheme}>
    <CssBaseline />
    <Column height="100vh">{children}</Column>
  </ThemeProvider>
);

export default AppProviders;
