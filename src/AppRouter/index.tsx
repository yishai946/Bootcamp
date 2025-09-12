import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import LoadingScreen from './LoadingScreen';
import Pages from './Pages';

const AppRouter = () => (
  <BrowserRouter>
    <Navbar />
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {Pages.map((page) => (
          <Route key={page.path} path={page.path} element={page.element} />
        ))}
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default AppRouter;
