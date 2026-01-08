// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    REFRESH: '/api/auth/refresh',
    LOGOUT: '/api/auth/logout',
  },
} as const;

// App Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
} as const;

// Route Groups
export const PUBLIC_PATHS = [ROUTES.HOME] as const;
export const AUTH_PATHS = [ROUTES.LOGIN, ROUTES.SIGNUP] as const;

// GraphQL Error Codes
export const GRAPHQL_ERROR_CODES = {
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  FORBIDDEN: 'FORBIDDEN',
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  OK: 200,
} as const;
