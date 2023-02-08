import { InvoicingDocument } from './../graphql/graphql';
import { useLazyQuery, useMutation } from '@apollo/client';

import { InvoicesDocument } from '@/graphql/graphql';

export const useGetInvoices = () => {
  return useLazyQuery(InvoicesDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useInvoicing = () => {
  return useMutation(InvoicingDocument);
};
