import { gql } from '@apollo/client';

export const CREATEBRAND = gql`
  mutation createBrand($input: CreateBrandInput!) {
    createBrand(createBrandInput: $input) {
      _id
      active
      name
      createdAt
      updatedAt
    }
  }
`;

export const UPDATEBRAND = gql`
  mutation updateBrand($id: String!, $input: UpdateBrandInput!) {
    updateBrand(id: $id, updateBrandInput: $input) {
      _id
      active
      name
      createdAt
      updatedAt
    }
  }
`;
