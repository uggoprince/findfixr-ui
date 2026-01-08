'use client';

import React, { useState } from 'react';
import { Header } from '@/components/shared/Header';
import { SignupForm } from './signup-form';

type UserType = 'customer' | 'technician';

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white flex flex-col">
      {/* Header */}
      <Header
        showBackToHome={false}
        isAuthenticated={false}
        onMenuClick={() => {}}
      />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-2xl">
          {/* SignUp Card */}
          <SignupForm />

          {/* Security Note */}
          <p className="text-center mt-6 text-sm text-gray-500">
            Your data is protected with 256-bit encryption
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;
