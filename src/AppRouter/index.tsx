import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import Pages from './Pages';

const AppRouter = () => (
  <BrowserRouter>
    <Sidebar />
    <Routes>
      {Pages.map((page) => (
        <Route key={page.path} path={page.path} element={page.element} />
      ))}
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
