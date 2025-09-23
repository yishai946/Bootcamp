import ErrorAlert from '@components/ErrorAlert';
import useGetExercise from '@hooks/Exercises/useGetExercise';
import { Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';

const Exercise = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    navigate('/NotFound');
    return null;
  }

  const { exercise, loading, error, retry } = useGetExercise(id);

  return loading ? (
    <p>Loading...</p>
  ) : error ? (
    <ErrorAlert error={error} retry={retry} />
  ) : (
    <Box dir="ltr">
      <ReactMarkdown>{exercise?.contentFile}</ReactMarkdown>
    </Box>
  );
};

export default Exercise;
