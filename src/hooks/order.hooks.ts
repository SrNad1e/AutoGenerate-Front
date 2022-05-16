import { useLazyQuery, useMutation } from '@apollo/client';

import {
  OrderIdDocument,
  OrdersByPosDocument,
  CreateOrderDocument,
  UpdateOrderDocument,
  AddProductsOrderDocument,
  AddPaymentsOrderDocument,
} from '@/graphql/graphql';

export const useGetOrder = () => {
  return useLazyQuery(OrderIdDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useGetOrdersByPos = () => {
  return useLazyQuery(OrdersByPosDocument);
};

export const useCreateOrder = () => {
  return useMutation(CreateOrderDocument);
};

export const useUpdateOrder = () => {
  return useMutation(UpdateOrderDocument);
};

export const useAddPaymentsOrder = () => {
  return useMutation(AddPaymentsOrderDocument);
};

export const useAddProductsOrder = () => {
  return useMutation(AddProductsOrderDocument);
};
