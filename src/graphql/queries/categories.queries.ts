import { gql } from '@apollo/client';

export const CATEGORIES = gql`
  query categories($input: FiltersCategoriesInput) {
    categories(filtersCategoriesInput: $input) {
      totalDocs
      limit
      page
      totalPages
      docs {
        createdAt
        updatedAt
        name
        childs {
          createdAt
          updatedAt
          name
          childs {
            createdAt
            updatedAt
            name
          }
        }
      }
    }
  }
`;
