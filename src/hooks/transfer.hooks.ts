import { useLazyQuery, useMutation } from '@apollo/client';
import type { StockTransfer, StockTransferError } from '@/graphql/graphql';
import {
  StockTransfersErrorDocument,
  VerifiedProducttStockTransferDocument,
} from '@/graphql/graphql';
import {
  ConfirmProductsStockTransferDocument,
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
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          stockTransfers(existingTransfers = []) {
            return existingTransfers?.docs?.map((transfer: StockTransfer) => {
              if (transfer?._id === data?.updateStockTransfer?._id) {
                return data?.updateStockTransfer;
              }
              return transfer;
            });
          },
        },
      });
    },
  });
};

export const useConfirmProductsTransfer = () => {
  return useMutation(ConfirmProductsStockTransferDocument, {
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: StockTransferIdDocument });
      store.writeQuery({
        query: StockTransferIdDocument,
        data: {
          ...dataInStore,
          stockTransferId: {
            ...dataInStore?.stockTransferId,
            ...response.data?.confirmProductsStockTransfer,
          },
        },
      });
    },
  });
};

export const useGetTransfersError = () => {
  return useLazyQuery(StockTransfersErrorDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useVerifiedProductTransfersError = () => {
  return useMutation(VerifiedProducttStockTransferDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          stockTransfersError(existingTransfers = []) {
            return existingTransfers?.docs?.map((transfer: StockTransferError) => {
              if (transfer?._id === data?.verifiedProductStockTransfer?._id) {
                return data?.verifiedProductStockTransfer;
              }
              return transfer;
            });
          },
        },
      });
    },
  });
};
