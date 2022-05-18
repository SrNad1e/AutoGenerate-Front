import { useLazyQuery } from '@apollo/client';

import { StockTransfersDocument } from '@/graphql/graphql';

export const useGetTransfers = () => {
  return useLazyQuery(StockTransfersDocument, {
    fetchPolicy: 'cache-first',
  });
};
