import { gql } from '@apollo/client';

export const WAREHOUSES = gql`
  query warehouses($input: FiltersWarehousesInput!) {
    warehouses(filtersWarehouseInput: $input) {
      docs {
        _id
        name
      }
    }
  }
`;
