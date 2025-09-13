import NotStartedIcon from '@mui/icons-material/HourglassEmpty';
import InProgressIcon from '@mui/icons-material/Autorenew';
import CodeReviewIcon from '@mui/icons-material/RateReview';
import FixedIcon from '@mui/icons-material/Build';
import DoneIcon from '@mui/icons-material/CheckCircle';
import { ExerciseStatus } from '../enums/ExerciseStatus';

export const EXERCISE_STATUS_INFO: Record<
  ExerciseStatus,
  { subTitle: string; bgColor: string; icon: React.ReactNode }
> = {
  [ExerciseStatus.NotStarted]: {
    subTitle: 'תרגילים שטרם החלו',
    bgColor: 'linear-gradient(135deg, #a8a8a8, #d1a8a8)',
    icon: <NotStartedIcon />,
  },
  [ExerciseStatus.InProgress]: {
    subTitle: 'תרגילים בביצוע כעת',
    bgColor: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    icon: <InProgressIcon />,
  },
  [ExerciseStatus.CodeReview]: {
    subTitle: 'תרגילים לסקר קוד',
    bgColor: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
    icon: <CodeReviewIcon />,
  },
  [ExerciseStatus.Fixed]: {
    subTitle: 'תרגילים לבדיקת תיקונים',
    bgColor: 'linear-gradient(135deg, #fddb92, #d3ef52)',
    icon: <FixedIcon />,
  },
  [ExerciseStatus.Done]: {
    subTitle: 'תרגילים שהושלמו',
    bgColor: 'linear-gradient(135deg, #057c5879, #1bf44a)',
    icon: <DoneIcon />,
  },
};
