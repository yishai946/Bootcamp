import Exercise from '@entities/Excercise';
import { ExerciseStatus, ExerciseStatusColors, ExerciseStatusIcons } from '@enums/ExerciseStatus';
import { Box, Step, StepLabel, Stepper, StepperProps } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import ExerciseCard from './ExerciseCard';
import ExerciseWithStatus from '../../types/ExerciseWithStatus';

interface ExerciseStepperProps extends Pick<StepperProps, 'sx'> {
  steps: ExerciseWithStatus[];
}

const Connector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.vertical}`]: {
    marginLeft: theme.spacing(2),
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderLeftWidth: 2,
  },
}));

export const getStepIcon = (status: ExerciseStatus) => (
  <Box
    component="span"
    sx={{
      width: 32,
      height: 32,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: ExerciseStatusColors[status],
      boxShadow: 2,
      '& svg': {
        fontSize: 16,
        color: (theme) => theme.palette.common.white,
      },
    }}
  >
    {ExerciseStatusIcons[status]}
  </Box>
);

const ExerciseStepper = ({ steps, sx }: ExerciseStepperProps) => {
  if (!steps.length) return null;

  return (
    <Stepper
      activeStep={-1}
      orientation="vertical"
      connector={<Connector />}
      sx={{
        '& .MuiStepLabel-iconContainer': { pr: 2, flexShrink: 0 },
        ...sx,
      }}
    >
      {steps.map(({ exercise, status }, idx) => (
        <Step key={exercise.id}>
          <StepLabel icon={getStepIcon(status)}>
            <ExerciseCard exercise={exercise} exerciseStatus={status} />
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default ExerciseStepper;

