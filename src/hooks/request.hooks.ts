import { useLazyQuery, useMutation } from '@apollo/client';

import type { StockRequest } from '@/graphql/graphql';
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
  return useMutation(CreateStockRequestDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          stockRequests(existingRequests = []) {
            return [data?.createStockRequest].concat(existingRequests);
          },
        },
      });
    },
  });
};

export const useGenerateRequest = () => {
  return useMutation(GenerateStockRequestDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          stockRequests(existingRequests = []) {
            return [data?.generateStockRequest].concat(existingRequests);
          },
        },
      });
    },
  });
};

export const useUpdateRequest = () => {
  return useMutation(UpdateStockRequestDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          stockRequests(existingRequest = []) {
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
