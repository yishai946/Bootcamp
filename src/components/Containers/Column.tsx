import { Stack, StackProps } from '@mui/material';

const Column = ({ children, ...stackProps }: StackProps) => (
  <Stack direction="column" {...stackProps}>
    {children}
  </Stack>
);

export default Column;
