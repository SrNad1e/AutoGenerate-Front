import { ShopsDocument } from '@/graphql/graphql';
import { useLazyQuery } from '@apollo/client';

export const useGetShops = () => {
  return useLazyQuery(ShopsDocument, {
    fetchPolicy: 'cache-first',
  });
};
