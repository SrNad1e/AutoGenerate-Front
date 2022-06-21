import { useLazyQuery } from '@apollo/client';

import { InvoicesDocument } from '@/graphql/graphql';

export const useGetInvoices = () => {
  return useLazyQuery(InvoicesDocument, {
    fetchPolicy: 'cache-first',
  });
};
