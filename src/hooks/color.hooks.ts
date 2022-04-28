import { CREATECOLOR, UPDATECOLOR } from '@/graphql/mutations/color.mutations';
import { COLORS } from '@/graphql/queries/color.queries';
import { useLazyQuery, useMutation } from '@apollo/client';

export const useGetColors = (
  callback: (data: COLOR.ResponsePaginate) => void,
  showError: (message: string) => void,
) => {
  const [getColors, { loading }] = useLazyQuery(COLORS, {
    onCompleted: (result) => callback(result.colors),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    getColors,
    loading,
  };
};

export const useCreateColor = (
  callback: (data: COLOR.Color) => void,
  showError: (message: string) => void,
) => {
  const [createColor, { loading }] = useMutation(CREATECOLOR, {
    onCompleted: (result) => callback(result.createColor),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    createColor,
    loadingCreate: loading,
  };
};

export const useUpdateColor = (
  callback: (data: COLOR.Color) => void,
  showError: (message: string) => void,
) => {
  const [updateColor, { loading }] = useMutation(UPDATECOLOR, {
    onCompleted: (result) => callback(result.updateColor),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    updateColor,
    loadingUpdate: loading,
  };
};
