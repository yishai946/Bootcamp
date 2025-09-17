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
