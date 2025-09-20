import { Skeleton } from '@mui/material';
import Column from '@components/Containers/Column';
import ExercisesSummarySkeleton from './ExerciseSummarySkeleton';
import UpcomingEventsSkeleton from './UpcomingEventsSkeleton';
import EstimatedDateSkeleton from './EstimatedDateSkeleton';
import ProgressSkeleton from './ProgressSkeleton';
import Row from '@components/Containers/Row';

const HomePageSkeleton = () => (
  <Column gap={4}>
    <Skeleton variant="rounded" width="20%" height={52} />
    <Skeleton variant="rounded" width="10%" height={24} />
    <ExercisesSummarySkeleton />
    <Row justifyContent="space-between" height={388}>
      <UpcomingEventsSkeleton />
      <Column width="49%" justifyContent="space-between">
        <ProgressSkeleton />
        <EstimatedDateSkeleton />
      </Column>
    </Row>
  </Column>
);

export default HomePageSkeleton;
