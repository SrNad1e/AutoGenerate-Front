import { gql } from '@apollo/client';

export const SIZES = gql`
  query sizes($input: FiltersSizesInput!) {
    sizes(filtersSizesInput: $input) {
      totalDocs
      totalPages
      page
      limit
      docs {
        createdAt
        updatedAt
        _id
        value
        active
      }
    }
  }
`;
