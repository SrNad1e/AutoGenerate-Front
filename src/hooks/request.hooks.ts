import { useLazyQuery, useMutation } from '@apollo/client';

import {
  StockRequestDocument,
  StockRequestsDocument,
  CreateStockRequestDocument,
  GenerateStockRequestDocument,
  UpdateStockRequestDocument,
} from '@/graphql/graphql';

export const useGetRequest = () => {
  return useLazyQuery(StockRequestDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useGetRequests = () => {
  return useLazyQuery(StockRequestsDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useCreateRequest = () => {
  return useMutation(CreateStockRequestDocument);
};

export const useGenerateRequest = () => {
  return useMutation(GenerateStockRequestDocument);
};

export const useUpdateRequest = () => {
  return useMutation(UpdateStockRequestDocument, {
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: StockRequestDocument });
      store.writeQuery({
        query: StockRequestDocument,
        data: {
          ...dataInStore,
          stockRequestId: { ...dataInStore?.stockRequestId, ...response.data?.updateStockRequest },
        },
      });
    },
  });
};
