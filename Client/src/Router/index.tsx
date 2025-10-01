import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import Pages from './Pages';
import Layout from '../layout';
import ProtectedRoute from './ProtectedRoute';
import PublicOnlyRoute from './PublicOnlyRoute';

const Router = () => (
  <BrowserRouter>
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {Pages.filter((page) => page.isPublicOnly).map((page) => (
          <Route
            key={page.path}
            path={page.path}
            element={<PublicOnlyRoute>{page.element}</PublicOnlyRoute>}
          />
        ))}
        {Pages.filter((page) => !page.isProtected && !page.isPublicOnly).map((page) => (
          <Route key={page.path} path={page.path} element={page.element} />
        ))}
        <Route element={<Layout />}>
          {Pages.filter((page) => page.isProtected).map((page) => (
            <Route
              key={page.path}
              path={page.path}
              element={
                <ProtectedRoute allowedRoles={page.allowedRoles}>{page.element}</ProtectedRoute>
              }
            />
          ))}
        </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default Router;
