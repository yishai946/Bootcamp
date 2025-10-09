import Column from '@components/Containers/Column';
import { Typography } from '@mui/material';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import Row from '@components/Containers/Row';
import { useNavigate } from 'react-router-dom';

interface LogoProps {
  size?: number;
  clickable?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 1, clickable = true }) => {
  const navigate = useNavigate();
  
  return (
    <Row onClick={() => clickable && navigate('/')} gap={2 * size} alignItems="center" style={{ cursor: clickable ? 'pointer' : 'default' }}>
      <SchoolRoundedIcon sx={{ fontSize: 36 * size }} />
      <Column>
        <Typography fontSize={`${1 * size}rem`} fontWeight="bold">
          BootCamp
        </Typography>
        <Typography fontSize={`${0.85 * size}rem`}>ניהול חפיפה</Typography>
      </Column>
    </Row>
  );
};

export default Logo;
