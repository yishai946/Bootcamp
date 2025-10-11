import { CacheProvider, ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import LightTheme from '../theme/LightTheme';
import Column from '@components/Containers/Column';
import rtlCache from '../rtlCache';
import { UserProvider } from './UserProvider';
import ErrorBoundary from '@components/ErrorBoundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MessageProvider } from './MessageProvider';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });

  return (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={LightTheme}>
        <Column height="100vh">
          <ErrorBoundary>
            <MessageProvider>
              <QueryClientProvider client={queryClient}>
                <UserProvider>
                  <CssBaseline />
                  {children}
                </UserProvider>
                {import.meta.env.DEV && <ReactQueryDevtools />}
              </QueryClientProvider>
            </MessageProvider>
          </ErrorBoundary>
        </Column>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default AppProviders;
