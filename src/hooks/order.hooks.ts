import { ORDER } from '@/graphql/queries/order.queries';
import { useLazyQuery } from '@apollo/client';

export const useGetOrder = (
  callback: (data: Partial<ORDER.Order>) => void,
  showError: (message: string) => void,
) => {
  const [getOrder, { loading }] = useLazyQuery(ORDER, {
    onCompleted: (result) => callback(result?.orderId),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    getOrder,
    loadingGetOne: loading,
  };
};

export const useGetOrders = () => {};
