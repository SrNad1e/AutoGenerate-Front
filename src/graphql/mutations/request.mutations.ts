import { gql } from '@apollo/client';

export const CREATEREQUEST = gql`
  mutation createStockRequest($input: CreateStockRequestInput!) {
    createStockRequest(createStockRequestInput: $input) {
      _id
      number
    }
  }
`;

export const UPDATEREQUEST = gql`
  mutation updateStock($id: String!, $input: UpdateStockRequestInput!) {
    updateStockRequest(id: $id, updateStockRequestInput: $input) {
      _id
      number
      status
      createdAt
      updatedAt
      observation
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
        quantity
      }
      user {
        name
      }
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
