import { useState } from 'react';
import { Sidebar } from '../shared/Sidebar';
import { Header } from '../shared/Header';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import { cn } from '@/lib/utils';
import { Footer } from '../shared/Footer';
import { useAuth } from '@/contexts/AuthContext';

export const BaseLayout = ({
  children,
  className = '',
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <ProtectedRoute>
      <div className={cn('min-h-screen w-full', className)}>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          userName="Alex"
          userAvatar="https://i.pravatar.cc/150?img=12"
          notificationCount={3}
        />
          {children}
          {!isAuthenticated && <Footer />}
      </div>
    </ProtectedRoute>
  );
};
