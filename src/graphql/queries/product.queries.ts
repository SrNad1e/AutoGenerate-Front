import { gql } from '@apollo/client';

export const PRODUCTS = gql`
  query products($input: FiltersProductsInput!) {
    products(filtersProductsInput: $input) {
      docs {
        _id
        barcode
        description
        reference
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
          warehouse {
            name
          }
        }
      }
      totalDocs
    }
  }
`;

export const PRODUCT = gql`
  query product($input: FiltersProductInput!) {
    product(filtersProductInput: $input) {
      _id
      barcode
      color {
        name_internal
        html
        image
      }
      description
      reference
      size {
        value
      }
      status
      stock {
        quantity
      }
    }
  }
`;
