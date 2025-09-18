import InfoContainer from '@components/Containers/InfoContainer';
import Event from '@entities/Event';
import EventIcon from '@mui/icons-material/Event';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import NoUpcomingEvents from './NoUpcomingEvents';
import UpcomingEvent from './UpcomingEvent';

interface UpcomingEventsProps {
  events: Event[];
}

const UpcomingEvents = ({ events }: UpcomingEventsProps) => (
  <InfoContainer
    title="אירועים קרובים"
    icon={<EventIcon color="primary" />}
    padding={2}
    width="48%"
    gap={2}
  >
    {events.length === 0 ? (
      <NoUpcomingEvents />
    ) : (
      events.map((event) => <UpcomingEvent event={event} />)
    )}
    <Button variant="contained" color="primary" fullWidth>
      <Link to="/calendar" style={{ textDecoration: 'none', color: 'inherit' }}>
        צפייה בלוח השנה המלא
      </Link>
    </Button>
  </InfoContainer>
);

export default UpcomingEvents;
