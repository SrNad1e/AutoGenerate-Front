import { gql } from '@apollo/client';

export const BRANDS = gql`
  query brands($input: FiltersBrandsInput) {
    brands(filtersBrandsInput: $input) {
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
