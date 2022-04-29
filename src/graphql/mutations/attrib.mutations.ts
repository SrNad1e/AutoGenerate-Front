import { gql } from '@apollo/client';

export const CREATEATTRIB = gql`
  mutation createAttrib($input: CreateAttribInput!) {
    createAttrib(createAttribInput: $input) {
      _id
      active
      createdAt
      updatedAt
      name
    }
  }
`;

export const UPDATEATTRIB = gql`
  mutation updateAttrib($id: String!, $input: UpdateAttribInput!) {
    updateAttrib(id: $id, updateAttribInput: $input) {
      _id
      active
      createdAt
      updatedAt
      name
    }
  }
`;
