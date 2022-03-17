import { WAREHOUSES } from '@/graphql/queries/warehouse.queries';
import { useLazyQuery } from '@apollo/client';

export const useGetWarehouses = (
  callback: (data: WAREHOUSE.Response) => void,
  showError: (message: string) => void,
) => {
  const [getWarehouses, { loading }] = useLazyQuery(WAREHOUSES, {
    onCompleted: (result) => callback(result.warehouses),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    getWarehouses,
    loading,
  };
};
