import useGetUserEvents from '@hooks/Events/useGetUserEvents';
import UpcomingEvents from '.';
import ErrorAlert from '@components/ErrorAlert';
import { useUser } from '@providers/UserProvider';
import UpcomingEventsSkeleton from '@skeletons/UpcomingEventsSkeleton';

const UpcomingEventsDisplay = () => {
  const { user } = useUser();
  const { events, error, loading, retry } = useGetUserEvents(user?.id || '');

  return loading ? (
    <UpcomingEventsSkeleton />
  ) : error ? (
    <ErrorAlert error={error} height="100%" retry={retry} />
  ) : (
    <UpcomingEvents events={events} />
  );
};

export default UpcomingEventsDisplay;
