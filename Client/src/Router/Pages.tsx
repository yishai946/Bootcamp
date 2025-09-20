import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { lazy } from 'react';

const Calendar = lazy(() => import('@pages/Calendar'));
const Home = lazy(() => import('@pages/Home'));
const Tasks = lazy(() => import('@pages/Tasks'));

interface Page {
  path: string;
  element: React.ReactNode;
  title: string;
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
    element: <Tasks />,
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
];

export default Pages;
