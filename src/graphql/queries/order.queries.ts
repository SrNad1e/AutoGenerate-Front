import { gql } from '@apollo/client';

export const ORDER = gql`
  query orderId($id: String!) {
    orderId(id: $id) {
      _id
      createdAt
      updatedAt
      number
      status
      customer {
        document
        firstName
        lastName
        assigningUser {
          name
        }
        documentType {
          abbreviation
        }
        type {
          name
        }
        user {
          name
        }
      }
      details {
        createdAt
        updatedAt
        discount
        quantity
        status
        product {
          _id
          barcode
          cost
          reference
          size {
            value
          }
          description
          status
          color {
            html
            image
            name_internal
          }
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
          user {
            _id
            name
          }
        }
      }
      pointOfSale {
        name
      }
      shop {
        name
      }
      summary {
        discount
        subtotal
        tax
        total
        totalPaid
      }
      user {
        name
      }
    }
  }
`;

export const ORDERSBYPOS = gql`
  query Orders($id: String!) {
    ordersByPointOfSale(idPointOfSale: $id) {
      _id
      createdAt
      updatedAt
      status
      number
      customer {
        firstName
        lastName
        document
        assigningUser {
          name
        }
        documentType {
          abbreviation
        }
        type {
          name
        }
      }
      details {
        discount
        price
        status
        quantity
        product {
          _id
          barcode
          description
          cost
          reference
          status
          color {
            html
            image
            name_internal
          }
          size {
            value
          }
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
        name
      }
      shop {
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
        name
      }
    }
  }
`;
