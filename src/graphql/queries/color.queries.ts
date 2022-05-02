import { gql } from '@apollo/client';

export const COLORS = gql`
  query colors($input: FiltersColorsInput!) {
    colors(filtersColorsInput: $input) {
      totalDocs
      totalPages
      docs {
        _id
        name
        name_internal
        image {
          urls {
            webp {
              small
            }
          }
        }
        html
        active
      }
    }
  }
`;
