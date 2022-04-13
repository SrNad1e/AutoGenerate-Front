import { useLazyQuery } from '@apollo/client';

import { PRODUCT, PRODUCTS } from '@/graphql/queries/product.queries';

export const useGetProducts = (
  callback: (data: PRODUCT.ResponsePaginate) => void,
  showError: (message: string) => void,
) => {
  const [getProducts, { loading }] = useLazyQuery(PRODUCTS, {
    onCompleted: (result) => callback(result?.products),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    getProducts,
    loading,
  };
};

export const useGetProduct = (
  callback: (product: PRODUCT.Product) => void,
  showError: (message: string) => void,
) => {
  const [getProduct, { loading, refetch }] = useLazyQuery(PRODUCT, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
    onCompleted: (result) => callback(result?.product),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    getProduct,
    loading,
    refetch,
  };
};
