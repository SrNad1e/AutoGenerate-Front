import {
  ADDPAYMENTSORDER,
  APPPRODUCTSORDER,
  CREATEORDER,
  UPDATEORDER,
} from '@/graphql/mutations/order.mutations';
import { ORDER, ORDERSBYPOS } from '@/graphql/queries/order.queries';
import { useLazyQuery, useMutation } from '@apollo/client';

export const useGetOrder = (
  callback: (data: Partial<ORDER.Order[]>) => void,
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

export const useGetOrdersByPos = (
  callback: (data: Partial<ORDER.Order[]>) => void,
  showError: (message: string) => void,
) => {
  const [getOrdersByPos, { loading }] = useLazyQuery(ORDERSBYPOS, {
    onCompleted: (result) => callback(result?.ordersByPointOfSale),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    getOrdersByPos,
    loading,
  };
};

export const useCreateOrder = (
  callback: (data: Partial<ORDER.Order>) => void,
  showError: (message: string) => void,
) => {
  const [createOrder, { loading }] = useMutation(CREATEORDER, {
    onCompleted: (result) => callback(result?.createOrder),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    createOrder,
    loading,
  };
};

export const useUpdateOrder = (
  callback: (data: Partial<ORDER.Order>) => void,
  showError: (message: string) => void,
) => {
  const [updateOrder, { loading }] = useMutation(UPDATEORDER, {
    onCompleted: (result) => callback(result?.updateOrder),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    updateOrder,
    loading,
  };
};

export const useAddPaymentsOrder = (
  callback: (data: Partial<ORDER.Order>) => void,
  showError: (message: string) => void,
) => {
  const [addPaymentsOrder, { loading }] = useMutation(ADDPAYMENTSORDER, {
    onCompleted: (result) => callback(result?.addPaymentsOrder),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    addPaymentsOrder,
    loading,
  };
};

export const useAddProductsOrder = (
  callback: (data: Partial<ORDER.Order>) => void,
  showError: (message: string) => void,
) => {
  const [addProductsOrder, { loading }] = useMutation(APPPRODUCTSORDER, {
    onCompleted: (result) => callback(result?.addProductsOrder),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    addProductsOrder,
    loading,
  };
};
