import Column from '@components/Containers/Column';
import Row from '@components/Containers/Row';
import { Typography } from '@mui/material';
import { ReactNode } from 'react';

interface ExerciseSummaryFieldProps {
  title: string;
  subTitle: string;
  value: number;
  bgColor: string;
  icon: ReactNode;
}

const ExerciseSummaryField = ({
  title,
  subTitle,
  value,
  bgColor,
  icon,
}: ExerciseSummaryFieldProps) => {
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
        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>
        {icon}
      </Row>
      <Column>
        <Typography variant="h4">{value}</Typography>
        <Typography variant="subtitle1" noWrap>{subTitle}</Typography>
      </Column>
    </Column>
  );
};

export default ExerciseSummaryField;
