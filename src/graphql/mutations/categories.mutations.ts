import { gql } from '@apollo/client';

export const CREATECATEGORY = gql`
  mutation createCategory($input: CreateCategoryInput!) {
    createCategory(createCategoryInput: $input) {
      _id
      createdAt
      updatedAt
      name
      childs {
        _id
        createdAt
        updatedAt
        name
        childs {
          _id
          name
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const UPDATECATEGORY = gql`
  mutation updateCategory($id: String!, $input: UpdateCategoryInput!) {
    updateCategory(id: $id, updateCategoryInput: $input) {
      _id
      createdAt
      updatedAt
      name
      childs {
        _id
        createdAt
        updatedAt
        name
        childs {
          _id
          name
          createdAt
          updatedAt
        }
      }
    }
  }
`;
