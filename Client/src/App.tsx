import Router from './Router';
import AppProviders from './providers/AppProviders';

const App = () => (
  <AppProviders>
    <Router />
  </AppProviders>
);

export default App;
