import { COLORS } from '@/graphql/queries/color.queries';
import { useLazyQuery } from '@apollo/client';

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
