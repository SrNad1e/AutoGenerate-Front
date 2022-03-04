import { gql } from '@apollo/client';

export const COLORS = gql`
  query colors($input: FiltersColorInput!) {
    colors(filtersColorInput: $input) {
      docs {
        _id
        name
        name_internal
        image
        html
      }
    }
  }
`;
