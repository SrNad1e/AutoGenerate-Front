import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($input: LoginUserInput!) {
    login(loginUserInput: $input) {
      user {
        username
        name
        password
        id
        _id
      }
      access_token
    }
  }
`;
