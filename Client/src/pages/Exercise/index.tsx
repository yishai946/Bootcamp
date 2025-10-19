import Column from '@components/Containers/Column';
import ErrorAlert from '@components/ErrorAlert';
import { Box, Divider } from '@mui/material';
import { useUser } from '@providers/UserProvider';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import LoadingScreen from '../../Router/LoadingScreen';
import ExerciseButton from './ExerciseButton';
import ExerciseDates from './ExerciseDates';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { advanceRecruitExerciseStatus, getById } from '@api/endpoints/recruitExercises';
import { useMessage } from '@providers/MessageProvider';

const Exercise = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const { handleChange } = useMessage();
  const queryClient = useQueryClient();

  const {
    data: recruitExercise,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ['recruitExercise', id],
    queryFn: ({ queryKey }) => getById(queryKey[1]!),
    enabled: !!id,
  });

  const advanceExerciseMutation = useMutation({
    mutationFn: (id: string) => advanceRecruitExerciseStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recruitExercise', id] });
      queryClient.invalidateQueries({ queryKey: ['recruitExercises', user?.id] });
      handleChange('סטטוס התרגיל קודם בהצלחה', 'success');
    },
    onError: (error) => {
      console.error('Failed to advance exercise status:', error);
      handleChange('לא הצלחנו לעדכן את סטטוס התרגיל. אנא נסה שוב.', 'error');
    },
  });

  const handleAdvanceExercise = () => {
    advanceExerciseMutation.mutate(id!);
  };

  return isPending ? (
    <LoadingScreen />
  ) : error ? (
    <ErrorAlert error={error} retry={refetch} />
  ) : (
    <Column gap={4} mb={2} pt={0}>
      <Box dir={recruitExercise.exercise.rtl ? 'rtl' : 'ltr'} mt={2}>
        <ReactMarkdown>{recruitExercise.exercise.content}</ReactMarkdown>
      </Box>
      <Divider />
      <ExerciseDates recruitExercise={recruitExercise} />
      <Divider />
      <ExerciseButton status={recruitExercise.status} onAdvance={handleAdvanceExercise} />
    </Column>
  );
};

export default Exercise;
