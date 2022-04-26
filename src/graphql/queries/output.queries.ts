import { gql } from '@apollo/client';

export const OUTPUT = gql`
  query stockOutput($id: String!) {
    stockOutputId(id: $id) {
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
          reference {
            description
            cost
            name
          }
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

export const OUTPUTS = gql`
  query stockOutputs($input: FiltersStockOutputInput) {
    stockOutputs(filtersStockOutputInput: $input) {
      totalDocs
      totalPages
      docs {
        _id
        createdAt
        number
        updatedAt
        status
        total
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
            reference {
              description
              price
              cost
              name
            }
            barcode
            color {
              name
              name_internal
            }
            size {
              value
            }
          }
        }
      }
    }
  }
`;
