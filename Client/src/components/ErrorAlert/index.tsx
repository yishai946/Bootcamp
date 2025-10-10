import Center from '@components/Containers/Center';
import { Alert, Button, StackProps } from '@mui/material';

interface ErrorAlertProps extends StackProps {
  error?: Error | string | unknown;
  retry?: () => void;
}

const ErrorAlert = ({ error, retry, ...stackProps }: ErrorAlertProps) => (
  <Center {...stackProps} gap={2}>
    <Alert severity="error" variant="outlined">
      {error instanceof Error
        ? error.message
        : error instanceof String
          ? error
          : 'שגיאה בלתי צפויה'}
    </Alert>
    {retry && (
      <Button onClick={retry} variant="contained">
        לנסות שוב
      </Button>
    )}
  </Center>
);

export default ErrorAlert;
