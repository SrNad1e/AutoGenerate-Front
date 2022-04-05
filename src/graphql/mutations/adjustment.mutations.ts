import { gql } from '@apollo/client';

export const CREATEADJUSTMENT = gql`
  mutation createStockAdjustment($input: CreateStockAdjustmentInput!) {
    createStockAdjustment(createStockAdjustmentInput: $input) {
      _id
      number
    }
  }
`;

export const UPDATEADJUSTMENT = gql`
  mutation updateStockAdjustment($id: String!, $input: UpdateStockAdjustmentInput!) {
    updateStockAdjustment(id: $id, updateStockAdjustmentInput: $input) {
      _id
      number
      observation
      status
      total
      warehouse {
        name
        _id
      }
      details {
        product {
          _id
          barcode
          stock {
            quantity
          }
          description
          reference
          size {
            value
          }
          color {
            html
            image
            name
            name_internal
          }
        }
      }
    }
  }
`;
