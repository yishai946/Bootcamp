import Row from '@components/Containers/Row';
import UserEvent from '@entities/UserEvent';
import { EventTypeNames } from '@enums/EventType';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { formatDate } from '@utils/helperFuncs';
import DeleteIcon from '@mui/icons-material/Delete';

interface EventDetailsModalProps {
  isOpen: boolean;
  event: UserEvent | null;
  onClose: () => void;
  onEdit?: (event: UserEvent) => void;
  onDelete?: (eventId: string) => void;
}

const EventDetailsModal = ({ isOpen, event, onClose, onEdit, onDelete }: EventDetailsModalProps) => (
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
                {event.end ? 'תחילת האירוע' : 'תאריך'}
              </Typography>
              <Typography variant="body1">{formatDate(event.start, !event.allDay)}</Typography>
            </Stack>
            {event.end && (
              <Stack>
                <Typography variant="subtitle2" color="text.secondary">
                  סיום האירוע
                </Typography>
                <Typography variant="body1">{formatDate(event.end, !event.allDay)}</Typography>
              </Stack>
            )}
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
          {onEdit && onDelete && (
            <Row justifyContent="space-between" width="100%">
              <IconButton
                onClick={() => onDelete(event.id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
              <Button onClick={() => onEdit(event)} variant="contained" color="warning">
                עריכה
              </Button>
            </Row>
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
