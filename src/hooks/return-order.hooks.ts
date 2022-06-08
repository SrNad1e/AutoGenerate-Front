import { useLazyQuery, useMutation } from '@apollo/client';

import { CreateReturnOrderDocument, ReturnsOrderDocument } from '@/graphql/graphql';

export const useGetReturnsOrder = () => {
  return useLazyQuery(ReturnsOrderDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useCreateReturnOrder = () => {
  return useMutation(CreateReturnOrderDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          returnsOrder(existingReturnsOrders = []) {
            return [data?.createReturnOrder].concat(existingReturnsOrders);
          },
        },
      });
    },
  });
};
