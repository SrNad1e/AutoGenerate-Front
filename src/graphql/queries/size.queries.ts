import { gql } from '@apollo/client';

export const SIZES = gql`
  query sizes($input: FiltersSizeInput!) {
    sizes(filtersSizeInput: $input) {
      docs {
        _id
        value
      }
    }
  }
`;
