import { ExerciseStatus, ExerciseStatusColors, ExerciseStatusIcons } from '@enums/ExerciseStatus';
import { Box, Step, StepLabel, Stepper, StepperProps } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { styled } from '@mui/material/styles';

interface ExerciseStepperStep {
  id: string;
  title: string;
  status: ExerciseStatus;
}

interface ExerciseStepperProps extends Pick<StepperProps, 'sx'> {
  steps: ExerciseStepperStep[];
}

const Connector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.vertical}`]: {
    padding: 0,
    marginLeft: theme.spacing(2),
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.grey[300],
    borderLeftWidth: 2,
    minHeight: theme.spacing(4),
  },
}));

const getStepIconComponent = (status: ExerciseStatus) => {
  const StepIconComponent = ({ className }: StepIconProps) => (
    <Box
      component="span"
      className={className}
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
          fontSize: 18,
          color: theme => theme.palette.common.white,
        },
      }}
    >
      {ExerciseStatusIcons[status]}
    </Box>
  );

  StepIconComponent.displayName = 'ExerciseStepperIcon';

  return StepIconComponent;
};

const ExerciseStepper = ({ steps, sx }: ExerciseStepperProps) => {
  if (!steps.length) {
    return null;
  }

  return (
    <Stepper
      orientation="vertical"
      nonLinear
      connector={<Connector />}
      sx={{
        minWidth: 0,
        '& .MuiStep-vertical': { padding: 0 },
        '& .MuiStepLabel-root': { p: 0, m: 0 },
        '& .MuiStepLabel-iconContainer': { pr: 0 },
        '& .MuiStepLabel-labelContainer': { display: 'none' },
        ...sx,
      }}
    >
      {steps.map(({ id, status, title }) => (
        <Step
          key={id}
          sx={{
            minHeight: 0,
            alignItems: 'center',
            '&:not(:last-of-type)': { pb: 4 },
          }}
        >
          <StepLabel StepIconComponent={getStepIconComponent(status)}>{title}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default ExerciseStepper;
