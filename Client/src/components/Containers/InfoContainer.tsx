import { Stack, StackProps, Typography } from '@mui/material';
import Row from './Row';

interface InfoContainerProps extends StackProps {
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
}

const InfoContainer = ({ children, title, icon, ...stackProps }: InfoContainerProps) => (
  <Stack
    {...stackProps}
    direction="column"
    display="flex"
    p={3}
    bgcolor="background.paper"
    border="1px solid #cccccc8b"
    borderRadius={2}
  >
    <Row alignItems="center" gap={1}>
      {icon}
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>
    </Row>
    {children}
  </Stack>
);

export default InfoContainer;
