import { loginSchema } from '@/schemas/login';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client/react';
import { LOGIN_MUTATION } from '@/graphql/mutations/auth';
import { useRouter } from 'next/navigation';
import { LoginMutationData, LoginMutationVariables } from '@/types/user';
import { showSuccessToast } from '@/lib/utils';

export const useLoginForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Apollo mutation
  const [loginMutation, { loading, error }] = useMutation<
    LoginMutationData,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted: (data) => {
      // Show success toast
      showSuccessToast({ title: 'Login successful!', description: `Welcome back, ${data.login.firstName}!` });
      // Store the access token in localStorage
      if (data.login.accessToken) {
        localStorage.setItem('token', data.login.accessToken);
        localStorage.setItem(
          'user',
          JSON.stringify({
            id: data.login.id,
            email: data.login.email,
            firstName: data.login.firstName,
            lastName: data.login.lastName,
          })
        );

        // Redirect to dashboard after successful login
        router.push('/dashboard');
      }
    },
    onError: (error: any) => {
      // Extract the error message from GraphQL error response
      let errorMessage = 'Login failed. Please try again.';

      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        const firstError = error.graphQLErrors[0];
        // Check if it's a validation error with custom message
        if (firstError.extensions?.code === 'VALIDATION_ERROR') {
          errorMessage =
            (firstError.extensions.errors as string) || firstError.message;
        } else {
          errorMessage = firstError.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
        form.setError('email', { message: '' });
        form.setError('password', { message: '' });
      }

      form.setError('root', {
        message: errorMessage,
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await loginMutation({
        variables: {
          credentials: {
            email: values.email,
            password: values.password,
          },
        },
      });
    } catch (err) {
      // Error handled in onError callback
      console.error('Submit error:', err);
    }
  };

  return { form, onSubmit, submitting: loading, error };
};
