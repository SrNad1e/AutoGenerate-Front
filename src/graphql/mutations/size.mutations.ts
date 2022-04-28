import { gql } from '@apollo/client';

export const CREATESIZE = gql`
  mutation createSize($input: CreateSizeInput!) {
    createSize(createSizeInput: $input) {
      _id
      active
      createdAt
      updatedAt
      value
    }
  }
`;

export const UPDATESIZE = gql`
  mutation updateSize($id: String!, $input: UpdateSizeInput!) {
    updateSize(id: $id, updateSizeInput: $input) {
      _id
      active
      createdAt
      updatedAt
      value
    }
  }
`;
