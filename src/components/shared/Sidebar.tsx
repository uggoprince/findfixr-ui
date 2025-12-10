'use client';

import { Home, Search, Heart, Calendar, MessageCircle, Settings, Wrench, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { icon: Home, label: 'Home', href: '/', active: true },
  { icon: Search, label: 'Search', href: '/search', active: false },
  { icon: Heart, label: 'Favorites', href: '/favorites', active: false },
  { icon: Calendar, label: 'Bookings', href: '/bookings', active: false },
  { icon: MessageCircle, label: 'Messages', href: '/messages', active: false },
  { icon: Settings, label: 'Settings', href: '/settings', active: false },
];

export function Sidebar({ isOpen, onClose }: Readonly<SidebarProps>) {
  return (
    <>
      {/* Overlay */}
      <button
        className={cn(
          'fixed inset-0 bg-foreground/60 backdrop-blur-sm z-40 transition-all duration-300',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 w-80 h-screen bg-card shadow-2xl z-50 transition-transform duration-400 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-primary-700 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-primary">FindFixr</h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-card hover:bg-muted transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all',
                    item.active
                      ? 'bg-linear-to-br from-primary to-primary-700 text-white shadow-lg shadow-primary/25'
                      : 'text-foreground hover:bg-muted'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
