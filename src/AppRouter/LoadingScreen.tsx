import Center from '@components/Containers/Center';
import { CircularProgress } from '@mui/material';

const LoadingScreen = () => (
  <Center flexGrow={1}>
    <CircularProgress />
  </Center>
);

export default LoadingScreen;
