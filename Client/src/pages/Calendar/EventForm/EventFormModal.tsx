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
import { useEffect, useMemo, useState } from 'react';
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
import Row from '@components/Containers/Row';

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EventFormSubmitValues) => void | Promise<void>;
  event?: UserEvent | null;
  disableRecurring?: boolean;
}

const EventFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  event,
  disableRecurring,
}: EventFormModalProps) => {
  const isEditing = !!event;
  const [userChangedEndDate, setUserChangedEndDate] = useState(false);

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

  const { watch, setValue, getValues, handleSubmit, reset, formState } = methods;

  const isAllDay = watch('allDay');
  const isRecurring = watch('isRecurring');
  const start = watch('start');

  useEffect(() => {
    if (formState.dirtyFields.end) {
      setUserChangedEndDate(true);
    }
  }, [formState.dirtyFields.end]);

  useEffect(() => {
    if (start && !userChangedEndDate) {
      const startDate = new Date(start);
      const currentEnd = getValues('end');
      const currentEndDate = currentEnd ? new Date(currentEnd) : null;

      if (!currentEndDate || currentEndDate <= startDate) {
        const newEnd = new Date(startDate);
        newEnd.setHours(startDate.getHours() + 1);
        const local = newEnd.toLocaleString('sv-SE').replace(' ', 'T').slice(0, 16);
        setValue('end', local, { shouldDirty: true });
      }
    }
  }, [getValues, setValue, start, userChangedEndDate]);

  const handleFormSubmit = async (values: EventFormValues) => {
    const trimmedDescription = values.description?.trim();
    const normalizedValues: EventFormValues = {
      ...values,
      start: new Date(values.start).toISOString(),
      end: values.end ? new Date(values.end).toISOString() : undefined,
      description: trimmedDescription ? trimmedDescription : undefined,
      until: values.until
        ? new Date(values.until).toISOString()
        : undefined,
    };

    await onSubmit({ ...normalizedValues, id: event?.id });
    reset(resolvedDefaultValues);
  };

  const handleCancel = () => {
    reset(resolvedDefaultValues);
    onClose();
  };

  const submitLabel = isEditing ? 'שמור שינויים' : 'צור אירוע';
  const dialogTitle = isEditing ? 'ערוך אירוע' : 'צור אירוע חדש';

  return (
    <Dialog
      open={isOpen}
      onClose={handleCancel}
      fullWidth
      maxWidth="sm"
      aria-labelledby="event-form-title"
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <DialogTitle id="event-form-title">{dialogTitle}</DialogTitle>
          <DialogContent dividers>
            <Stack gap={3}>
              <RHFTextField name="title" label="שם האירוע" required />
              <EventTypeSelect />
              <Row width="100%" justifyContent="space-around">
                <RHFSwitch name="allDay" label="כל היום" />
                <RHFSwitch
                  name="isRecurring"
                  label="האם האירוע מחזורי?"
                  disabled={disableRecurring}
                />
              </Row>
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
              {isRecurring && (
                <Stack gap={2}>
              <RHFSelect
                    name="frequency"
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
                    name="until"
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
              disabled={formState.isSubmitting}
            >
              {formState.isSubmitting ? 'שומר...' : submitLabel}
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
};

export default EventFormModal;
