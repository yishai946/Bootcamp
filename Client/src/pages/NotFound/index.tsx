import Center from '@components/Containers/Center';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Center flexDirection="column" width="100%" height="100%" gap={3}>
      <Typography variant="h3">עמוד לא נמצא</Typography>
      <Typography variant="h5">העמוד הזה הוא לא חלק מהחפיפה...</Typography>
      <Button variant="contained" onClick={() => navigate('/')}>
        חזרה לדף הבית
      </Button>
    </Center>
  );
};

export default NotFound;
