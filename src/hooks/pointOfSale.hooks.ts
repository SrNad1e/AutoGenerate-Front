import { PointOfSalesDocument } from '@/graphql/graphql';
import { useLazyQuery } from '@apollo/client';

export const useGetPointOfSales = () => {
  return useLazyQuery(PointOfSalesDocument, {
    fetchPolicy: 'cache-first',
  });
};
