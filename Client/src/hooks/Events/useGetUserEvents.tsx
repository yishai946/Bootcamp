import Event from '@entities/Event';
import { useEffect, useState } from 'react';
import eventsMock from '../../mock/events.json';

const useGetUserEvents = (userId: string) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | unknown>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);

      const eventsData = await new Promise<Event[] | null>((resolve) =>
        setTimeout(() => resolve(eventsMock.filter((event) => event.userId === userId)), 1000)
      );

      setEvents(eventsData || []);

      const now = new Date();
      const upcoming = (eventsData || [])
        .filter((event) => new Date(event.start) >= now)
        .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
        .slice(0, 3);

      setUpcomingEvents(upcoming);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchEvents();
    }
  }, [userId]);

  return { events, upcomingEvents, loading, error, retry: fetchEvents };
};

export default useGetUserEvents;
