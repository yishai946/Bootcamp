import Center from '@components/Containers/Center';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Center width="100%" height="100%" gap={3}>
      <Typography variant="h3">גישה לא מורשית</Typography>
      <Typography variant="h5">אין לך הרשאות לגשת לעמוד הזה</Typography>
      <Button variant="contained" onClick={() => navigate('/')}>
        חזרה לדף הבית
      </Button>
    </Center>
  );
};

export default Unauthorized;
