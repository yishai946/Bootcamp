import Row from '@components/Containers/Row';
import Logo from '@components/Logo';
import { AppBar, Button, Divider, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Pages from '../AppRouter/Pages';

const Navbar = () => (
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
  </AppBar>
);

export default Navbar;
