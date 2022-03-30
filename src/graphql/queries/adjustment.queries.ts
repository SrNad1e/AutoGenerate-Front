import { gql } from '@apollo/client';

export const ADJUSTMENT = gql`
  query stockAdjustment($id: String!) {
    stockAdjustmentId(id: $id) {
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
        createdAt
        updateAt
        quantity
        product {
          _id
          barcode
          cost
          description
          reference
          status
          color {
            html
            image
            name
            name_internal
          }
          stock {
            quantity
          }
          user {
            name
          }
        }
      }
    }
  }
`;
