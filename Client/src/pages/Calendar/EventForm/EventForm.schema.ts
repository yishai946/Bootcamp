// eventForm.schema.ts
import { z } from 'zod';
import { EventType } from '@enums/EventType';
import UserEvent from '@entities/UserEvent';
import { toDatetimeLocalString } from '@utils/helperFuncs';

export const eventFormSchema = z
  .object({
    title: z.string().trim().min(1, 'שם האירוע הוא חובה'),
    type: z.nativeEnum(EventType),
    start: z.string().min(1, 'תאריך התחלה הוא חובה'),
    end: z.string().optional(),
    allDay: z.boolean(),
    description: z
      .string()
      .trim()
      .max(500, 'עד 500 תווים')
      .optional()
      .transform((value) => (value === '' ? undefined : value)),
  })
  .superRefine((data, ctx) => {
    const startDate = new Date(data.start);
    const hasEnd = typeof data.end === 'string' && data.end.trim() !== '';
    const endDate = hasEnd ? new Date(data.end!) : null;

    if (Number.isNaN(startDate.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'תאריך התחלה לא תקין',
        path: ['start'],
      });
    }

    if (!data.allDay && !hasEnd) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'תאריך סיום הוא חובה',
        path: ['end'],
      });
    }

    if (hasEnd && endDate && Number.isNaN(endDate.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'תאריך סיום לא תקין',
        path: ['end'],
      });
    }

    if (
      !Number.isNaN(startDate.getTime()) &&
      hasEnd &&
      endDate &&
      !Number.isNaN(endDate.getTime()) &&
      endDate < startDate
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'תאריך סיום חייב להיות אחרי התחלה',
        path: ['end'],
      });
    }
  });

export type EventFormValues = z.infer<typeof eventFormSchema>;
export type EventFormSubmitValues = EventFormValues & { id?: string };

export const DEFAULT_VALUES: EventFormValues = {
  title: '',
  type: EventType.Other,
  start: '',
  end: '',
  allDay: false,
  description: undefined,
};

const toDateOnlyLocalString = (value: Date | string) => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const mapEventToFormValues = (event?: UserEvent | null): Partial<EventFormValues> =>
  !event
    ? {}
    : {
        title: event.title,
        type: event.type,
        start: event.allDay ? toDateOnlyLocalString(event.start) : toDatetimeLocalString(event.start),
        end: event.allDay
          ? toDateOnlyLocalString(event.end ?? event.start)
          : toDatetimeLocalString(event.end ?? event.start),
        allDay: event.allDay,
        description: event.description ?? undefined,
      };

