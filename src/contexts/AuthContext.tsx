'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client/react';
import { LOGIN_MUTATION } from '@/graphql/mutations/auth';
import { User, LoginMutationData, LoginMutationVariables } from '@/types/user';
import { API_ENDPOINTS, ROUTES, HTTP_STATUS } from '@/constants/constants';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoginLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => string | null;
  setAccessToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple global token storage
let globalToken: string | null = null;
let globalSetAuth: ((auth: boolean) => void) | null = null;

export function AuthProvider({ children }: { readonly children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAuthenticatedRef = useRef(false);

  const [loginMutation, { loading: isLoginLoading }] = useMutation<LoginMutationData, LoginMutationVariables>(LOGIN_MUTATION);

  // Set up global reference
  useEffect(() => {
    globalSetAuth = (auth: boolean) => {
      isAuthenticatedRef.current = auth;
      setIsAuthenticated(auth);
    };
    return () => { globalSetAuth = null; };
  }, []);

  const getAccessToken = useCallback(() => globalToken, []);

  const setAccessToken = useCallback((token: string) => {
    globalToken = token;
    isAuthenticatedRef.current = true;
    setIsAuthenticated(true);
  }, []);

  // Login function
  const login = useCallback(async (email: string, password: string) => {
    try {
      const { data } = await loginMutation({
        variables: {
          credentials: { email, password }
        }
      });

      if (data?.login) {
        const { accessToken, ...userData } = data.login;

        // Store token in memory
        setAccessToken(accessToken);

        // Store user data
        setUser(userData);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }, [loginMutation, setAccessToken]);

  const logout = useCallback(async () => {
    try {
      // Call logout endpoint to clear refresh token cookie
      const token = globalToken;
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ENDPOINTS.AUTH.LOGOUT}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
    } catch (error) {
      console.error('Logout request failed:', error);
      // Continue with local logout even if API call fails
    } finally {
      // Clear local state regardless of API call result
      globalToken = null;
      isAuthenticatedRef.current = false;
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  // Restore session on mount using refresh token
  useEffect(() => {
    const restoreSession = async () => {
      // Skip session restoration on auth pages
      if (globalThis.window !== undefined) {
        const pathname = globalThis.window.location.pathname;
        if (pathname === ROUTES.LOGIN || pathname === ROUTES.SIGNUP) {
          setIsLoading(false);
          return;
        }
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`, {
          method: 'POST',
          credentials: 'include', // Send httpOnly cookie
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();

          if (data?.accessToken) {
            setAccessToken(data.accessToken);
            // Note: Backend doesn't return user data in refresh response
            // User will be loaded on first authenticated request
          }
        } else if (response.status === HTTP_STATUS.UNAUTHORIZED) {
          // Unauthorized - refresh token is invalid or expired
          // Clear any existing tokens and redirect to login if not already there
          logout();
          if (globalThis.window !== undefined && !globalThis.window.location.pathname.includes(ROUTES.LOGIN)) {
            globalThis.window.location.href = ROUTES.LOGIN;
          }
        }
      } catch (error) {
        console.error('Session restoration failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, [logout]);

  const value: AuthContextType = useMemo(() => ({
    user,
    isAuthenticated,
    isLoading,
    isLoginLoading,
    login,
    logout,
    getAccessToken,
    setAccessToken,
  }), [user, isAuthenticated, isLoading, isLoginLoading, login, logout, getAccessToken, setAccessToken]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function getInMemoryToken() {
  return globalToken;
}

export function setInMemoryToken(token: string | null) {
  globalToken = token;
  if (globalSetAuth) {
    globalSetAuth(!!token);
  }
}

export function getIsAuthenticated(): boolean {
  return !!globalToken;
}
