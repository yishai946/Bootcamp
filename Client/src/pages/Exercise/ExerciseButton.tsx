import { ExerciseStatus, ExerciseStatusColors } from '@enums/ExerciseStatus';
import { Button } from '@mui/material';

interface ExerciseButtonProps {
  status: ExerciseStatus;
  onAdvance: () => void;
}

const buttonLabels: Partial<Record<ExerciseStatus, string>> = {
  [ExerciseStatus.NotStarted]: 'התחל את התרגיל',
  [ExerciseStatus.InProgress]: 'מוכן לסקר קוד',
  [ExerciseStatus.CodeReview]: 'מוכן לבדיקת תיקונים',
  [ExerciseStatus.Fixed]: 'סיים תרגיל',
};

const ExerciseButton = ({ status, onAdvance }: ExerciseButtonProps) =>
  status !== ExerciseStatus.Done && (
    <Button
      variant="contained"
      onClick={onAdvance}
      sx={{ background: ExerciseStatusColors[(status + 1) as ExerciseStatus], fontSize: 16 }}
    >
      {buttonLabels[status]}
    </Button>
  );

export default ExerciseButton;
