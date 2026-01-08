import { loginSchema } from '@/schemas/login';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { showSuccessToast } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/constants/constants';

export const useLoginForm = () => {
  const router = useRouter();
  const { login, isLoginLoading } = useAuth();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await login(values.email, values.password);

      // Show success toast
      showSuccessToast({
        title: 'Login successful!',
        description: 'Welcome back!'
      });

      // Redirect to homepage after successful login
      router.push(ROUTES.HOME);
    } catch (err: any) {
      // Extract the error message from GraphQL error response
      let errorMessage = 'Login failed. Please try again.';

      if (err.graphQLErrors && err.graphQLErrors.length > 0) {
        const firstError = err.graphQLErrors[0];
        // Check if it's a validation error with custom message
        if (firstError.extensions?.code === 'VALIDATION_ERROR') {
          errorMessage =
            (firstError.extensions.errors as string) || firstError.message;
        } else {
          errorMessage = firstError.message;
        }
      } else if (err.message) {
        errorMessage = err.message;
        form.setError('email', { message: '' });
        form.setError('password', { message: '' });
      }

      form.setError('root', {
        message: errorMessage,
      });
    }
  };

  return { form, onSubmit, submitting: isLoginLoading };
};
