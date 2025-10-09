import Center from '@components/Containers/Center';
import Column from '@components/Containers/Column';
import RHFTextField from '@components/Fields/RHFTextField';
import Logo from '@components/Logo';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material';
import { useUser } from '@providers/UserProvider';
import { FormProvider } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
  const { login, user, error } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const loginSchema = z.object({
    username: z.string().min(1, 'שם משתמש הוא שדה חובה'),
    password: z.string().min(1, 'סיסמה היא שדה חובה'),
  });

  type loginFormValues = z.infer<typeof loginSchema>;

  const DEFAULT_VALUES: loginFormValues = {
    username: '',
    password: '',
  };

  const methods = useForm<loginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (error) {
      methods.setError('root', { type: 'manual', message: 'שם משתמש או סיסמה שגויים' });
    } else {
      methods.clearErrors('root');
    }
  }, [error, methods.setError, methods.clearErrors]);

  const onSubmit = async ({ username, password }: loginFormValues) => {
    await login(username, password);
  };

  return (
    <Center height="90vh" width="100vw" gap={3}>
      <Box mb={4} mr={4}>
        <Logo size={1.5} clickable={false} />
      </Box>
      <Typography variant="h5">התחברות</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <Column gap={2} width="300px">
            <RHFTextField name="username" label="שם משתמש" required />
            <RHFTextField name="password" label="סיסמה" type="password" required />
            {methods.formState.errors.root && (
              <Alert severity="error">{methods.formState.errors.root.message}</Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={methods.formState.isSubmitting}
              sx={{ mt: 2 }}
            >
              {methods.formState.isSubmitting ? (
                <CircularProgress size={18} sx={{ m: 0.5 }} />
              ) : (
                'התחבר'
              )}
            </Button>
          </Column>
        </form>
      </FormProvider>
    </Center>
  );
};

export default Login;
