import { useLazyQuery, useMutation } from '@apollo/client';

import type { Payment } from '@/graphql/graphql';
import { CreatePaymentDocument, PaymentsDocument, UpdatePaymentDocument } from '@/graphql/graphql';

export const useGetPayments = () => {
  return useLazyQuery(PaymentsDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useCreatePayments = () => {
  return useMutation(CreatePaymentDocument);
};

export const useUpdatePayment = () => {
  return useMutation(UpdatePaymentDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          payments(existingPayments = []) {
            return existingPayments?.docs?.map((payment: Payment) => {
              if (payment?._id === data?.updatePayment?._id) {
                return data?.updatePayment;
              }
              return payment;
            });
          },
        },
      });
    },
  });
};
