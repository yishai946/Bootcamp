import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import LoadingScreen from './LoadingScreen';
import Pages from './Pages';
import { Box } from '@mui/material';

const Router = () => (
  <BrowserRouter>
    <Navbar />
    <Suspense fallback={<LoadingScreen />}>
      <Box padding={3} flexGrow={1}>
        <Routes>
          {Pages.map((page) => (
            <Route key={page.path} path={page.path} element={page.element} />
          ))}
        </Routes>
      </Box>
    </Suspense>
  </BrowserRouter>
);

export default Router;
