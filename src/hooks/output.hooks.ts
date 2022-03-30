import { CREATEOUTPUT, UPDATEOUTPUT } from '@/graphql/mutations/output.mutations';
import { OUTPUT, OUTPUTS } from '@/graphql/queries/output.queries';
import { useLazyQuery, useMutation } from '@apollo/client';

export const useCreateOutput = (
  callback: (data: Partial<OUTPUT.Output>) => void,
  showError: (message: string) => void,
) => {
  const [createOutput, { loading }] = useMutation(CREATEOUTPUT, {
    onCompleted: (result) => callback(result.createStockOutput),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    createOutput,
    loadingCreate: loading,
  };
};

export const useGetOutput = (
  callback: (data: Partial<OUTPUT.Output>) => void,
  showError: (message: string) => void,
) => {
  const [getOutput, { loading }] = useLazyQuery(OUTPUT, {
    onCompleted: (result) => callback(result?.stockOutputId),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    getOutput,
    loading,
  };
};

export const useGetOutputs = (
  callback: (data: Partial<OUTPUT.Response>) => void,
  showError: (message: string) => void,
) => {
  const [getOutputs, { loading }] = useLazyQuery(OUTPUTS, {
    onCompleted: (result) => callback(result?.stockOutputs),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    getOutputs,
    loading,
  };
};

export const useUpdateOutput = (
  callback: (data: Partial<OUTPUT.Output>) => void,
  showError: (message: string) => void,
) => {
  const [updateOutput, { loading }] = useMutation(UPDATEOUTPUT, {
    onCompleted: (result) => callback(result.updateStockOutput),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    updateOutput,
    loadingUpdate: loading,
  };
};
