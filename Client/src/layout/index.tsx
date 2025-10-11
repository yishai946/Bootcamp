import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Alert, Box, Snackbar } from '@mui/material';
import { useMessage } from '@providers/MessageProvider';

const Layout = () => {
  const { message, severity, handleClose } = useMessage();

  return (
    <>
      <Navbar />
      <Box p={4} flexGrow={1}>
        <Outlet />
        <Snackbar open={!!message} autoHideDuration={3000} onClose={handleClose}>
          <Alert variant='filled' onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default Layout;
