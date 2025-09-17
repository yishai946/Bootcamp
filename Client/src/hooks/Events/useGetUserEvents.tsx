import Event from '@entities/Event';
import { useEffect, useState } from 'react';
import eventsMock from '../../mock/events.json';

const useGetUserEvents = (userId: string) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | unknown>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);

      const eventsData = await new Promise<Event[] | null>((resolve) =>
        setTimeout(() => resolve(eventsMock.filter((event) => event.userId === userId)), 1000)
      );

      setEvents(eventsData || []);
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

  return { events, loading, error, retry: fetchEvents };
};

export default useGetUserEvents;
