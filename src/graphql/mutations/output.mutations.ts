import { gql } from '@apollo/client';

export const CREATEOUTPUT = gql`
  mutation createStockOutput($input: CreateStockOutputInput!) {
    createStockOutput(createStockOutputInput: $input) {
      _id
      number
    }
  }
`;

export const UPDATEOUTPUT = gql`
  mutation updateStockOutput($id: String!, $input: UpdateStockOutputInput!) {
    updateStockOutput(id: $id, updateStockOutputInput: $input) {
      _id
      createdAt
      updatedAt
      number
      observation
      status
      total
      details {
        product {
          _id
          barcode
          color {
            image
            html
            name_internal
          }
          description
          reference
          size {
            value
          }
          stock {
            quantity
          }
        }
      }
      user {
        name
      }
      warehouse {
        name
        _id
      }
    }
  }
`;
