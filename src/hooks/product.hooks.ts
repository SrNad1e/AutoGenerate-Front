import { useLazyQuery } from '@apollo/client';

import { ProductDocument, ProductsDocument } from '@/graphql/graphql';

export const useGetProducts = () => {
  return useLazyQuery(ProductsDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useGetProduct = () => {
  return useLazyQuery(ProductDocument, {
    fetchPolicy: 'cache-first',
  });
};
