import Column from '@components/Containers/Column';
import { Skeleton } from '@mui/material';

const ExercisesPageSkeleton = () => (
  <Column gap={4} alignItems="center" width="100%" mt={4} p={4}>
    {[...Array(5)].map((_, index) => (
      <Skeleton key={index} variant="rounded" width="100%" height={68} />
    ))}
  </Column>
);

export default ExercisesPageSkeleton;
