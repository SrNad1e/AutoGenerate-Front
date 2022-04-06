import { gql } from '@apollo/client';

export const CREATEORDER = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(createOrderInput: $input) {
      _id
    }
  }
`;

export const UPDATEORDER = gql`
  mutation UpdateOrder($id: String!, $input: UpdateOrderInput!) {
    updateOrder(id: $id, updateOrderInput: $input) {
      _id
      createdAt
      updatedAt
      status
      number
      customer {
        _id
        active
        document
        firstName
        lastName
        phone
      }
      details {
        quantity
        status
        product {
          _id
          barcode
          color {
            html
            name
            image
            name_internal
          }
          description
          status
          size {
            value
          }
          reference
          stock {
            quantity
          }
        }
      }
      payments {
        total
        payment {
          name
          type
        }
      }
      pointOfSale {
        _id
        name
      }
      shop {
        _id
        name
      }
      summary {
        change
        discount
        subtotal
        tax
        total
        totalPaid
      }
      user {
        _id
        name
      }
    }
  }
`;
