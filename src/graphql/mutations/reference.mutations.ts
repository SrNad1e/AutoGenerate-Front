import { gql } from '@apollo/client';

export const CREATEREFERENCE = gql`
  mutation createReference($input: CreateReferenceInput!) {
    createReference(createReferenceInput: $input) {
      _id
      active
      changeable
      cost
      createdAt
      updatedAt
      description
      name
      price
      attribs {
        _id
        active
        name
      }
      brand {
        _id
        active
        name
      }
      shipping {
        height
        long
        volume
        width
        weight
      }
      categoryLevel1 {
        _id
        name
      }
      categoryLevel2 {
        _id
        name
        categoryParent {
          _id
          name
        }
      }
      categoryLevel3 {
        _id
        name
        categoryParent {
          _id
          name
          categoryParent {
            _id
            name
          }
        }
      }
    }
  }
`;

export const UPDATEREFERENCE = gql`
  mutation updateReference($id: String!, $input: UpdateReferenceInput!) {
    updateReference(id: $id, updateReferenceInput: $input) {
      _id
      active
      changeable
      cost
      createdAt
      description
      name
      price
      updatedAt
      shipping {
        height
        long
        volume
        width
        weight
      }
      brand {
        _id
        active
        name
      }
      attribs {
        _id
        active
        name
      }
      categoryLevel1 {
        _id
        name
      }
      categoryLevel2 {
        _id
        name
        categoryParent {
          _id
          name
        }
      }
      categoryLevel3 {
        _id
        name
        categoryParent {
          _id
          name
          categoryParent {
            _id
            name
          }
        }
      }
    }
  }
`;
