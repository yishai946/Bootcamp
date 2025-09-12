import Row from '@components/Containers/Row';
import Logo from '@components/Logo';
import { AppBar, Button, Divider, Icon, ListItemIcon, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import Pages from '../AppRouter/Pages';

const Sidebar = () => (
  <AppBar position="sticky">
    <Row justifyContent="flex-start" alignItems="center" padding={2} gap={3}>
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
                variant={isActive ? "contained" : "text"}
              >
                {icon}
                <Typography>{title}</Typography>
              </Button>
              )}
            </NavLink>
          )
      )}
    </Row>
  </AppBar>
);

export default Sidebar;
