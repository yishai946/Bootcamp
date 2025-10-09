import Event from '@entities/Event';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack
} from '@mui/material';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  DEFAULT_VALUES,
  eventFormSchema,
  EventFormSubmitValues,
  EventFormValues,
  mapEventToFormValues,
} from './EventForm.schema';
import EventTypeSelect from '../../../components/Fields/EventTypeSelect';
import RHFSwitch from '../../../components/Fields/RHFSwitch';
import RHFTextField from '../../../components/Fields/RHFTextField';

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EventFormSubmitValues) => void | Promise<void>;
  event?: Event | null;
}

const EventFormModal = ({ isOpen, onClose, onSubmit, event }: EventFormModalProps) => {
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
      end: new Date(values.end).toISOString(),
      description: trimmedDescription ? trimmedDescription : undefined,
    };

    await onSubmit({ ...normalizedValues, id: event?.id });
  };

  const handleCancel = () => {
    methods.reset(resolvedDefaultValues);
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
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} noValidate>
          <DialogTitle id="event-form-title">{dialogTitle}</DialogTitle>
          <DialogContent dividers>
            <Stack gap={3}>
              <RHFTextField name="title" label="שם האירוע" required />
              <EventTypeSelect />
              <RHFTextField
                name="start"
                label="תאריך התחלה"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                required
              />
              <RHFTextField
                name="end"
                label="תאריך סיום"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                required
              />
              <RHFSwitch name="allDay" label="כל היום" />
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
