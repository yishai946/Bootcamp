import Center from '@components/Containers/Center';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { Typography } from '@mui/material';

const NoUpcomingEvents = () => (
  <Center flexDirection="column" mt={3} gap={2}>
    <EventBusyIcon color="action" sx={{ fontSize: 60 }} />
    <Typography variant="body1" color="textSecondary">
      אין אירועים קרובים
    </Typography>
  </Center>
);

export default NoUpcomingEvents;
