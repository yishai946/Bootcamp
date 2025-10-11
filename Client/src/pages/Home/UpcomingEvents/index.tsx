import InfoContainer from '@components/Containers/InfoContainer';
import UserEvent from '@entities/UserEvent';
import EventIcon from '@mui/icons-material/Event';
import { Button } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import EventDetailsModal from '../../../components/Event/EventDetailsModal';
import NoUpcomingEvents from './NoUpcomingEvents';
import UpcomingEvent from './UpcomingEvent';
import Column from '@components/Containers/Column';

interface UpcomingEventsProps {
  events: UserEvent[];
}

const UpcomingEvents = ({ events }: UpcomingEventsProps) => {
  const [selectedEvent, setSelectedEvent] = useState<UserEvent | null>(null);

  const handleSelectEvent = (event: UserEvent) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <InfoContainer
      title="אירועים קרובים"
      icon={<EventIcon color="primary" />}
      width="49%"
      gap={2}
      justifyContent="space-between"
    >
      <Column width="100%" height="100%" gap={2}>
        {events.length === 0 ? (
          <NoUpcomingEvents />
        ) : (
          events.map((event) => (
            <UpcomingEvent key={event.id} event={event} onSelect={handleSelectEvent} />
          ))
        )}
      </Column>
      <Link to="/calendar" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Button variant="contained" color="primary" fullWidth sx={{ height: 45 }}>
          צפייה בלוח השנה המלא
        </Button>
      </Link>
      <EventDetailsModal
        isOpen={!!selectedEvent}
        event={selectedEvent}
        onClose={handleCloseModal}
      />
    </InfoContainer>
  );
};

export default UpcomingEvents;
