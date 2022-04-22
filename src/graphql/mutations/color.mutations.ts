import { gql } from '@apollo/client';

export const CREATECOLOR = gql`
  mutation createColor($input: CreateColorInput!) {
    createColor(createColorInput: $input) {
      _id
      active
      html
      image
      name
      name_internal
      createdAt
    }
  }
`;

export const UPDATECOLOR = gql`
  mutation updateColor($id: String!, $input: UpdateColorInput!) {
    updateColor(id: $id, updateColorInput: $input) {
      _id
      active
      html
      image
      name
      name_internal
    }
  }
`;
