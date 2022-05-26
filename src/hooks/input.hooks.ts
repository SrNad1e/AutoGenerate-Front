import { useLazyQuery, useMutation } from '@apollo/client';

import {
  CreateStockInputDocument,
  StockInputDocument,
  StockInputsDocument,
  UpdateStockInputDocument,
} from '@/graphql/graphql';

export const useGetInput = () => {
  return useLazyQuery(StockInputDocument);
};

export const useGetInputs = () => {
  return useLazyQuery(StockInputsDocument);
};

export const useCreateInput = () => {
  return useMutation(CreateStockInputDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          stockInputs(existingInputs = []) {
            return [data?.createStockInput].concat(existingInputs);
          },
        },
      });
    },
  });
};

export const useUpdateInput = () => {
  return useMutation(UpdateStockInputDocument);
};
