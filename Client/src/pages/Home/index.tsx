import Column from '@components/Containers/Column';
import ErrorAlert from '@components/ErrorAlert';
import { Typography } from '@mui/material';
import { useUser } from '@providers/UserProvider';
import HomePageSkeleton from '@skeletons/HomePageSkeleton';
import teams from '../../mock/teams.json';
import ExercisesSummaryDisplay from './ExercisesSummary/ExerciseSummeryDisplay';
import UserInfo from './UserInfo';

const HomePage = () => {
  const { user, loading, error, retry } = useUser();
  const teamName = teams.find((t) => t.id === user?.teamId)?.name || 'ללא צוות';

  return loading ? (
    <Typography variant="h5" color="textSecondary">
      <HomePageSkeleton />
    </Typography>
  ) : !user ? (
    <ErrorAlert error={error} height="100%" retry={retry} />
  ) : (
    <Column gap={4}>
      <UserInfo name={user.name} role={user.role} teamName={teamName} />
      <ExercisesSummaryDisplay />
    </Column>
  );
};

export default HomePage;
