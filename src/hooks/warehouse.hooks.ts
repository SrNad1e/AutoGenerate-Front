import { WAREHOUSES } from '@/graphql/queries/warehouse.queries';
import { useLazyQuery } from '@apollo/client';

export const useGetWarehouses = (
  callback: (data: WAREHOUSE.warehouse[]) => void,
  showError: (message: string) => void,
) => {
  const [getWarehouses, { loading }] = useLazyQuery(WAREHOUSES, {
    onCompleted: (result) => callback(result.warehouses),
    onError: ({ graphQLErrors }) => showError(graphQLErrors[0].message),
  });
  return {
    getWarehouses,
    loading,
  };
};
