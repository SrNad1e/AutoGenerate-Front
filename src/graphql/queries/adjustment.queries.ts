import { gql } from '@apollo/client';

export const ADJUSTMENT = gql`
  query stockAdjustment($id: String!) {
    stockAdjustmentId(id: $id) {
      _id
      number
      observation
      status
      total
      createdAt
      updatedAt
      user {
        name
      }
      warehouse {
        name
        _id
      }
      details {
        quantity
        product {
          _id
          barcode
          reference {
            cost
            description
            name
          }
          status
          size {
            value
          }
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

export const ADJUSTMENTS = gql`
  query stockAdjustments($input: FiltersStockAdjustmentInput) {
    stockAdjustments(filtersStockAdjustmentInput: $input) {
      totalDocs
      totalPages
      docs {
        _id
        number
        observation
        status
        total
        createdAt
        updatedAt
        warehouse {
          _id
          name
        }
        details {
          quantity
          product {
            _id
            barcode
            reference {
              description
              cost
              name
            }
            size {
              value
            }
            stock {
              quantity
            }
            color {
              html
              image
              name
              name_internal
            }
            user {
              name
            }
          }
        }
      }
    }
  }
`;
