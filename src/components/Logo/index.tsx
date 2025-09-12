import Column from '@components/Containers/Column';
import { Typography } from '@mui/material';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import Row from '@components/Containers/Row';
import { use } from 'react';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();
  
  return (
    <Row onClick={() => navigate('/')} gap={2} alignItems="center" style={{ cursor: 'pointer' }}>
      <SchoolRoundedIcon sx={{ fontSize: 36 }} />
      <Column>
        <Typography fontSize="1rem" fontWeight="bold">
          BootCamp
        </Typography>
        <Typography fontSize="0.85rem">ניהול חפיפה</Typography>
      </Column>
    </Row>
  );
};

export default Logo;
