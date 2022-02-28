import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($input: LoginUserInput!) {
    login(loginUserInput: $input) {
      user {
        username
        name
        shop {
          _id
          name
          defaultWarehouse {
            _id
            name
          }
        }
        role {
          name
          permissions {
            name
          }
        }
        _id
      }
      access_token
    }
  }
`;
