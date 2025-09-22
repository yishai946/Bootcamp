import Exercise from '@entities/Excercise';
import {
  ExerciseStatus,
  ExerciseStatusIcons,
  ExerciseStatusSimplifiedColors,
} from '@enums/ExerciseStatus';
import { Button, Typography } from '@mui/material';

interface ExerciseProps {
  exercise: Exercise;
  exerciseStatus: ExerciseStatus;
}

const ExerciseCard = ({ exercise, exerciseStatus }: ExerciseProps) => (
  <Button
    fullWidth
    variant="outlined"
    color='inherit'
    sx={{
      justifyContent: 'space-between',
      borderWidth: 2,
      borderColor: ExerciseStatusSimplifiedColors[exerciseStatus],
      borderRadius: 2,
      p: 2,
    }}
  >
    <Typography variant="h6">{exercise.title}</Typography>
    <Typography variant="body1" fontWeight={600}>{exercise.workDays} ימי עבודה</Typography>
  </Button>
);

export default ExerciseCard;
