import type { ApolloError } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { useLazyQuery } from '@apollo/client';

import type { Warehouse } from '@/graphql/graphql';
import {
  WarehousesDocument,
  WarehouseIdDocument,
  CreateWarehouseDocument,
  UpdateWarehouseDocument,
} from '@/graphql/graphql';

export const useGetWarehouses = (onError: (e: ApolloError) => void) => {
  return useLazyQuery(WarehousesDocument, {
    onError: onError,
  });
};

export const useGetWarehouseId = () => {
  return useLazyQuery(WarehouseIdDocument);
};

export const useCreateWarehouse = () => {
  return useMutation(CreateWarehouseDocument);
};

export const useUpdateWarehouse = () => {
  return useMutation(UpdateWarehouseDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          warehouses(existingWarehouses = []) {
            return existingWarehouses?.docs?.map((warehouse: Warehouse) => {
              if (warehouse?._id === data?.updateWarehouse?._id) {
                return data?.updateWarehouse;
              }
              return warehouse;
            });
          },
          roleId() {
            return data?.updateWarehouse;
          },
        },
      });
    },
  });
};
