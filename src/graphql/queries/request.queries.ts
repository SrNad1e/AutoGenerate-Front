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
            image
            name_internal
          }
          description
          reference
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
  query stockRequests($input: FiltersStockRequestInput!) {
    stockRequests(filtersStockRequestInput: $input) {
      docs {
        _id
        number
        warehouseOrigin {
          name
        }
        warehouseDestination {
          name
        }
        status
        details {
          quantity
        }
        createdAt
        updatedAt
      }
      totalDocs
    }
  }
`;
