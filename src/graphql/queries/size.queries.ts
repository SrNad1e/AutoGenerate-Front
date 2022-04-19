import { gql } from '@apollo/client';

export const SIZES = gql`
  query sizes($input: FiltersSizeInput!) {
    sizes(filtersSizeInput: $input) {
      totalDocs
      totalPages
      page
      limit
      docs {
        _id
        value
        active
      }
    }
  }
`;
