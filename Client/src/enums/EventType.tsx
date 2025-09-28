import { ReactNode } from 'react';
import SecurityIcon from '@mui/icons-material/Security';
import ScheduleIcon from '@mui/icons-material/Schedule';
import WeekendIcon from '@mui/icons-material/Weekend';
import CodeIcon from '@mui/icons-material/Code';
import BugReportIcon from '@mui/icons-material/BugReport';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

enum EventType {
  Guard,
  Shift,
  After,
  CR,
  FixesCheck,
  Sickness,
  DayOff,
  Other,
}

const EventTypeNames: Record<EventType, string> = {
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

const EventTypeColors: Record<EventType, string> = {
  [EventType.Guard]: '#f44336',
  [EventType.Shift]: '#2196f3',
  [EventType.After]: '#4caf50',
  [EventType.CR]: '#a18cd1',
  [EventType.FixesCheck]: '#d3b062',
  [EventType.Sickness]: '#607d8b',
  [EventType.DayOff]: '#3f51b5',
  [EventType.Other]: '#795548',
};

export { EventType, EventTypeNames, EventTypeColors };
