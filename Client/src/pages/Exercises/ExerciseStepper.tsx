import Column from '@components/Containers/Column';
import Row from '@components/Containers/Row';
import RecruitExercise from '@entities/RecruitExcercise';
import { ExerciseStatus, ExerciseStatusColors, ExerciseStatusIcons } from '@enums/ExerciseStatus';
import { Box, Divider, Step, StepLabel, Stepper, StepperProps, Typography } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import ExerciseCard from './ExerciseCard';

interface ExerciseStepperProps extends Pick<StepperProps, 'sx'> {
  exercises: RecruitExercise[];
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

const ExerciseStepper = ({ exercises, sx }: ExerciseStepperProps) => {
  if (!exercises.length) return null;

  const currentExercise =
    exercises.find((exercise) => exercise.status === ExerciseStatus.InProgress) || exercises[0];

  return (
    <Column width="100%" gap={2} px={4}>
      {currentExercise && (
        <>
          <Typography variant="h4" fontWeight={700} ml={6} mt={2}>
            תרגיל נוכחי
          </Typography>
          <Row gap={2} alignItems="center" mb={2}>
            {getStepIcon(currentExercise.status)}
            <ExerciseCard recruitExercise={currentExercise} />
          </Row>
          <Divider />
        </>
      )}
      <Typography variant="h4" fontWeight={700} ml={6}>
        תרגילים
      </Typography>
      <Stepper
        activeStep={-1}
        orientation="vertical"
        connector={<Connector />}
        sx={{
          '& .MuiStepLabel-iconContainer': { pr: 2, flexShrink: 0 },
          ...sx,
        }}
      >
        {exercises.map((recruitExercise) => (
          <Step key={recruitExercise.id}>
            <StepLabel icon={getStepIcon(recruitExercise.status)}>
              <ExerciseCard recruitExercise={recruitExercise} />
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Column>
  );
};

export default ExerciseStepper;
