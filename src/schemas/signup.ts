import { z } from 'zod';

export const signupSchema = z
  .object({
    email: z.email({ message: 'Invalid email address' }),
    firstName: z.string().min(2, 'First name must be at least 2 characters long'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters long'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long'),
      // .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      // .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      // .regex(/\d/, 'Password must contain at least one number')
      // .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
    phone: z
      .string()
      .regex(
        /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
        'Please enter a valid phone number'
      )
      .optional()
      .or(z.literal('')),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
