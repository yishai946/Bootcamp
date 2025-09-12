import AppRouter from './AppRouter';
import AppProviders from './providers/AppProviders';

const App = () => (
  <AppProviders>
    <AppRouter />
  </AppProviders>
);

export default App;
