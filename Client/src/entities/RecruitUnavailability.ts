import { UnavailabilityType } from '@enums/UnavailabilityType';

interface RecruitUnavailability {
  id: string;
  recruitId: string;
  type: UnavailabilityType;
  description?: string;
  startDate: string;
  workDays: number;
}

export default RecruitUnavailability;
