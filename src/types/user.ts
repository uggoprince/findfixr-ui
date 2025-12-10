// TypeScript types for the mutations
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  middleName?: string;
  phone?: string;
}

export interface LoginResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginMutationData {
  login: LoginResponse;
}

export interface LoginMutationVariables {
  credentials: {
    email: string;
    password: string;
  };
}