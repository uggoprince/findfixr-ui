'use client';

import { BaseLayout } from '@/components/layout/BaseLayout';
import AuthenticatedHomePage from '@/components/pages/HomePage';
import { LandingPage } from '@/components/pages/LandingPage';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  return (
    <BaseLayout className="min-h-screen bg-white">
      {!isAuthenticated && !isLoading && <LandingPage />}
      {isAuthenticated && <AuthenticatedHomePage />}
    </BaseLayout>
  );
}
