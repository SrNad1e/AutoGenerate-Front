import { gql } from '@apollo/client';

export const IMAGES = gql`
  query images($input: FiltersImagesInput) {
    images(filtersImagesInput: $input) {
      totalDocs
      totalPages
      page
      limit
      docs {
        name
        _id
        urls {
          webp {
            small
          }
        }
      }
    }
  }
`;
