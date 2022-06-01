import { useLazyQuery, useMutation } from '@apollo/client';

import { ClosesZInvoicingDocument, CreateCloseZInvoicingDocument } from '@/graphql/graphql';

export const useGetClosesZInvoicing = () => {
  return useLazyQuery(ClosesZInvoicingDocument);
};

export const useCreateCloseZInvoicing = () => {
  return useMutation(CreateCloseZInvoicingDocument, {
    refetchQueries: [{ query: ClosesZInvoicingDocument, variables: { input: {} } }],
  });
};
