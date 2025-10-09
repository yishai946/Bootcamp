import Row from '@components/Containers/Row';
import Logo from '@components/Logo';
import { AppBar, Button, Divider, IconButton, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Pages from '../Router/Pages';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import { useUser } from '@providers/UserProvider';

const Navbar = () => {
  const { logout } = useUser();

  return (
    <AppBar position="sticky">
      <Row justifyContent="space-between" alignItems="center" p={2}>
        <Row justifyContent="flex-start" alignItems="center" gap={3}>
          <Logo />
          <Divider orientation="vertical" flexItem />
          {Pages.map(
            ({ path, title, isVisibleInMenu, icon }) =>
              isVisibleInMenu && (
                <NavLink to={path} key={path}>
                  {({ isActive }) => (
                    <Button
                      sx={{ gap: 1 }}
                      color="secondary"
                      variant={isActive ? 'contained' : 'outlined'}
                    >
                      {icon}
                      <Typography fontWeight={600}>{title}</Typography>
                    </Button>
                  )}
                </NavLink>
              )
          )}
        </Row>
        <IconButton color="secondary" onClick={logout}>
          <MeetingRoomRoundedIcon />
        </IconButton>
      </Row>
    </AppBar>
  );
};

export default Navbar;
