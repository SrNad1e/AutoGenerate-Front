import { gql } from '@apollo/client';

export const CURRENTUSER = gql`
  {
    currentUser {
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
    }
  }
`;
