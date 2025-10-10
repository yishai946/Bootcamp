import ErrorAlert from '@components/ErrorAlert';
import { useUser } from '@providers/UserProvider';
import UpcomingEventsSkeleton from '@skeletons/UpcomingEventsSkeleton';
import UpcomingEvents from '.';
import { useQuery } from '@tanstack/react-query';
import { getUserEvents } from '@api/endpoints/events';

const LIMIT = 3;

const UpcomingEventsDisplay = () => {
  const { user } = useUser();
  const {
    data: events,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ['userEvents', user?.id, LIMIT],
    queryFn: () => getUserEvents(user!.id, LIMIT),
    enabled: !!user?.id,
  });

  return isPending ? (
    <UpcomingEventsSkeleton />
  ) : error ? (
    <ErrorAlert error={error} width="49%" retry={refetch} />
  ) : (
    <UpcomingEvents events={events} />
  );
};

export default UpcomingEventsDisplay;
