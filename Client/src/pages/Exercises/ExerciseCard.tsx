import RecruitExercise from '@entities/RecruitExcercise';
import { ExerciseStatusSimplifiedColors } from '@enums/ExerciseStatus';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ExerciseProps {
  recruitExercise: RecruitExercise;
}

const ExerciseCard = ({ recruitExercise }: ExerciseProps) => {
  const navigate = useNavigate();

  return (
    <Button
      fullWidth
      variant="outlined"
      color="inherit"
      onClick={() => navigate(`/exercise/${recruitExercise.id}`)}
      sx={{
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: ExerciseStatusSimplifiedColors[recruitExercise.status],
        borderRadius: 2,
        p: 2,
      }}
    >
      <Typography variant="h6">{recruitExercise.exercise.title}</Typography>
      <Typography variant="body1" fontWeight={600}>
        {recruitExercise.exercise.workDays} ימי עבודה
      </Typography>
    </Button>
  );
};

export default ExerciseCard;
