import { useLazyQuery } from '@apollo/client';

import { ReturnsInvoiceDocument } from '@/graphql/graphql';

export const useGetReturnsInvoice = () => {
  return useLazyQuery(ReturnsInvoiceDocument, {
    fetchPolicy: 'cache-first',
  });
};
