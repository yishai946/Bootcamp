// eventForm.schema.ts
import { z } from 'zod';
import { EventType } from '@enums/EventType';
import UserEvent from '@entities/UserEvent';
import { toDatetimeLocalString } from '@utils/helperFuncs';
import { RecurrenceFrequency } from '@enums/RecurrenceFrequency';

export const eventFormSchema = z
  .object({
    title: z.string().trim().min(1, 'שם האירוע הוא חובה'),
    type: z.nativeEnum(EventType),
    start: z.string().min(1, 'תאריך התחלה הוא חובה'),
    end: z.string().optional(),
    allDay: z.boolean(),
    isRecurring: z.boolean(),
    frequency: z.nativeEnum(RecurrenceFrequency),
    interval: z.coerce
      .number({ invalid_type_error: 'תדירות חייבת להיות מספר' })
      .int('יש להזין מספר שלם')
      .min(1, 'המרווח חייב להיות לפחות 1'),
    until: z
      .string()
      .optional()
      .transform((value) => (value === '' ? undefined : value)),
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

    if (data.isRecurring) {
      if (data.interval < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'המרווח חייב להיות לפחות 1',
          path: ['interval'],
        });
      }

      if (data.until) {
        const recurrenceEnd = new Date(data.until);
        if (Number.isNaN(recurrenceEnd.getTime())) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'תאריך סיום מחזור לא תקין',
            path: ['until'],
          });
        } else if (!Number.isNaN(startDate.getTime()) && recurrenceEnd < startDate) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'תאריך סיום המחזור חייב להיות אחרי תאריך ההתחלה',
            path: ['until'],
          });
        }
      }

      if (!data.allDay && !hasEnd) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'אירוע מחזורי חייב לכלול תאריך סיום',
          path: ['end'],
        });
      }
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
  isRecurring: false,
  frequency: RecurrenceFrequency.Weekly,
  interval: 1,
  until: '',
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
        start: event.allDay
          ? toDateOnlyLocalString(event.start)
          : toDatetimeLocalString(event.start),
        end: event.allDay
          ? toDateOnlyLocalString(event.end ?? event.start)
          : toDatetimeLocalString(event.end ?? event.start),
        allDay: event.allDay,
        isRecurring: false,
        frequency: RecurrenceFrequency.Weekly,
        interval: 1,
        until: '',
        description: event.description ?? undefined,
      };
