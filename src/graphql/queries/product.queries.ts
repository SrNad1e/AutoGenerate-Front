import { gql } from '@apollo/client';

export const PRODUCTS = gql`
  query products($input: FiltersProductsInput!) {
    products(filtersProductsInput: $input) {
      docs {
        _id
        barcode
        reference {
          description
          name
        }
        color {
          name_internal
          html
          image
        }
        size {
          value
        }
        stock {
          quantity
        }
      }
      totalDocs
    }
  }
`;

export const PRODUCT = gql`
  query product($input: FiltersProductInput!) {
    product(filtersProductInput: $input) {
      stock {
        quantity
      }
      _id
      barcode
      stock {
        quantity
      }
      color {
        name_internal
        html
        image
      }
      reference {
        description
        name
      }
      stock {
        quantity
      }
      size {
        value
      }
      status
    }
  }
`;
