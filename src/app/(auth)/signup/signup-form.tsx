import { EmailInput } from '@/components/composite/EmailInput';
import { PasswordInput } from '@/components/composite/PasswordInput';
import { PersonInput } from '@/components/composite/PersonInput';
import { PhoneInput } from '@/components/composite/PhoneInput';
import { Form } from '@/components/ui/form';
import { useSignupForm } from '@/hooks/signup/useSignupForm';
import { GoogleIcon, FacebookIcon } from '@/components/icons';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

type UserType = 'customer' | 'technician';

export const SignupForm = () => {
  const [userType, setUserType] = useState<UserType>('customer');
  const [formData, setFormData] = useState({
    // fullName: '',
    // email: '',
    // phone: '',
    // location: '',
    // password: '',
    // confirmPassword: '',
    agreeToTerms: false,
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const { form, submitting, onSubmit } = useSignupForm();

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-neutral-100 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-neutral-900 mb-2">
          Create Your Account
        </h2>
        <p className="text-gray-600">Join FindFixr and get started today</p>
      </div>

      {/* User Type Selection */}
      {/* <div className="mb-8">
        <p className="text-sm font-semibold text-neutral-700 mb-3 text-center">
          I want to:
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setUserType('customer')}
            className={`relative p-6 rounded-xl border-2 transition-all ${
              userType === 'customer'
                ? 'border-primary-600 bg-primary-50 shadow-lg'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {userType === 'customer' && (
              <div className="absolute top-3 right-3 bg-primary-600 rounded-full p-1">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            )}
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="font-bold text-gray-900 mb-1">Find Services</h3>
            <p className="text-sm text-gray-600">I'm looking for technicians</p>
          </button>

          <button
            type="button"
            onClick={() => setUserType('technician')}
            className={`relative p-6 rounded-xl border-2 transition-all ${
              userType === 'technician'
                ? 'border-secondary-500 bg-secondary-50 shadow-lg'
                : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
            }`}
          >
            {userType === 'technician' && (
              <div className="absolute top-3 right-3 bg-secondary-500 rounded-full p-1">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            )}
            <div className="text-4xl mb-3">🔧</div>
            <h3 className="font-bold text-gray-900 mb-1">Offer Services</h3>
            <p className="text-sm text-gray-600">I'm a technician</p>
          </button>
        </div>
      </div> */}

      {/* Social SignUp Buttons */}
      <div className="space-y-3 mb-6">
        <Button variant={"outline"} className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-neutral-200 rounded-xl hover:border-neutral-300 hover:bg-neutral-50 transition font-medium text-neutral-700 h-auto">
          <GoogleIcon />
          Continue with Google
        </Button>

        <Button variant={"outline"} className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-neutral-200 rounded-xl hover:border-neutral-300 hover:bg-neutral-50 transition font-medium text-neutral-700 h-auto">
          <FacebookIcon />
          Continue with Facebook
        </Button>
      </div>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-neutral-500 font-medium">
            Or sign up with email
          </span>
        </div>
      </div>

      {/* SignUp Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div className="grid md:grid-cols-2 gap-5">
            <PersonInput
              type="text"
              id="firstName"
              control={form.control}
              name="firstName"
              label="First Name"
              placeholder="Enter first name"
              required
              disabled={submitting}
            />
            <PersonInput
              type="text"
              id="lastName"
              control={form.control}
              name="lastName"
              label="Last Name"
              placeholder="Enter last name"
              required
              disabled={submitting}
            />
          </div>

          {/* Email and Phone in Grid */}
          <div className="grid md:grid-cols-2 gap-5">
            {/* Email */}
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

            {/* Phone */}
            <PhoneInput
              type="tel"
              id="phone"
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="+1 (555) 000-0000"
              required
              disabled={submitting}
            />
          </div>

          {/* Location */}
          {/* <div>
            <label
              htmlFor="location"
              className="block text-sm font-semibold text-neutral-700 mb-2"
            >
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, State"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-neutral-50 border-2 border-neutral-200 focus:border-primary-600 focus:bg-white outline-none transition font-medium text-neutral-900"
                required
              />
            </div>
          </div> */}

          {/* Password and Confirm Password in Grid */}
          <div className="grid md:grid-cols-2 gap-5">
            {/* Password */}
            <PasswordInput
              control={form.control}
              name="password"
              label="Password"
              placeholder="Min. 8 characters"
              required
              disabled={submitting}
              minLength={8}
            />

            {/* Confirm Password */}
            <PasswordInput
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Repeat password"
              required
              disabled={submitting}
              minLength={8}
            />
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="w-5 h-5 mt-0.5 rounded border-neutral-300 text-primary-600 focus:ring-primary-600 focus:ring-2"
              required
            />
            <label
              htmlFor="agreeToTerms"
              className="text-sm text-neutral-700 leading-relaxed"
            >
              I agree to the{' '}
              <a
                href="/terms"
                className="font-semibold text-primary-600 hover:text-primary-700"
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href="/privacy"
                className="font-semibold text-primary-600 hover:text-primary-700"
              >
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <Button
            loading={submitting}
            type="submit"
            className={`w-full font-bold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition h-auto ${
              userType === 'technician'
                ? 'bg-linear-to-r from-secondary-500 to-secondary-600 text-white'
                : 'bg-linear-to-r from-primary-600 to-primary-700 text-white'
            }`}
          >
            Create Account
          </Button>
        </form>
      </Form>

      {/* Sign In Link */}
      <p className="text-center mt-6 text-neutral-600">
        Already have an account?{' '}
        <a
          href="/login"
          className="font-semibold text-primary-600 hover:text-primary-700 transition"
        >
          Sign in
        </a>
      </p>
    </div>
  );
};
