import { useLazyQuery, useMutation } from '@apollo/client';

import { ClosesXInvoicingDocument, CreateCloseXInvoicingDocument } from '@/graphql/graphql';

export const useGetClosesXInvoicing = () => {
  return useLazyQuery(ClosesXInvoicingDocument);
};

export const useCreateCloseXInvoicing = () => {
  return useMutation(CreateCloseXInvoicingDocument, {
    refetchQueries: [{ query: ClosesXInvoicingDocument, variables: { input: {} } }],
  });
};
