import { useLazyQuery, useMutation } from '@apollo/client';

import {
  StockRequestDocument,
  StockRequestsDocument,
  CreateStockRequestDocument,
  GenerateStockRequestDocument,
  UpdateStockRequestDocument,
  StockRequest,
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
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          colors(existingRequest = []) {
            return existingRequest?.docs?.map((request: StockRequest) => {
              if (request?._id === data?.updateStockRequest?._id) {
                return data?.updateStockRequest;
              }
              return request;
            });
          },
        },
      });
    },
  });
};
