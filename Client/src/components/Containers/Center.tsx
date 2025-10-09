import { Box, BoxProps } from '@mui/material';

const Center = ({ children, ...boxProps }: BoxProps) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    {...boxProps}
  >
    {children}
  </Box>
);

export default Center;
