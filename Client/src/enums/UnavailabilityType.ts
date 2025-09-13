export enum UnavailabilityType {
  Guard,
  Shift,
  After,
  Other,
}

export const UnavailabilityTypeNames: Record<UnavailabilityType, string> = {
  [UnavailabilityType.Guard]: 'שמירה',
  [UnavailabilityType.Shift]: 'תורנות',
  [UnavailabilityType.After]: 'אפטר',
  [UnavailabilityType.Other]: 'אחר',
};
