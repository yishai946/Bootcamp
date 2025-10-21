import EventTypeSelect from '@components/Fields/EventTypeSelect';
import RHFSwitch from '@components/Fields/RHFSwitch';
import RHFTextField from '@components/Fields/RHFTextField';
import UserEvent from '@entities/UserEvent';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
} from '@mui/material';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { RecurrenceFrequencyLabels, recurrenceFrequencyOptions } from '@enums/RecurrenceFrequency';
import RHFSelect from '@components/Fields/RHFSelect';
import {
  DEFAULT_VALUES,
  eventFormSchema,
  EventFormSubmitValues,
  EventFormValues,
  mapEventToFormValues,
} from './EventForm.schema';

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EventFormSubmitValues) => void | Promise<void>;
  event?: UserEvent | null;
  disableRecurring?: boolean;
}

const EventFormModal = ({ isOpen, onClose, onSubmit, event, disableRecurring }: EventFormModalProps) => {
  const isEditing = !!event;

  const resolvedDefaultValues = useMemo<EventFormValues>(
    () => ({
      ...DEFAULT_VALUES,
      ...mapEventToFormValues(event),
    }),
    [event]
  );

  const methods = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: resolvedDefaultValues,
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset(resolvedDefaultValues);
    }
  }, [isOpen, methods.reset, resolvedDefaultValues]);

  const handleFormSubmit = async (values: EventFormValues) => {
    const trimmedDescription = values.description?.trim();
    const normalizedValues: EventFormValues = {
      ...values,
      start: new Date(values.start).toISOString(),
      end: values.end ? new Date(values.end).toISOString() : undefined,
      description: trimmedDescription ? trimmedDescription : undefined,
      recurrenceEndDate: values.recurrenceEndDate
        ? new Date(values.recurrenceEndDate).toISOString()
        : undefined,
    };

    await onSubmit({ ...normalizedValues, id: event?.id });
  };

  const handleCancel = () => {
    methods.reset(resolvedDefaultValues);
    onClose();
  };

  const submitLabel = isEditing ? 'שמור שינויים' : 'צור אירוע';
  const dialogTitle = isEditing ? 'ערוך אירוע' : 'צור אירוע חדש';

  const isAllDay = methods.watch('allDay');
  const isRecurring = methods.watch('isRecurring');

  return (
    <Dialog
      open={isOpen}
      onClose={handleCancel}
      fullWidth
      maxWidth="sm"
      aria-labelledby="event-form-title"
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} noValidate>
          <DialogTitle id="event-form-title">{dialogTitle}</DialogTitle>
          <DialogContent dividers>
            <Stack gap={3}>
              <RHFTextField name="title" label="שם האירוע" required />
              <EventTypeSelect />
              <RHFSwitch name="allDay" label="כל היום" />
              <RHFTextField
                name="start"
                label="תאריך התחלה"
                type={isAllDay ? 'date' : 'datetime-local'}
                InputLabelProps={{ shrink: true }}
                required
              />
              <RHFTextField
                name="end"
                label="תאריך סיום"
                type={isAllDay ? 'date' : 'datetime-local'}
                InputLabelProps={{ shrink: true }}
                required={!isAllDay}
              />
              <RHFSwitch
                name="isRecurring"
                label="האם האירוע מחזורי?"
                disabled={disableRecurring}
              />
              {isRecurring && (
                <Stack gap={2}>
                  <RHFSelect
                    name="recurrenceFrequency"
                    label="תדירות"
                    required
                    disabled={disableRecurring}
                  >
                    {recurrenceFrequencyOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {RecurrenceFrequencyLabels[option]}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                  <RHFTextField
                    name="recurrenceInterval"
                    label="כל כמה אירוע"
                    type="number"
                    inputProps={{ min: 1 }}
                    required
                    disabled={disableRecurring}
                  />
                  <RHFTextField
                    name="recurrenceEndDate"
                    label="תאריך סיום מחזור"
                    type={isAllDay ? 'date' : 'datetime-local'}
                    InputLabelProps={{ shrink: true }}
                    disabled={disableRecurring}
                  />
                </Stack>
              )}
              <RHFTextField name="description" label="תיאור" multiline minRows={3} />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="secondary" variant="outlined" type="button">
              ביטול
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={methods.formState.isSubmitting}
            >
              {methods.formState.isSubmitting ? 'שומר...' : submitLabel}
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
};

export default EventFormModal;
