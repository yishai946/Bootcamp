import { Controller, useFormContext } from 'react-hook-form';
import { FormControlLabel, Switch, SwitchProps } from '@mui/material';

type Props = Omit<SwitchProps, 'onChange' | 'checked'> & {
  name: string;
  label: string;
};

export default function RHFSwitch({ name, label, ...rest }: Props) {
  const { control } = useFormContext();
  
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Switch
              {...rest}
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          }
          label={label}
        />
      )}
    />
  );
}
