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
    end: z.string().min(1, 'תאריך סיום הוא חובה'),
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
    const endDate = new Date(data.end);
    if (Number.isNaN(startDate.getTime()))
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'תאריך התחלה לא תקין',
        path: ['start'],
      });
    if (Number.isNaN(endDate.getTime()))
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'תאריך סיום לא תקין', path: ['end'] });
    if (
      !Number.isNaN(startDate.getTime()) &&
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

export const mapEventToFormValues = (event?: UserEvent | null): Partial<EventFormValues> =>
  !event
    ? {}
    : {
        title: event.title,
        type: event.type,
        start: toDatetimeLocalString(event.start),
        end: toDatetimeLocalString(event.end),
        allDay: event.allDay,
        description: event.description ?? undefined,
      };
