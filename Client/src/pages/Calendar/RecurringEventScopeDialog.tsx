import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';

interface RecurringEventScopeDialogProps {
  open: boolean;
  action: 'edit' | 'delete';
  onClose: () => void;
  onApplyToOccurrence: () => void;
  onApplyToSeries: () => void;
  disableOccurrence?: boolean;
}

const scopeCopy = {
  edit: {
    title: 'כיצד תרצה לעדכן את האירוע המחזורי?',
    description: 'ניתן לעדכן את המופע הנוכחי בלבד או את כל המופעים העתידיים בסדרה.',
    occurrenceLabel: 'עדכן מופע זה בלבד',
    seriesLabel: 'עדכן את כל הסדרה',
  },
  delete: {
    title: 'כיצד תרצה למחוק את האירוע המחזורי?',
    description: 'אפשר למחוק רק את המופע שבחרת או למחוק את כל הסדרה.',
    occurrenceLabel: 'מחק מופע זה בלבד',
    seriesLabel: 'מחק את כל הסדרה',
  },
} as const;

const RecurringEventScopeDialog = ({
  open,
  action,
  onClose,
  onApplyToOccurrence,
  onApplyToSeries,
  disableOccurrence,
}: RecurringEventScopeDialogProps) => {
  const copy = scopeCopy[action];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{copy.title}</DialogTitle>
      <DialogContent dividers>
        <Typography>{copy.description}</Typography>
      </DialogContent>
      <DialogActions>
        <Stack
          direction="column"
          spacing={1}
          sx={{ width: '100%' }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={onApplyToOccurrence}
            disabled={disableOccurrence}
          >
            {copy.occurrenceLabel}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={onApplyToSeries}
          >
            {copy.seriesLabel}
          </Button>
          <Button onClick={onClose}>ביטול</Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default RecurringEventScopeDialog;
