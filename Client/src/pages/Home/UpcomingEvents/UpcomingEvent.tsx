import Row from '@components/Containers/Row';
import UserEvent from '@entities/UserEvent';
import { EventTypeIcons } from '@enums/EventType';
import { Button, Typography } from '@mui/material';
import { formatDate } from '@utils/helperFuncs';

interface UpcomingEventProps {
  event: UserEvent;
  onSelect?: (event: UserEvent) => void;
}

const UpcomingEvent = ({ event, onSelect }: UpcomingEventProps) => (
  <Button
    color="inherit"
    sx={{ border: '1px solid #cccccc8b', p: 2 }}
    onClick={() => onSelect?.(event)}
  >
    <Row justifyContent="space-between" width="100%" alignItems="center">
      <Row gap={2} alignItems="center">
        {EventTypeIcons[event.type]}
        <Typography variant="h6">{event.title}</Typography>
      </Row>
      <Typography variant="body1">{formatDate(event.start)}</Typography>
    </Row>
  </Button>
);

export default UpcomingEvent;
