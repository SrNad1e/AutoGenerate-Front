import { BoxesDocument } from '@/graphql/graphql';
import { useLazyQuery } from '@apollo/client';

export const useGetBox = () => {
  return useLazyQuery(BoxesDocument, {
    fetchPolicy: 'cache-first',
  });
};
