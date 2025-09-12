import { Stack, StackProps } from '@mui/material';

const Row = ({ children, ...stackProps }: StackProps) => (
  <Stack direction="row" {...stackProps}>
    {children}
  </Stack>
);

export default Row;
