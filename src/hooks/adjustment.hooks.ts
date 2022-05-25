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
  return useMutation(CreateStockAdjustmentDocument);
};

export const useUpdateAdjustment = () => {
  return useMutation(UpdateStockAdjustmentDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          stockAdjustments(existingAdjustment = []) {
            return existingAdjustment?.docs?.map((adjustment: StockAdjustment) => {
              if (adjustment?._id === data?.updateStockAdjustment?._id) {
                return data?.updateStockAdjustment;
              }
              return adjustment;
            });
          },
        },
      });
    },
  });
};
