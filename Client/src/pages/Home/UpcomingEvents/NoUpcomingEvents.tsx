import Center from '@components/Containers/Center';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router';

const NoUpcomingEvents = () => (
  <Center flexDirection="column" mt={3} gap={2}>
    <EventBusyIcon color="action" sx={{ fontSize: 60 }} />
    <Typography variant="body1" color="textSecondary">
      אין אירועים קרובים
    </Typography>
    <Button variant="contained" color="primary" fullWidth>
      <Link to="/calendar" style={{ textDecoration: 'none', color: 'inherit' }}>
        צפייה בלוח השנה המלא
      </Link>
    </Button>
  </Center>
);

export default NoUpcomingEvents;
