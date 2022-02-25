import { gql } from '@apollo/client';

export const WAREHOUSES = gql`
  query warehouses($input: FiltersWarehouseInput!) {
    warehouses(filtersWarehouseInput: $input) {
      _id
      name
    }
  }
`;
