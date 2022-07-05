import type { Receipt } from '@/graphql/graphql';
import { CreateReceiptDocument, ReceiptsDocument, UpdateReceiptDocument } from '@/graphql/graphql';
import { useLazyQuery, useMutation } from '@apollo/client';

export const useGetReceipts = () => {
  return useLazyQuery(ReceiptsDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useCreateReceipts = () => {
  return useMutation(CreateReceiptDocument);
};

export const useUpdateReceipt = () => {
  return useMutation(UpdateReceiptDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          receipts(existingReceipts = []) {
            return existingReceipts?.docs?.map((receipt: Receipt) => {
              if (receipt?._id === data?.updateReceipt?._id) {
                return data?.updateReceipt;
              }
              return receipt;
            });
          },
          receiptId() {
            return data?.updateReceipt;
          },
        },
      });
    },
  });
};
