import { useLazyQuery, useMutation } from '@apollo/client';

import type { StockOutput } from '@/graphql/graphql';
import {
  CreateStockOutputDocument,
  StockOutputDocument,
  StockOutputsDocument,
  UpdateStockOutputDocument,
} from '@/graphql/graphql';

export const useGetOutput = () => {
  return useLazyQuery(StockOutputDocument);
};

export const useGetOutputs = () => {
  return useLazyQuery(StockOutputsDocument);
};

export const useCreateOutput = () => {
  return useMutation(CreateStockOutputDocument);
};

export const useUpdateOutput = () => {
  return useMutation(UpdateStockOutputDocument, {
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: StockOutputDocument });
      store.writeQuery({
        query: StockOutputDocument,
        data: {
          ...dataInStore,
          stockOutputId: {
            ...dataInStore?.stockOutputId,
            ...(response?.data?.updateStockOutput as StockOutput),
          },
        },
      });
    },
  });
};
