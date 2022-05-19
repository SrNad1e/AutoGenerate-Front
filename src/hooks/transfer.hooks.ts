import { useLazyQuery, useMutation } from '@apollo/client';

import {
  CreateStockTransferDocument,
  StockTransferIdDocument,
  StockTransfersDocument,
  UpdateStockTransferDocument,
} from '@/graphql/graphql';

export const useGetTransfers = () => {
  return useLazyQuery(StockTransfersDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useGetTransfer = () => {
  return useLazyQuery(StockTransferIdDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useCreateTransfer = () => {
  return useMutation(CreateStockTransferDocument);
};

export const useUpdateTransfer = () => {
  return useMutation(UpdateStockTransferDocument, {
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: StockTransferIdDocument });
      store.writeQuery({
        query: StockTransferIdDocument,
        data: {
          ...dataInStore,
          stockTransferId: {
            ...dataInStore?.stockTransferId,
            ...response.data?.updateStockTransfer,
          },
        },
      });
    },
  });
};
