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
  return useMutation(CreateStockInputDocument);
};

export const useUpdateInput = () => {
  return useMutation(UpdateStockInputDocument);
};
