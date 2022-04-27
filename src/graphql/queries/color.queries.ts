import { gql } from '@apollo/client';

export const COLORS = gql`
  query colors($input: FiltersColorInput!) {
    colors(filtersColorInput: $input) {
      totalDocs
      totalPages
      limit
      page
      docs {
        _id
        name
        name_internal
        image {
          urls {
            original
          }
        }
        html
        active
      }
    }
  }
`;
