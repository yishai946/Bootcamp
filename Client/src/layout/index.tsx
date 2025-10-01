import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Box } from '@mui/material';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Box p={4} flexGrow={1}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
