import InfoContainer from '@components/Containers/InfoContainer';
import RecruitExercise from '@entities/RecruitExcercise';
import { ExerciseStatus } from '@enums/ExerciseStatus';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { LinearProgress, Typography } from '@mui/material';

interface ProgressProps {
  exercises: RecruitExercise[];
}

const Progress = ({ exercises }: ProgressProps) => {
  const completedExercises = exercises.filter(
    (exercise) => exercise.status === ExerciseStatus.Done
  ).length;

  const progress = (completedExercises / exercises.length) * 100 || 100;

  return (
    <InfoContainer
      title="התקדמות"
      icon={<TrendingUpIcon color="primary" />}
      gap={2}
      width="100%"
    >
      <Typography variant="h5" fontWeight={600} alignSelf="center">
        {progress.toFixed(0)}%
      </Typography>
      <LinearProgress variant="determinate" value={progress} />
      <span>{`השלמת ${completedExercises} מתוך ${exercises.length} תרגילים`}</span>
    </InfoContainer>
  );
};

export default Progress;
