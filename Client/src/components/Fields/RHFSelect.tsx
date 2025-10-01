import { Controller, useFormContext } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type Props = TextFieldProps & { name: string };

const RHFSelect = ({ name, children, ...rest }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          select
          {...rest}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        >
          {children}
        </TextField>
      )}
    />
  );
};

export default RHFSelect;
