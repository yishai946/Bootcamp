import { CacheProvider, ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import LightTheme from '../theme/LightTheme';
import Column from '@components/Containers/Column';
import rtlCache from '../rtlCache';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => (
  <CacheProvider value={rtlCache}>
    <ThemeProvider theme={LightTheme}>
      <CssBaseline />
      <Column height="100vh">{children}</Column>
    </ThemeProvider>
  </CacheProvider>
);

export default AppProviders;
