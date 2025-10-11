import { Role } from '@enums/Role';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Exercise from '@pages/Exercise';
import NotFound from '@pages/NotFound';
import { lazy, ReactNode } from 'react';

const Calendar = lazy(() => import('@pages/Calendar'));
const Home = lazy(() => import('@pages/Home'));
const Exercises = lazy(() => import('@pages/Exercises'));
const Login = lazy(() => import('@pages/Login'));
const Unauthorized = lazy(() => import('@pages/Unauthorized'));

interface Page {
  path: string;
  element: ReactNode;
  title?: string;
  isVisibleInMenu: boolean;
  icon?: ReactNode;
  isProtected?: boolean;
  allowedRoles?: Role[];
  isPublicOnly?: boolean;
}

const Pages: Page[] = [
  {
    path: '/',
    element: <Home />,
    title: 'בית',
    isVisibleInMenu: true,
    icon: <HomeRoundedIcon />,
    isProtected: true,
    isPublicOnly: false,
    allowedRoles: [Role.Recruit],
  },
  {
    path: '/exercises',
    element: <Exercises />,
    title: 'תרגילים',
    isVisibleInMenu: true,
    icon: <CheckBoxRoundedIcon />,
    isProtected: true,
    isPublicOnly: false,
  },
  {
    path: '/calendar',
    element: <Calendar />,
    title: 'לוח שנה',
    isVisibleInMenu: true,
    icon: <CalendarMonthRoundedIcon />,
    isProtected: true,
    isPublicOnly: false,
  },
  {
    path: '/exercise/:id',
    element: <Exercise />,
    isVisibleInMenu: false,
    isProtected: true,
    isPublicOnly: false,
  },
  {
    path: '/login',
    element: <Login />,
    isVisibleInMenu: false,
    isProtected: false,
    isPublicOnly: true,
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />,
    isVisibleInMenu: false,
    isProtected: false,
    isPublicOnly: false,
  },
  {
    path: '*',
    element: <NotFound />,
    isVisibleInMenu: false,
    isProtected: false,
  },
];

export default Pages;
