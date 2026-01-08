import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, Observable } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { ErrorLink } from '@apollo/client/link/error';
import { getInMemoryToken, setInMemoryToken } from '@/contexts/AuthContext';
import { API_ENDPOINTS, ROUTES, GRAPHQL_ERROR_CODES, HTTP_STATUS } from '@/constants/constants';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  credentials: 'include', // Send cookies for refresh token
});

// Auth link - adds access token to headers
const authLink = new SetContextLink(() => {
  const token = getInMemoryToken();
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Function to refresh access token using REST endpoint
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`, {
      method: 'POST',
      credentials: 'include', // Important: send httpOnly cookie
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // If refresh returns 401, redirect to login
      if (response.status === HTTP_STATUS.UNAUTHORIZED) {
        setInMemoryToken(null);
        if (globalThis.window !== undefined && !globalThis.window.location.pathname.includes(ROUTES.LOGIN)) {
          globalThis.window.location.href = ROUTES.LOGIN;
        }
      }
      throw new Error('Token refresh failed');
    }

    const data = await response.json();

    if (data?.accessToken) {
      setInMemoryToken(data.accessToken);
      return data.accessToken;
    }
    return null;
  } catch (error) {
    console.error('Token refresh failed:', error);
    setInMemoryToken(null);
    return null;
  }
};

// Error link - handles authentication errors and retries with refreshed token
const errorLink = new ErrorLink(({ graphQLErrors, operation, forward }: any) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      // Check for authentication errors
      if (
        err.extensions?.code === GRAPHQL_ERROR_CODES.UNAUTHENTICATED ||
        err.extensions?.code === GRAPHQL_ERROR_CODES.FORBIDDEN ||
        err.message.toLowerCase().includes('unauthorized')
      ) {
        // Try to refresh token and retry the request
        return new Observable((observer) => {
          refreshAccessToken()
            .then((newToken) => {
              if (!newToken) {
                // Refresh failed - redirect to login
                if (globalThis.window !== undefined) {
                  globalThis.window.location.href = ROUTES.LOGIN;
                }
                observer.error(new Error('Token refresh failed'));
                return;
              }

              // Update operation context with new token
              const oldHeaders = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${newToken}`,
                },
              });

              // Retry the request
              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              };

              forward(operation).subscribe(subscriber);
            })
            .catch((refreshError) => {
              // Refresh failed - redirect to login
              setInMemoryToken(null);
              if (globalThis.window !== undefined) {
                globalThis.window.location.href = ROUTES.LOGIN;
              }
              observer.error(refreshError);
            });
        });
      }
    }
  }
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
