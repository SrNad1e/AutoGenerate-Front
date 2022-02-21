import { gql } from '@apollo/client';

export const CURRENTUSER = gql`
  {
    currentUser {
      username
      name
      role {
        name
        permissions {
          name
        }
      }
    }
  }
`;
