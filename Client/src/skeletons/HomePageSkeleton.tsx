import { Skeleton } from '@mui/material';
import Column from '@components/Containers/Column';
import ExercisesSummarySkeleton from './ExerciseSummarySkeleton';
import UpcomingEventsSkeleton from './UpcomingEventsSkeleton';

const HomePageSkeleton = () => (
  <Column gap={3}>
    <Skeleton variant="rectangular" width="20%" height={52} />
    <Skeleton variant="rectangular" width="10%" height={24} />
    <ExercisesSummarySkeleton />
    <UpcomingEventsSkeleton />
  </Column>
);

export default HomePageSkeleton;
