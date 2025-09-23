import Column from '@components/Containers/Column';
import Row from '@components/Containers/Row';
import { ExerciseStatus } from '@enums/ExerciseStatus';
import { Typography } from '@mui/material';
import { getStepIcon } from '@pages/Exercises/ExerciseStepper';
import { formatDate } from '@utils/helperFuncs';

interface DateFieldProps {
  date: string | null | undefined;
  status: ExerciseStatus;
}

const DateField = ({ date, status }: DateFieldProps) => {
  const titleMap: Partial<Record<ExerciseStatus, string>> = {
    [ExerciseStatus.InProgress]: 'התחלה',
    [ExerciseStatus.CodeReview]: 'סקר קוד',
    [ExerciseStatus.Fixed]: 'תיקונים',
    [ExerciseStatus.Done]: 'סיום',
  };

  return (
    <Row gap={4} alignItems="center">
      {getStepIcon(status)}
      <Column alignItems="center" gap={1}>
        <Typography variant="h6">{titleMap[status]}</Typography>
        <Typography variant="body1">{date ? formatDate(date) : 'לא נקבע'}</Typography>
      </Column>
    </Row>
  );
};

export default DateField;
