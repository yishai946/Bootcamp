import Row from '@components/Containers/Row';
import Event from '@entities/Event';
import { Button, Typography } from '@mui/material';

interface UpcomingEventProps {
  event: Event;
}

const formatDate = (dateString: string) => dateString.split('T')[0].split('-').reverse().join('/');

const UpcomingEvent = ({ event }: UpcomingEventProps) => (
  <Button color="inherit" sx={{ border: '1px solid #cccccc8b', p: 2 }}>
    <Row justifyContent="space-between" width="100%" alignItems="center">
      <Typography variant="h6">{event.title}</Typography>
      <Typography variant="body1">{formatDate(event.startTime)}</Typography>
    </Row>
  </Button>
);

export default UpcomingEvent;
