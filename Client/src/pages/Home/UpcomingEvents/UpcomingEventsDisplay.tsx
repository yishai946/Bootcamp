import ErrorAlert from '@components/ErrorAlert';
import { useUser } from '@providers/UserProvider';
import UpcomingEventsSkeleton from '@skeletons/UpcomingEventsSkeleton';
import UpcomingEvents from '.';
import { useQuery } from '@tanstack/react-query';
import { getUserCalendar } from '@api/endpoints/events';

const from = new Date();

const UpcomingEventsDisplay = () => {
  const { user } = useUser();
  const {
    data: events,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ['userCalendar', user?.id, 3, from.getDate()],
    queryFn: () => getUserCalendar(user!.id, 3, from),
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
