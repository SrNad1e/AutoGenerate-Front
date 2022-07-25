import { useLazyQuery, useMutation } from '@apollo/client';

import type { Order } from '@/graphql/graphql';
import { ConfirmProductsOrderDocument } from '@/graphql/graphql';
import {
  OrderIdDocument,
  OrdersByPosDocument,
  CreateOrderDocument,
  UpdateOrderDocument,
  AddProductsOrderDocument,
  AddPaymentsOrderDocument,
  OrdersDocument,
} from '@/graphql/graphql';

export const useGetOrder = () => {
  return useLazyQuery(OrderIdDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useGetOrders = () => {
  return useLazyQuery(OrdersDocument, {
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
  return useMutation(UpdateOrderDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          orderId() {
            return data?.updateOrder;
          },
          ordersByPos(existingOrders = {}) {
            if (data?.updateOrder?.order?.status === 'CANCELLED') {
              return {
                ...existingOrders,
                docs: existingOrders?.docs?.filter(
                  (order: Order) => order?._id !== data?.updateOrder?.order?._id,
                ),
              };
            }
          },
        },
      });
    },
  });
};

export const useAddPaymentsOrder = () => {
  return useMutation(AddPaymentsOrderDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          orderId() {
            return data?.addPaymentsOrder;
          },
        },
      });
    },
  });
};

export const useAddProductsOrder = () => {
  return useMutation(AddProductsOrderDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          orderId() {
            return data?.addProductsOrder;
          },
        },
      });
    },
  });
};

export const useConfirmProductOrder = () => {
  return useMutation(ConfirmProductsOrderDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          orderId() {
            return data?.confirmProductsOrder;
          },
        },
      });
    },
  });
};
