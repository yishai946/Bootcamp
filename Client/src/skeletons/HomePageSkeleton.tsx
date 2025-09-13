import { Skeleton } from '@mui/material';
import Column from '@components/Containers/Column';

const HomePageSkeleton = () => (
  <>
    <Skeleton variant="rectangular" width="20%" height={32} />
    <Skeleton variant="rectangular" width="10%" height={24} style={{ marginTop: 8 }} />
  </>
);

export default HomePageSkeleton;
