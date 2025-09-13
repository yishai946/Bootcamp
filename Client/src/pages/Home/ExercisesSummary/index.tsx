import { ExerciseStatus, ExerciseStatusNames } from '@enums/ExerciseStatus ';
import recruitExercises from '../../../mock/RecruitExercises.json';
import { useUser } from '@providers/UserProvider';
import Row from '@components/Containers/Row';
import ExerciseSummaryField from './ExerciseSummeryField';
import NotStartedIcon from '@mui/icons-material/HourglassEmpty';
import InProgressIcon from '@mui/icons-material/Autorenew';
import CodeReviewIcon from '@mui/icons-material/RateReview';
import FixedIcon from '@mui/icons-material/Build';
import DoneIcon from '@mui/icons-material/CheckCircle';
import ErrorAlert from '@components/ErrorAlert';
import { Box } from '@mui/material';

const ExercisesSummary = () => {
  const { user } = useUser();

  if (!user) return <ErrorAlert error="משתמש לא מחובר" />;

  const exercises = recruitExercises.filter((exercise) => exercise.recruitId === user.id);
  const exercisesSummaryFieldsInfo = [
    {
      title: ExerciseStatusNames[ExerciseStatus.NotStarted],
      subTitle: 'תרגילים שטרם החלו',
      value: exercises.filter((e) => e.status === ExerciseStatus.NotStarted).length,
      bgColor: 'linear-gradient(135deg, #a8a8a8, #d1a8a8)',
      icon: <NotStartedIcon />,
    },
    {
      title: ExerciseStatusNames[ExerciseStatus.InProgress],
      subTitle: 'תרגילים בביצוע כעת',
      value: exercises.filter((e) => e.status === ExerciseStatus.InProgress).length,
      bgColor: 'linear-gradient(135deg, #4facfe, #00f2fe)',
      icon: <InProgressIcon />,
    },
    {
      title: ExerciseStatusNames[ExerciseStatus.CodeReview],
      subTitle: 'תרגילים לסקר קוד',
      value: exercises.filter((e) => e.status === ExerciseStatus.CodeReview).length,
      bgColor: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
      icon: <CodeReviewIcon />,
    },
    {
      title: ExerciseStatusNames[ExerciseStatus.Fixed],
      subTitle: 'תרגילים לבדיקת תיקונים',
      value: exercises.filter((e) => e.status === ExerciseStatus.Fixed).length,
      bgColor: 'linear-gradient(135deg, #fddb92, #d3ef52)',
      icon: <FixedIcon />,
    },
    {
      title: ExerciseStatusNames[ExerciseStatus.Done],
      subTitle: 'תרגילים שהושלמו',
      value: exercises.filter((e) => e.status === ExerciseStatus.Done).length,
      bgColor: 'linear-gradient(135deg, #057c5879, #1bf44a)',
      icon: <DoneIcon />,
    },
  ];

  return (
    <Row justifyContent="space-between" width="100%" gap={4}>
      {exercisesSummaryFieldsInfo.map((field) => (
        <Box
          key={field.title}
          sx={{
            flex: 1,
          }}
        >
          <ExerciseSummaryField {...field} />
        </Box>
      ))}
    </Row>
  );
};

export default ExercisesSummary;
