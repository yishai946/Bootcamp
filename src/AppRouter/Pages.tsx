import Calendar from '@pages/Calendar';
import Home from '@pages/Home';
import Tasks from '@pages/Tasks';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

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
    path: '/tasks',
    element: <Tasks />,
    title: 'משימות',
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
