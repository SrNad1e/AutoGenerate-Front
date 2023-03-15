import { useLazyQuery, useMutation } from '@apollo/client';
import type { CloseZInvoicing } from '@/graphql/graphql';
import {
  ClosesZInvoicingDocument,
  CreateCloseZInvoicingDocument,
  UpdateCloseZInvoicingDocument,
} from '@/graphql/graphql';

export const useGetClosesZInvoicing = () => {
  return useLazyQuery(ClosesZInvoicingDocument);
};

export const useCreateCloseZInvoicing = () => {
  return useMutation(CreateCloseZInvoicingDocument, {
    refetchQueries: [{ query: ClosesZInvoicingDocument, variables: { input: {} } }],
  });
};

export const useUpdateCloseZInvoicing = () => {
  return useMutation(UpdateCloseZInvoicingDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          closesZ(existingCloseZ = []) {
            return existingCloseZ?.docs?.map((closeZ: CloseZInvoicing) => {
              if (closeZ?._id === data?.updateCloseZInvoicing?._id) {
                return data?.updateCloseZInvoicing;
              }
              return closeZ;
            });
          },
        },
      });
    },
  });
};
