import Event from '@entities/Event';
import { EventTypeNames } from '@enums/EventType';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { formatDate } from '@utils/helperFuncs';

interface EventDetailsModalProps {
  event: Event | null;
  onClose: () => void;
}

const EventDetailsModal = ({ event, onClose }: EventDetailsModalProps) => (
  <Dialog
    open={Boolean(event)}
    onClose={onClose}
    fullWidth
    maxWidth="sm"
    aria-labelledby="event-details-title"
  >
    {event && (
      <>
        <DialogTitle id="event-details-title">{event.title}</DialogTitle>
        <DialogContent dividers>
          <Stack gap={2}>
            <Stack>
              <Typography variant="subtitle2" color="text.secondary">
                סוג האירוע
              </Typography>
              <Typography variant="body1">{EventTypeNames[event.type]}</Typography>
            </Stack>
            <Stack>
              <Typography variant="subtitle2" color="text.secondary">
                תחילת האירוע
              </Typography>
              <Typography variant="body1">{formatDate(event.startTime)}</Typography>
            </Stack>
            <Stack>
              <Typography variant="subtitle2" color="text.secondary">
                סיום האירוע
              </Typography>
              <Typography variant="body1">{formatDate(event.endTime)}</Typography>
            </Stack>
            <Stack>
              <Typography variant="subtitle2" color="text.secondary">
                תיאור
              </Typography>
              <Typography variant="body1">
                {event.description ?? 'אין תיאור זמין לאירוע זה.'}
              </Typography>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="contained" color="primary">
            סגירה
          </Button>
        </DialogActions>
      </>
    )}
  </Dialog>
);

export default EventDetailsModal;
