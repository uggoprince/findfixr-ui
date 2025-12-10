'use client';

import { ApolloProvider as BaseApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@/lib/apollo-client';

export function ApolloProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return <BaseApolloProvider client={apolloClient}>{children}</BaseApolloProvider>;
}
