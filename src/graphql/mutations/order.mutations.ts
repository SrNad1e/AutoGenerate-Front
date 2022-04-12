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

export const ADDPAYMENTSORDER = gql`
  mutation addPaymentsOrder($input: AddPaymentsOrderInput!) {
    addPaymentsOrder(addPaymentsOrderInput: $input) {
      _id
      createdAt
      updatedAt
      number
      status
      customer {
        _id
        document
        firstName
        lastName
        phone
      }
      details {
        discount
        price
        quantity
        status
        product {
          _id
          barcode
          reference
          status
          description
          price
          color {
            html
            image
            name
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
          _id
          name
          type
        }
      }
      pointOfSale {
        name
        _id
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
        name
        _id
      }
    }
  }
`;

export const APPPRODUCTSORDER = gql`
  mutation addProductsOrder($input: AddProductsOrderInput!) {
    addProductsOrder(addProductsOrderInput: $input) {
      _id
      createdAt
      updatedAt
      status
      number
      customer {
        active
        document
        firstName
        lastName
        phone
      }
      details {
        discount
        price
        quantity
        status
        product {
          _id
          barcode
          changeable
          price
          reference
          size {
            value
          }
          description
          color {
            html
            image
            name
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
        }
      }
      pointOfSale {
        name
        _id
      }
      shop {
        name
        _id
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
        _id
      }
    }
  }
`;
