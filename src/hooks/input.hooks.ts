import { CREATEINPUT, UPDATEINPUT } from '@/graphql/mutations/input.mutations';
import { INPUT, INPUTS } from '@/graphql/queries/input.queries';
import { useLazyQuery, useMutation } from '@apollo/client';

export const useCreateInput = (
  callback: (data: Partial<INPUT.Input>) => void,
  showError: (message: string) => void,
) => {
  const [createInput, { loading }] = useMutation(CREATEINPUT, {
    onCompleted: (result) => callback(result.createStockInput),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    createInput,
    loadingCreate: loading,
  };
};

export const useGetInput = (
  callback: (data: Partial<INPUT.Input>) => void,
  showError: (message: string) => void,
) => {
  const [getInput, { loading }] = useLazyQuery(INPUT, {
    onCompleted: (result) => callback(result?.stockInputId),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    getInput,
    loading,
  };
};

export const useGetInputs = (
  callback: (data: Partial<INPUT.Response>) => void,
  showError: (message: string) => void,
) => {
  const [getInputs, { loading }] = useLazyQuery(INPUTS, {
    onCompleted: (result) => callback(result?.stockInputs),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    getInputs,
    loading,
  };
};

export const useUpdateInput = (
  callback: (data: Partial<INPUT.Input>) => void,
  showError: (message: string) => void,
) => {
  const [updateInput, { loading }] = useMutation(UPDATEINPUT, {
    onCompleted: (result) => callback(result.updateStockInput),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    updateInput,
    loadingUpdate: loading,
  };
};
