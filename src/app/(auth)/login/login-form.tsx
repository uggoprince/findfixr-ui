import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { APP_NAME } from '@/lib/utils';
import { EmailInput } from '@/components/composite/EmailInput';
import { Form } from '@/components/ui/form';
import { useLoginForm } from '@/hooks/login/useLoginForm';
import { PasswordInput } from '@/components/composite/PasswordInput';
import { GoogleIcon, FacebookIcon } from '@/components/icons';

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    rememberMe: false,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const { form, submitting, onSubmit } = useLoginForm();

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Login to your {APP_NAME} account</p>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3 mb-6">
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 h-auto font-medium text-gray-700"
        >
          <GoogleIcon />
          Continue with Google
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 h-auto font-medium text-gray-700"
        >
          <FacebookIcon />
          Continue with FaceBook
        </Button>
      </div>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500 font-medium">
            Or continue with email
          </span>
        </div>
      </div>

      {/* Login Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {form.formState.errors.root && (
            <div className="text-red-600 text-sm">
              {form.formState.errors.root.message}
            </div>
          )}

          {/* Email Input */}
          <div>
            <EmailInput
              type="email"
              id="email"
              control={form.control}
              name="email"
              label="Email Address"
              placeholder="you@example.com"
              required
              disabled={submitting}
            />
          </div>

          {/* Password Input */}
          <div>
            <PasswordInput
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              required
              disabled={submitting}
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 focus:ring-2"
              />
              <span className="text-sm font-medium text-gray-700">
                Remember me
              </span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition h-auto"
            loading={submitting}
          >
            Login
          </Button>
        </form>
      </Form>

      {/* Sign Up Link */}
      <p className="text-center mt-6 text-gray-600">
        Don't have an account?{' '}
        <Link
          href="/signup"
          className="font-semibold text-primary-600 hover:text-primary-700 transition"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};
