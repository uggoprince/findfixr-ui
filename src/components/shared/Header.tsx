'use client';

import { Menu, Search, Bell, Wrench, ArrowLeft, LogOut, User, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { APP_NAME } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/constants/constants';

interface HeaderProps {
  onMenuClick: () => void;
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
  isAuthenticated?: boolean;
  showBackToHome?: boolean;
}

export function Header({
  onMenuClick,
  userName = 'User',
  userAvatar,
  notificationCount = 0,
  showBackToHome = false,
}: Readonly<HeaderProps>) {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push(ROUTES.LOGIN);
  };
  return (
    <header className="sticky w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <button
                onClick={onMenuClick}
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-card border border-transparent hover:bg-muted hover:border-border transition-all">
                <Menu className="w-5 h-5" />
              </button>
            )}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-primary to-primary-700 flex items-center justify-center">
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-primary">{APP_NAME}</h1>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {showBackToHome && (
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Home</span>
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-card border border-transparent hover:bg-muted hover:border-border transition-all">
                  <Search className="w-5 h-5" />
                </button>
                <button className="relative w-10 h-10 rounded-xl flex items-center justify-center bg-card border border-transparent hover:bg-muted hover:border-border transition-all">
                  <Bell className="w-5 h-5" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-lg min-w-5 text-center">
                      {notificationCount}
                    </span>
                  )}
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 p-1 hover:bg-muted rounded-xl transition-all">
                      <Avatar className="w-9 h-9 ring-2 ring-white shadow-md">
                        <AvatarImage src={userAvatar} alt={userName} />
                        <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          Manage your account
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="font-semibold">
                    Log In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="font-semibold bg-linear-to-r from-primary-600 to-primary-700 shadow-md hover:shadow-lg transition-shadow">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
