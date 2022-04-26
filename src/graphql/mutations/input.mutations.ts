import { gql } from '@apollo/client';

export const CREATEINPUT = gql`
  mutation createStockInput($input: CreateStockInputInput!) {
    createStockInput(createStockInputInput: $input) {
      _id
      number
    }
  }
`;

export const UPDATEINPUT = gql`
  mutation updateStockInput($id: String!, $input: UpdateStockInputInput!) {
    updateStockInput(id: $id, updateStockInputInput: $input) {
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
          reference {
            description
            name
          }
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
