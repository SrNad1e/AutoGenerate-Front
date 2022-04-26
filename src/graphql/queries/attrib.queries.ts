import { gql } from '@apollo/client';

export const ATTRIBS = gql`
  query attribs($input: FiltersAttribsInput) {
    attribs(filtersAttribsInput: $input) {
      totalDocs
      docs {
        _id
        active
        createdAt
        name
        updatedAt
      }
    }
  }
`;
