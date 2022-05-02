import { gql } from '@apollo/client';

export const REQUEST = gql`
  query stockRequest($id: String!) {
    stockRequestId(id: $id) {
      _id
      createdAt
      details {
        product {
          _id
          barcode
          stock {
            quantity
          }
          color {
            html
            image {
              urls {
                webp {
                  small
                }
              }
            }
            name_internal
            name
          }
          reference {
            cost
            description
            name
          }
          size {
            value
          }
        }
        quantity
      }
      number
      observation
      status
      updatedAt
      user {
        name
      }
      observation
      warehouseDestination {
        name
      }
      warehouseOrigin {
        _id
        name
      }
    }
  }
`;

export const REQUESTS = gql`
  query stockRequests($input: FiltersStockRequestsInput!) {
    stockRequests(filtersStockRequestsInput: $input) {
      docs {
        _id
        number
        warehouseOrigin {
          name
        }
        warehouseDestination {
          name
        }
        user {
          name
        }
        status
        details {
          quantity
          product {
            barcode
            reference {
              name
              description
            }
            color {
              name_internal
            }
            size {
              value
            }
          }
        }
        createdAt
        updatedAt
      }
      totalDocs
      totalPages
    }
  }
`;
