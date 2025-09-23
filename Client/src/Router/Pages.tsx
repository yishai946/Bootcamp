import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Exercise from '@pages/Exercise';
import NotFound from '@pages/NotFound';
import { lazy } from 'react';

const Calendar = lazy(() => import('@pages/Calendar'));
const Home = lazy(() => import('@pages/Home'));
const Exercises = lazy(() => import('@pages/Exercises'));

interface Page {
  path: string;
  element: React.ReactNode;
  title?: string;
  isVisibleInMenu: boolean;
  icon?: React.ReactNode;
}

const Pages: Page[] = [
  {
    path: '/',
    element: <Home />,
    title: 'בית',
    isVisibleInMenu: true,
    icon: <HomeRoundedIcon />,
  },
  {
    path: '/exercises',
    element: <Exercises />,
    title: 'תרגילים',
    isVisibleInMenu: true,
    icon: <CheckBoxRoundedIcon />,
  },
  {
    path: '/calendar',
    element: <Calendar />,
    title: 'לוח שנה',
    isVisibleInMenu: true,
    icon: <CalendarMonthRoundedIcon />,
  },
  {
    path: '/exercise/:id',
    element: <Exercise />,
    isVisibleInMenu: false,
  },
  {
    path: '*',
    element: <NotFound />,
    isVisibleInMenu: false,
  },
];

export default Pages;
