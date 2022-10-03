import { useLazyQuery } from '@apollo/client';
import { ImagesDocument } from '@/graphql/graphql';

export const useGetImages = () => {
  return useLazyQuery(ImagesDocument);
};
