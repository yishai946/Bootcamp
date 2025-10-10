import Column from '@components/Containers/Column';
import ErrorAlert from '@components/ErrorAlert';
import { Box, Divider } from '@mui/material';
import { useUser } from '@providers/UserProvider';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import LoadingScreen from '../../Router/LoadingScreen';
import ExerciseButton from './ExerciseButton';
import ExerciseDates from './ExerciseDates';
import { useQuery } from '@tanstack/react-query';
import { getByExerciseId } from '@api/endpoints/recruitExercises';

const Exercise = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();

  const {
    data: recruitExercise,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ['recruitExercise', id, user?.id],
    queryFn: ({ queryKey }) => getByExerciseId(queryKey[1]!, queryKey[2]!),
    enabled: !!id && !!user?.id,
  });

  return isPending ? (
    <LoadingScreen />
  ) : error ? (
    <ErrorAlert error={error} retry={refetch} />
  ) : (
    <Column gap={4} mb={2} pt={0}>
      <Box dir={recruitExercise.exercise.rtl ? 'rtl' : 'ltr'} mt={2}>
        <ReactMarkdown>{recruitExercise.exercise.contentFile}</ReactMarkdown>
      </Box>
      <Divider />
      <ExerciseDates recruitExercise={recruitExercise} />
      <Divider />
      <ExerciseButton status={recruitExercise.status} recruitExerciseId={recruitExercise.id} />
    </Column>
  );
};

export default Exercise;
