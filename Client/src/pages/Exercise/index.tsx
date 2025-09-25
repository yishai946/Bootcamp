import Column from '@components/Containers/Column';
import ErrorAlert from '@components/ErrorAlert';
import useGetExercise from '@hooks/Exercises/useGetExercise';
import useGetUserExercises from '@hooks/RecruitExercises/useGetUserExercises';
import { Box, Divider } from '@mui/material';
import { useUser } from '@providers/UserProvider';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import LoadingScreen from '../../Router/LoadingScreen';
import ExerciseButton from './ExerciseButton';
import ExerciseDates from './ExerciseDates';

const Exercise = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();

  const { exercise, loading, error, retry } = useGetExercise(id);
  const {
    exercises,
    loading: exercisesLoading,
    error: exercisesError,
    retry: exercisesRetry,
  } = useGetUserExercises(user?.id);

  const recruitExercise = exercises?.find((exercise) => exercise.id === id);

  return loading || exercisesLoading ? (
    <LoadingScreen />
  ) : !exercise || !recruitExercise ? (
    <ErrorAlert error={error || exercisesError} retry={error ? retry : exercisesRetry} />
  ) : (
    <Column gap={4} mb={2} pt={0}>
      <Box dir={exercise.rtl ? 'rtl' : 'ltr'} mt={2}>
        <ReactMarkdown>{exercise?.contentFile}</ReactMarkdown>
      </Box>
      <Divider />
      <ExerciseDates exercise={exercise} recruitExercise={recruitExercise} />
      <Divider />
      <ExerciseButton status={recruitExercise.status} recruitExerciseId={recruitExercise.id} />
    </Column>
  );
};

export default Exercise;
