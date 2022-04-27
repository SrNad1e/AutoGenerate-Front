import { gql } from '@apollo/client';

export const REFERENCE = gql`
  query referenceId($id: String!) {
    referenceId(id: $id) {
      _id
      active
      changeable
      cost
      description
      name
      price
      attribs {
        _id
        active
        createdAt
        updatedAt
        name
      }
      brand {
        _id
        active
        name
      }
      categoryLevel1 {
        _id
        name
        createdAt
        updatedAt
      }
      categoryLevel2 {
        _id
        name
        createdAt
        updatedAt
        categoryParent {
          _id
          name
          createdAt
          updatedAt
        }
      }
      categoryLevel3 {
        _id
        name
        createdAt
        updatedAt
        categoryParent {
          _id
          createdAt
          updatedAt
          name
          categoryParent {
            _id
            createdAt
            updatedAt
            name
          }
        }
      }
      shipping {
        createdAt
        updatedAt
        height
        long
        volume
        width
        width
      }
    }
  }
`;

export const REFERENCES = gql`
  query references($input: FiltersReferencesInput) {
    references(filtersReferencesInput: $input) {
      page
      totalDocs
      totalPages
      limit
      docs {
        _id
        active
        changeable
        cost
        description
        price
        createdAt
        updatedAt
        discountPrice
        name
        attribs {
          _id
          active
          name
        }
        brand {
          _id
          active
          name
        }
        products {
          _id
          barcode
          status
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
          reference {
            _id
            active
            changeable
            cost
            description
            price
            name
            attribs {
              _id
              active
              name
            }
            brand {
              _id
              active
              name
            }
            shipping {
              height
              long
              volume
              width
              weight
            }
          }
        }
        shipping {
          height
          long
          volume
          width
          weight
        }
      }
    }
  }
`;
