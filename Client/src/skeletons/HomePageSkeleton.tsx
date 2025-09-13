import { Skeleton } from '@mui/material';
import Column from '@components/Containers/Column';
import ExercisesSummarySkeleton from './ExerciseSummarySkeleton';

const HomePageSkeleton = () => (
  <Column gap={2}>
    <Skeleton variant="rectangular" width="20%" height={52} />
    <Skeleton variant="rectangular" width="10%" height={24} />
    <ExercisesSummarySkeleton />
  </Column>
);

export default HomePageSkeleton;
