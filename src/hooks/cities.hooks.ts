import { CitiesDocument } from '@/graphql/graphql';
import { useLazyQuery } from '@apollo/client';

export const useGetCities = () => {
  return useLazyQuery(CitiesDocument, {
    fetchPolicy: 'cache-first',
  });
};
