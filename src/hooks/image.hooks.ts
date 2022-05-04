import { IMAGES } from '@/graphql/queries/images.queries';
import { useLazyQuery } from '@apollo/client';

export const useGetImages = () => {
  return useLazyQuery(IMAGES);
};
