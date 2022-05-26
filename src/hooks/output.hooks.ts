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
  return useMutation(CreateStockOutputDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          stockOutputs(existingOutputs = []) {
            return [data?.createStockOutput].concat(existingOutputs);
          },
        },
      });
    },
  });
};

export const useUpdateOutput = () => {
  return useMutation(UpdateStockOutputDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          stockOutputs(existingOutputs = []) {
            return existingOutputs?.docs?.map((output: StockOutput) => {
              if (output?._id === data?.updateStockOutput?._id) {
                return data?.updateStockOutput;
              }
              return output;
            });
          },
        },
      });
    },
  });
};
