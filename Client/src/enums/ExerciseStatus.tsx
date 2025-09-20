import { ReactNode } from "react";
import NotStartedIcon from '@mui/icons-material/HourglassEmpty';
import InProgressIcon from '@mui/icons-material/Autorenew';
import CodeReviewIcon from '@mui/icons-material/RateReview';
import FixedIcon from '@mui/icons-material/Build';
import DoneIcon from '@mui/icons-material/CheckCircle';

export enum ExerciseStatus {
  NotStarted,
  InProgress,
  CodeReview,
  Fixed,
  Done,
}

export const ExerciseStatusNames: Record<ExerciseStatus, string> = {
  [ExerciseStatus.NotStarted]: 'לא התחיל',
  [ExerciseStatus.InProgress]: 'בתהליך',
  [ExerciseStatus.CodeReview]: 'סקר קוד',
  [ExerciseStatus.Fixed]: 'תוקן',
  [ExerciseStatus.Done]: 'הושלם',
};

export const ExerciseStatusColors: Record<ExerciseStatus, string> = {
  [ExerciseStatus.NotStarted]: 'linear-gradient(135deg, #a8a8a8, #d1a8a8)',
  [ExerciseStatus.InProgress]: 'linear-gradient(135deg, #4facfe, #00f2fe)',
  [ExerciseStatus.CodeReview]: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
  [ExerciseStatus.Fixed]: 'linear-gradient(135deg, #fddb92, #d3ef52)',
  [ExerciseStatus.Done]: 'linear-gradient(135deg, #057c5879, #1bf44a)',
};

export const ExerciseStatusIcons: Record<ExerciseStatus, ReactNode> = {
  [ExerciseStatus.NotStarted]: <NotStartedIcon />,
  [ExerciseStatus.InProgress]: <InProgressIcon />,
  [ExerciseStatus.CodeReview]: <CodeReviewIcon />,
  [ExerciseStatus.Fixed]: <FixedIcon />,
  [ExerciseStatus.Done]: <DoneIcon />,
}

export const ExerciseStatusSubtitle: Record<ExerciseStatus, string> = {
  [ExerciseStatus.NotStarted]: 'תרגילים שטרם החלו',
  [ExerciseStatus.InProgress]: 'תרגילים בביצוע כעת',
  [ExerciseStatus.CodeReview]: 'תרגילים לסקר קוד',
  [ExerciseStatus.Fixed]: 'תרגילים לבדיקת תיקונים',
  [ExerciseStatus.Done]: 'תרגילים שהושלמו',
};