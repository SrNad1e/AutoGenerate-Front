import { CREATESIZE, UPDATESIZE } from '@/graphql/mutations/size.mutations';
import { SIZES } from '@/graphql/queries/size.queries';
import { useLazyQuery, useMutation } from '@apollo/client';

export const useGetSizes = (
  callback: (data: SIZE.ResponsePaginate) => void,
  showError: (message: string) => void,
) => {
  const [getSizes, { loading }] = useLazyQuery(SIZES, {
    onCompleted: (result) => callback(result?.sizes),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    getSizes,
    loading,
  };
};

export const useUpdateSizes = (
  callback: (data: SIZE.Size) => void,
  showError: (message: string) => void,
) => {
  const [updateSizes, { loading }] = useMutation(UPDATESIZE, {
    onCompleted: (result) => callback(result?.updateSize),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    updateSizes,
    loadingUpdate: loading,
  };
};

export const useCreateSizes = (
  callback: (data: SIZE.Size) => void,
  showError: (message: string) => void,
) => {
  const [createSizes, { loading }] = useMutation(CREATESIZE, {
    onCompleted: (result) => callback(result?.createSize),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0].message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    createSizes,
    loadingCreate: loading,
  };
};
