import { gql } from '@apollo/client';

/**
 * Login mutation
 * Input: AuthDTO { email: String!, password: String! }
 * Returns: LoginResponse { id, email, firstName, lastName, accessToken }
 */
export const LOGIN_MUTATION = gql`
  mutation Login($credentials: AuthDTO!) {
    login(credentials: $credentials) {
      id
      email
      firstName
      lastName
      accessToken
    }
  }
`;

/**
 * Register mutation
 * Input: CreateUserInput { email, firstName, lastName, password, middleName?, phone? }
 * Returns: User
 */
export const REGISTER_MUTATION = gql`
  mutation Register($input: CreateUserInput!) {
    register(input: $input) {
      id
      email
      firstName
      lastName
      middleName
      phone
      createdAt
      updatedAt
    }
  }
`;
