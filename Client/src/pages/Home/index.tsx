import Column from '@components/Containers/Column';
import Row from '@components/Containers/Row';
import ErrorAlert from '@components/ErrorAlert';
import { useUser } from '@providers/UserProvider';
import HomePageSkeleton from '@skeletons/HomePageSkeleton';
import teams from '../../mock/teams.json';
import EstimatedDateDisplay from './EstimatedDate/EstimatedDateDisplay';
import ExercisesSummaryDisplay from './ExercisesSummary/ExerciseSummeryDisplay';
import Progress from './Progress/ProgressDisplay';
import UpcomingEventsDisplay from './UpcomingEvents/UpcomingEventsDisplay';
import UserInfo from './UserInfo';

const HomePage = () => {
  const { user, loading, error } = useUser();

  return loading ? (
    <HomePageSkeleton />
  ) : !user ? (
    <ErrorAlert error={error} height="100%" />
  ) : (
    <Column gap={4}>
      <UserInfo name={user.name} role={user.role} teamName={user.team.name} />
      <ExercisesSummaryDisplay />
      <Row justifyContent="space-between">
        <UpcomingEventsDisplay />
        <Column width="49%" justifyContent="space-between" gap={2}>
          <Progress />
          <EstimatedDateDisplay />
        </Column>
      </Row>
    </Column>
  );
};

export default HomePage;
