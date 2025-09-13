import { CacheProvider, ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import LightTheme from '../theme/LightTheme';
import Column from '@components/Containers/Column';
import rtlCache from '../rtlCache';
import { UserProvider } from './UserProvider';
import ErrorBoundary from '@components/ErrorBoundary';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => (
  <CacheProvider value={rtlCache}>
    <ThemeProvider theme={LightTheme}>
      <Column height="100vh">
        <ErrorBoundary>
          <UserProvider>
            <CssBaseline />
            {children}
          </UserProvider>
        </ErrorBoundary>
      </Column>
    </ThemeProvider>
  </CacheProvider>
);

export default AppProviders;
