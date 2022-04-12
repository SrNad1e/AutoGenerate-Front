import { CREATEADJUSTMENT, UPDATEADJUSTMENT } from '@/graphql/mutations/adjustment.mutations';
import { ADJUSTMENT, ADJUSTMENTS } from '@/graphql/queries/adjustment.queries';
import { useLazyQuery, useMutation } from '@apollo/client';

export const useCreateAdjustment = (
  callback: (data: Partial<ADJUSTMENT.Adjustment>) => void,
  showError: (message: string) => void,
) => {
  const [createAdjustment, { loading }] = useMutation(CREATEADJUSTMENT, {
    onCompleted: (result) => callback(result.createStockAdjustment),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    createAdjustment,
    loadingCreate: loading,
  };
};

export const useGetAdjustment = (
  callback: (data: Partial<ADJUSTMENT.Adjustment>) => void,
  showError: (message: string) => void,
) => {
  const [getAdjustment, { loading }] = useLazyQuery(ADJUSTMENT, {
    onCompleted: (result) => callback(result?.stockAdjustmentId),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    getAdjustment,
    loading,
  };
};

export const useGetAdjustments = (
  callback: (data: Partial<ADJUSTMENT.Response>) => void,
  showError: (message: string) => void,
) => {
  const [getAdjustments, { loading }] = useLazyQuery(ADJUSTMENTS, {
    onCompleted: (result) => callback(result?.stockAdjustments),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    getAdjustments,
    loading,
  };
};

export const useUpdateAdjustment = (
  callback: (data: Partial<ADJUSTMENT.Adjustment>) => void,
  showError: (message: string) => void,
) => {
  const [updateAdjustment, { loading }] = useMutation(UPDATEADJUSTMENT, {
    onCompleted: (result) => callback(result.updateStockAdjustment),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    updateAdjustment,
    loadingUpdate: loading,
  };
};
