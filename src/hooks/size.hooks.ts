import { SIZES } from '@/graphql/queries/size.queries';
import { useLazyQuery } from '@apollo/client';

export const useGetSizes = (
  callback: (data: SIZE.ResponsePaginate) => void,
  showError: (message: string) => void,
) => {
  const [getSizes, { loading }] = useLazyQuery(SIZES, {
    onCompleted: (result) => callback(result.sizes),
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
