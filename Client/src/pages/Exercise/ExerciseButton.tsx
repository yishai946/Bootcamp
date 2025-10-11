import { ExerciseStatus, ExerciseStatusColors } from '@enums/ExerciseStatus';
import { Button } from '@mui/material';

interface ExerciseButtonProps {
  status: ExerciseStatus;
  recruitExerciseId: string;
  onAdvance: (exerciseId: string) => void;
}

const buttonLabels: Partial<Record<ExerciseStatus, string>> = {
  [ExerciseStatus.NotStarted]: 'התחל את התרגיל',
  [ExerciseStatus.InProgress]: 'מוכן לסקר קוד',
  [ExerciseStatus.CodeReview]: 'מוכן לבדיקת תיקונים',
  [ExerciseStatus.Fixed]: 'סיים תרגיל',
};

const ExerciseButton = ({ status, recruitExerciseId, onAdvance }: ExerciseButtonProps) =>
  status !== ExerciseStatus.Done && (
    <Button
      variant="contained"
      onClick={() => onAdvance(recruitExerciseId)}
      sx={{ background: ExerciseStatusColors[(status + 1) as ExerciseStatus], fontSize: 16 }}
    >
      {buttonLabels[status]}
    </Button>
  );

export default ExerciseButton;
