import { CacheProvider, ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import LightTheme from '../theme/LightTheme';
import Column from '@components/Containers/Column';
import rtlCache from '../rtlCache';
import { UserProvider } from './UserProvider';
import ErrorBoundary from '@components/ErrorBoundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
  const queryClient = new QueryClient();

  return (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={LightTheme}>
        <Column height="100vh">
          <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
              <UserProvider>
                <CssBaseline />
                {children}
              </UserProvider>
              {/* {import.meta.env.DEV && <ReactQueryDevtools />} */}
            </QueryClientProvider>
          </ErrorBoundary>
        </Column>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default AppProviders;
