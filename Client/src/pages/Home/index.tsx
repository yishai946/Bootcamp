import { RoleNames } from '@enums/Role';
import { Box, Typography } from '@mui/material';
import { useUser } from '@providers/UserProvider';
import teams from '../../mock/teams.json';
import HomePageSkeleton from '@skeletons/HomePageSkeleton';
import ErrorAlert from '@components/ErrorAlert';

const Home = () => {
  const { user, loading, error, retry } = useUser();
  const team = teams.find((t) => t.id === user?.teamId);

  return loading ? (
    <Typography variant="h5" color="textSecondary">
      <HomePageSkeleton />
    </Typography>
  ) : !user ? (
    <ErrorAlert error={error} height="100%" retry={retry} />
  ) : (
    <Box>
      <Typography variant="h3" fontWeight={700}>
        {`שלום ${user?.name}`}
      </Typography>
      <Typography variant="h5" color="textSecondary">
        {RoleNames[user.role]} • {team?.name}
      </Typography>
    </Box>
  );
};

export default Home;
