import type { ApolloError } from '@apollo/client';
import { useLazyQuery } from '@apollo/client';

import { WarehousesDocument, WarehouseIdDocument } from '@/graphql/graphql';

export const useGetWarehouses = (onError: (e: ApolloError) => void) => {
  return useLazyQuery(WarehousesDocument, {
    onError: onError,
  });
};

export const useGetWarehouseId = () => {
  return useLazyQuery(WarehouseIdDocument);
};
