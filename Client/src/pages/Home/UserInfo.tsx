import { Role, RoleNames } from '@enums/Role';
import { Box, Typography } from '@mui/material';

interface UserInfoProps {
  name: string;
  teamName: string;
  role: Role;
}

const UserInfo = ({ name, teamName, role }: UserInfoProps) => (
  <Box>
    <Typography variant="h3" fontWeight={700}>
      {`שלום ${name}`}
    </Typography>
    <Typography variant="h5" color="textSecondary">
      {RoleNames[role]} • {teamName}
    </Typography>
  </Box>
);

export default UserInfo;
