import Row from '@components/Containers/Row';
import { ExerciseStatus, ExerciseStatusNames } from '@enums/ExerciseStatus';
import { Skeleton } from '@mui/material';

const ExercisesSummarySkeleton = () => {
  const statusCount = Object.keys(ExerciseStatus).length / 2;
  const skeletonWidth = `${100 / statusCount}%`;

  return (
    <Row justifyContent="space-between" width="100%" gap={4}>
      {Array.from({ length: statusCount }).map((_, index) => (
        <Skeleton key={index} variant="rounded" height={148} width={skeletonWidth} />
      ))}
    </Row>
  );
};

export default ExercisesSummarySkeleton;
