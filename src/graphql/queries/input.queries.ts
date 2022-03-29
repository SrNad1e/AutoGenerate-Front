import { gql } from '@apollo/client';

export const INPUT = gql`
  query stockInput($id: String!) {
    stockInputId(id: $id) {
      _id
      createdAt
      updatedAt
      total
      status
      observation
      number
      details {
        quantity
        product {
          _id
          barcode
          description
          reference
          color {
            image
            html
            name_internal
          }
          stock {
            quantity
          }
          size {
            value
          }
        }
      }
      user {
        name
      }
      warehouse {
        _id
        name
      }
    }
  }
`;

export const INPUTS = gql`
  query stockInputs($input: FiltersStockInputInput) {
    stockInputs(filtersStockInputInput: $input) {
      docs {
        _id
        number
        warehouse {
          name
        }
        user {
          name
        }
        status
        total
        createdAt
        updatedAt
        details {
          quantity
          product {
            reference
            barcode
            description
            price
            cost
            color {
              name
            }
            size {
              value
            }
          }
        }
      }
      totalDocs
      totalPages
    }
  }
`;
