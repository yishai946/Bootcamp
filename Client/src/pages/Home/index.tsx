import Column from '@components/Containers/Column';
import Row from '@components/Containers/Row';
import ErrorAlert from '@components/ErrorAlert';
import { useUser } from '@providers/UserProvider';
import HomePageSkeleton from '@skeletons/HomePageSkeleton';
import teams from '../../mock/teams.json';
import ExercisesSummaryDisplay from './ExercisesSummary/ExerciseSummeryDisplay';
import Progress from './Progress/ProgressDisplay';
import UpcomingEventsDisplay from './UpcomingEvents/UpcomingEventsDisplay';
import UserInfo from './UserInfo';
import EstimatedDate from './EstimatedDate';

const HomePage = () => {
  const { user, loading, error, retry } = useUser();
  const teamName = teams.find((t) => t.id === user?.teamId)?.name || 'ללא צוות';

  return loading ? (
    <HomePageSkeleton />
  ) : !user ? (
    <ErrorAlert error={error} height="100%" retry={retry} />
  ) : (
    <Column gap={4}>
      <UserInfo name={user.name} role={user.role} teamName={teamName} />
      <ExercisesSummaryDisplay />
      <Row justifyContent="space-between">
        <UpcomingEventsDisplay />
        <Column width="48%" justifyContent="space-between">
          <Progress />
          <EstimatedDate />
        </Column>
      </Row>
    </Column>
  );
};

export default HomePage;
