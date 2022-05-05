import { useLazyQuery } from '@apollo/client';

import { WarehousesDocument, WarehouseIdDocument } from '@/graphql/graphql';

export const useGetWarehouses = () => {
  return useLazyQuery(WarehousesDocument);
};

export const useGetWarehouseId = () => {
  return useLazyQuery(WarehouseIdDocument);
};
