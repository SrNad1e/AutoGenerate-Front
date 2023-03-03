import { ProductStockDocument } from '@/graphql/graphql';
import { useLazyQuery } from '@apollo/client';

export const useGetProductsStocks = () => {
  return useLazyQuery(ProductStockDocument, {
    fetchPolicy: 'cache-first',
  });
};
