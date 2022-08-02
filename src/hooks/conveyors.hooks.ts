import { ConveyorsDocument } from '@/graphql/graphql';
import { useLazyQuery } from '@apollo/client';

export const useGetConveyors = () => {
  return useLazyQuery(ConveyorsDocument, {
    fetchPolicy: 'cache-first',
  });
};
