'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { PUBLIC_PATHS, AUTH_PATHS, ROUTES } from '@/constants/constants';

interface ProtectedRouteProps {
  readonly children: React.ReactNode;
  readonly publicPaths?: string[];
  readonly authPaths?: string[]; // Paths that should only be accessible when NOT authenticated
}

export function ProtectedRoute({
  children,
  publicPaths = [...PUBLIC_PATHS],
  authPaths = [...AUTH_PATHS]
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Check if current path is public
  const isPublicPath = publicPaths.some(path => pathname === path || pathname.startsWith(path));

  // Check if current path is an auth page (login/signup)
  const isAuthPath = authPaths.some(path => pathname === path || pathname.startsWith(path));

  useEffect(() => {
    if (!isLoading) {
      // If authenticated and on auth page, redirect to dashboard
      if (isAuthenticated && isAuthPath) {
        router.replace(ROUTES.DASHBOARD);
      }
      // If not authenticated and not on public or auth page, redirect to login
      else if (!isAuthenticated && !isPublicPath && !isAuthPath) {
        router.replace(ROUTES.LOGIN);
      }
    }
  }, [isAuthenticated, isLoading, isPublicPath, isAuthPath, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If it's a public path, render immediately
  if (isPublicPath && !isLoading) {
    return <>{children}</>;
  }

  // Show loading state while checking authentication
  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  //     </div>
  //   );
  // }

  // If authenticated and on auth page, don't render (redirect will happen)
  if (isAuthenticated && isAuthPath) {
    return null;
  }

  // If not authenticated and not on auth or public page, don't render (redirect will happen)
  if (!isAuthenticated && !isAuthPath && !isPublicPath) {
    return null;
  }

  return <>{children}</>;
}
