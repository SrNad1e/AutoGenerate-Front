import { gql } from '@apollo/client';

export const BRANDS = gql`
  query brands($input: FiltersBrandsInput) {
    brands(filtersBrandsInput: $input) {
      totalDocs
      docs {
        _id
        active
        createdAt
        updatedAt
        name
      }
    }
  }
`;
