import Center from '@components/Containers/Center';
import InfoContainer from '@components/Containers/InfoContainer';
import Event from '@entities/Event';
import EventIcon from '@mui/icons-material/Event';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NoUpcomingEvents from './NoUpcomingEvents';

interface UpcomingEventsProps {
  events: Event[];
}

const UpcomingEvents = ({ events }: UpcomingEventsProps) => (
  <InfoContainer
    title="אירועים קרובים"
    icon={<EventIcon color="primary" />}
    padding={2}
    width="48%"
  >
    {events.length === 0 ? (
      <NoUpcomingEvents />
    ) : (
      events.map((event) => (
        <Typography key={event.id} variant="body1">
          {event.title}
        </Typography>
      ))
    )}
  </InfoContainer>
);

export default UpcomingEvents;
