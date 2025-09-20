import { ReactNode } from 'react';
import SecurityIcon from '@mui/icons-material/Security';
import ScheduleIcon from '@mui/icons-material/Schedule';
import WeekendIcon from '@mui/icons-material/Weekend';
import CodeIcon from '@mui/icons-material/Code';
import BugReportIcon from '@mui/icons-material/BugReport';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export enum EventType {
  Guard,
  Shift,
  After,
  CR,
  FixesCheck,
  Sickness,
  DayOff,
  Other,
}

export const EventTypeNames: Record<EventType, string> = {
  [EventType.Guard]: 'שמירה',
  [EventType.Shift]: 'תורנות',
  [EventType.After]: 'אפטר',
  [EventType.CR]: 'סקר קוד',
  [EventType.FixesCheck]: 'בדיקת תיקונים',
  [EventType.Sickness]: 'מחלה',
  [EventType.DayOff]: 'יום חופש',
  [EventType.Other]: 'אחר',
};

export const EventTypeIcons: Record<EventType, ReactNode> = {
  [EventType.Guard]: <SecurityIcon />,
  [EventType.Shift]: <ScheduleIcon />,
  [EventType.After]: <WeekendIcon />,
  [EventType.CR]: <CodeIcon />,
  [EventType.FixesCheck]: <BugReportIcon />,
  [EventType.Sickness]: <CoronavirusIcon />,
  [EventType.DayOff]: <BeachAccessIcon />,
  [EventType.Other]: <MoreHorizIcon />,
};
