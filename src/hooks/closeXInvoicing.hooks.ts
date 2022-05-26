import { useLazyQuery } from '@apollo/client';

import { ClosesXInvoicingDocument } from '@/graphql/graphql';

export const useGetClosesXInvoicing = () => {
  return useLazyQuery(ClosesXInvoicingDocument);
};
