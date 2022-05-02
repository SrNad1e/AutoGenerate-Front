import { IMAGES } from '@/graphql/queries/images.queries';
import { useLazyQuery } from '@apollo/client';

export const useGetImages = (
  callback: (data: IMAGE.ResponsePaginate) => void,
  showError: (message: string) => void,
) => {
  const [getImages, { loading }] = useLazyQuery(IMAGES, {
    onCompleted: (result) => callback(result?.images),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    getImages,
    loading,
  };
};
