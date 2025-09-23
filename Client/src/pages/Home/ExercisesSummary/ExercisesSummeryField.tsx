import Column from '@components/Containers/Column';
import Row from '@components/Containers/Row';
import { Typography } from '@mui/material';
import { ReactNode } from 'react';

interface ExercisesSummaryFieldProps {
  title: string;
  subTitle: string;
  value: number;
  bgColor: string;
  icon: ReactNode;
}

const ExercisesSummaryField = ({
  title,
  subTitle,
  value,
  bgColor,
  icon,
}: ExercisesSummaryFieldProps) => {
  return (
    <Column
      sx={{ background: bgColor }}
      justifyContent="space-between"
      padding={2}
      borderRadius={2}
      height="100%"
      gap={2}
    >
      <Row justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={700} color="secondary">
          {title}
        </Typography>
        {icon}
      </Row>
      <Column>
        <Typography variant="h4" color="secondary">
          {value}
        </Typography>
        <Typography variant="subtitle1" noWrap color="secondary">
          {subTitle}
        </Typography>
      </Column>
    </Column>
  );
};

export default ExercisesSummaryField;
