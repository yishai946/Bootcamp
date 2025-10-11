import UserEvent from '@entities/UserEvent';
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
  isOpen: boolean;
  event: UserEvent | null;
  onClose: () => void;
  onEdit?: (event: UserEvent) => void;
}

const EventDetailsModal = ({ isOpen, event, onClose, onEdit }: EventDetailsModalProps) => (
  <Dialog
    open={isOpen}
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
              <Typography variant="body1">{formatDate(event.start, !event.allDay)}</Typography>
            </Stack>
            <Stack>
              <Typography variant="subtitle2" color="text.secondary">
                סיום האירוע
              </Typography>
              <Typography variant="body1">{formatDate(event.end, !event.allDay)}</Typography>
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
          {onEdit && (
            <Button onClick={() => onEdit(event)} variant="contained" color="warning">
              עריכה
            </Button>
          )}
          <Button onClick={onClose} variant="contained" color="primary">
            סגירה
          </Button>
        </DialogActions>
      </>
    )}
  </Dialog>
);

export default EventDetailsModal;
