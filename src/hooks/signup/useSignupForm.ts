import { REGISTER_MUTATION } from '@/graphql/mutations/auth';
import { showSuccessToast } from '@/lib/utils';
import { signupSchema } from '@/schemas/signup';
import { RegisterMutationData, RegisterMutationVariables } from '@/types/user';
import { useMutation } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import z from 'zod';

const getValidationErrorsFromErrorArray = (errors: any): string[] => {
  if (errors?.extensions?.code !== 'VALIDATION_ERROR') {
    return [];
  }

  const errorData = errors.extensions.errors;
  if (Array.isArray(errorData)) {
    return errorData;
  }
  if (typeof errorData === 'string') {
    return [errorData];
  }
  return [];
};

const extractValidationErrors = (error: any): string[] => {
  // Check for error.errors array (this is what we're getting)
  if (error.errors && Array.isArray(error.errors) && error.errors.length > 0) {
    const result = getValidationErrorsFromErrorArray(error.errors[0]);
    if (result.length > 0) return result;
  }

  // Fallback: Check for graphQLErrors array
  if (error.graphQLErrors && Array.isArray(error.graphQLErrors) && error.graphQLErrors.length > 0) {
    const result = getValidationErrorsFromErrorArray(error.graphQLErrors[0]);
    if (result.length > 0) return result;
  }

  return [];
};

const mapErrorToField = (errorMsg: string, form: any) => {
  const lowerMsg = errorMsg.toLowerCase();

  if (lowerMsg.includes('email')) {
    form.setError('email', { message: errorMsg });
  } else if (lowerMsg.includes('phone')) {
    form.setError('phone', { message: errorMsg });
  } else if (lowerMsg.includes('password')) {
    form.setError('password', { message: errorMsg });
  } else if (lowerMsg.includes('first name') || lowerMsg.includes('firstname')) {
    form.setError('firstName', { message: errorMsg });
  } else if (lowerMsg.includes('last name') || lowerMsg.includes('lastname')) {
    form.setError('lastName', { message: errorMsg });
  } else {
    form.setError('root', { message: errorMsg });
  }
};

export const useSignupForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
    },
  });

  // Apollo mutation
  const [registerMutation, { loading, error }] = useMutation<
    RegisterMutationData,
    RegisterMutationVariables
  >(REGISTER_MUTATION, {
    onCompleted: (data) => {
      // Show success toast
      showSuccessToast({
        title: 'Signup successful!',
        description: `Welcome back, ${data.register.firstName}!`,
      });
      // Store the access token in localStorage
      if (data.register.email) {

        // Redirect to login after successful signup
        router.push('/login');
      }
    },
    onError: (error: any) => {
      const validationErrors = extractValidationErrors(error);

      if (validationErrors.length > 0) {
        validationErrors.forEach((errorMsg: string) => {
          mapErrorToField(errorMsg, form);
        });
      } else {
        // Fallback to generic error
        form.setError('root', {
          message: error.message || 'Signup failed. Please try again.'
        });
      }
    },
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
      await registerMutation({
        variables: {
          input: {
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            password: values.password,
          },
        },
      });
  };


  return { form, onSubmit, submitting: loading, error };
};
