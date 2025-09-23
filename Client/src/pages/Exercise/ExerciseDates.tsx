import Row from '@components/Containers/Row';
import Exercise from '@entities/Excercise';
import RecruitExercise from '@entities/RecruitExcercise';
import { ExerciseStatus, ExerciseStatusColors, STATUSES } from '@enums/ExerciseStatus';
import { Button } from '@mui/material';
import DateField from './DateField';

interface DetailsProps {
  exercise: Exercise;
  recruitExercise: RecruitExercise;
}

const ExerciseDates = ({ recruitExercise }: DetailsProps) => {
  const exerciseDates: Partial<Record<ExerciseStatus, string | null>> = {
    [ExerciseStatus.InProgress]: recruitExercise.startDate,
    [ExerciseStatus.CodeReview]: recruitExercise.crDate,
    [ExerciseStatus.Fixed]: recruitExercise.fixDate,
    [ExerciseStatus.Done]: recruitExercise.doneDate,
  };

  return (
    <Row justifyContent="space-between" px={12} alignItems="center">
      {STATUSES.slice(1).map((status) => (
        <DateField key={status} date={exerciseDates[status]} status={status} />
      ))}
    </Row>
  );
};

export default ExerciseDates;
