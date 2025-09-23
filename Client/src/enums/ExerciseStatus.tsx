/* eslint-disable no-unused-vars */
import { ReactNode } from 'react';
import NotStartedIcon from '@mui/icons-material/HourglassEmpty';
import InProgressIcon from '@mui/icons-material/Autorenew';
import CodeReviewIcon from '@mui/icons-material/RateReview';
import FixedIcon from '@mui/icons-material/Build';
import DoneIcon from '@mui/icons-material/CheckCircle';

enum ExerciseStatus {
  NotStarted,
  InProgress,
  CodeReview,
  Fixed,
  Done,
}

const ExerciseStatusNames: Record<ExerciseStatus, string> = {
  [ExerciseStatus.NotStarted]: 'לא התחיל',
  [ExerciseStatus.InProgress]: 'בתהליך',
  [ExerciseStatus.CodeReview]: 'סקר קוד',
  [ExerciseStatus.Fixed]: 'תוקן',
  [ExerciseStatus.Done]: 'הושלם',
};

const ExerciseStatusColors: Record<ExerciseStatus, string> = {
  [ExerciseStatus.NotStarted]: 'linear-gradient(135deg, #7a7a7a, #b07a7a)',
  [ExerciseStatus.InProgress]: 'linear-gradient(135deg, #3a8fde, #0082de)',
  [ExerciseStatus.CodeReview]: 'linear-gradient(135deg, #7a6cb1, #d1a2cb)',
  [ExerciseStatus.Fixed]: 'linear-gradient(135deg, #d3b062, #b3cf42)',
  [ExerciseStatus.Done]: 'linear-gradient(135deg, #046c4879, #17d43a)',
};

const ExerciseStatusSimplifiedColors: Record<ExerciseStatus, string> = {
  [ExerciseStatus.NotStarted]: '#a8a8a8',
  [ExerciseStatus.InProgress]: '#4facfe',
  [ExerciseStatus.CodeReview]: '#a18cd1',
  [ExerciseStatus.Fixed]: '#d3b062',
  [ExerciseStatus.Done]: '#057c5879',
};

const ExerciseStatusIcons: Record<ExerciseStatus, ReactNode> = {
  [ExerciseStatus.NotStarted]: <NotStartedIcon style={{ color: 'white' }} />,
  [ExerciseStatus.InProgress]: <InProgressIcon style={{ color: 'white' }} />,
  [ExerciseStatus.CodeReview]: <CodeReviewIcon style={{ color: 'white' }} />,
  [ExerciseStatus.Fixed]: <FixedIcon style={{ color: 'white' }} />,
  [ExerciseStatus.Done]: <DoneIcon style={{ color: 'white' }} />,
};

const ExerciseStatusSubtitle: Record<ExerciseStatus, string> = {
  [ExerciseStatus.NotStarted]: 'תרגילים שטרם החלו',
  [ExerciseStatus.InProgress]: 'תרגילים בביצוע כעת',
  [ExerciseStatus.CodeReview]: 'תרגילים לסקר קוד',
  [ExerciseStatus.Fixed]: 'תרגילים לבדיקת תיקונים',
  [ExerciseStatus.Done]: 'תרגילים שהושלמו',
};

const STATUSES: ExerciseStatus[] = [
  ExerciseStatus.NotStarted,
  ExerciseStatus.InProgress,
  ExerciseStatus.CodeReview,
  ExerciseStatus.Fixed,
  ExerciseStatus.Done,
];

export {
  ExerciseStatus,
  ExerciseStatusNames,
  ExerciseStatusColors,
  ExerciseStatusIcons,
  ExerciseStatusSubtitle,
  ExerciseStatusSimplifiedColors,
  STATUSES,
};
