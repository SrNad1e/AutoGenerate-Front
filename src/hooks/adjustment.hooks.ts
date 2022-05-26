import { useLazyQuery, useMutation } from '@apollo/client';

import type { StockAdjustment } from '@/graphql/graphql';
import {
  CreateStockAdjustmentDocument,
  StockAdjustmentDocument,
  StockAdjustmentsDocument,
  UpdateStockAdjustmentDocument,
} from '@/graphql/graphql';

export const useGetAdjustment = () => {
  return useLazyQuery(StockAdjustmentDocument);
};

export const useGetAdjustments = () => {
  return useLazyQuery(StockAdjustmentsDocument);
};

export const useCreateAdjustment = () => {
  return useMutation(CreateStockAdjustmentDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          stockAdjustments(existingAdjustments = []) {
            return [data?.createStockAdjustment].concat(existingAdjustments);
          },
        },
      });
    },
  });
};

export const useUpdateAdjustment = () => {
  return useMutation(UpdateStockAdjustmentDocument, {
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: StockAdjustmentDocument });
      store.writeQuery({
        query: StockAdjustmentDocument,
        data: {
          ...dataInStore,
          stockAdjustmentId: {
            ...dataInStore?.stockAdjustmentId,
            ...(response?.data?.updateStockAdjustment as StockAdjustment),
          },
        },
      });
    },
  });
};
