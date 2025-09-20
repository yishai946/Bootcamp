import ErrorAlert from '@components/ErrorAlert';
import useGetUserEvents from '@hooks/Events/useGetUserEvents';
import { useUser } from '@providers/UserProvider';
import UpcomingEventsSkeleton from '@skeletons/UpcomingEventsSkeleton';
import UpcomingEvents from '.';

const UpcomingEventsDisplay = () => {
  const { user } = useUser();
  const { upcomingEvents, error, loading, retry } = useGetUserEvents(user?.id || '');

  return loading ? (
    <UpcomingEventsSkeleton />
  ) : error ? (
    <ErrorAlert error={error} width="49%" retry={retry} />
  ) : (
    <UpcomingEvents events={upcomingEvents} />
  );
};

export default UpcomingEventsDisplay;
