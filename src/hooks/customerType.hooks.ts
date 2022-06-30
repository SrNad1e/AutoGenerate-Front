import { CustomerTypesDocument } from '@/graphql/graphql';
import { useLazyQuery } from '@apollo/client';

export const useGetCustomerTypes = () => {
  return useLazyQuery(CustomerTypesDocument, {
    fetchPolicy: 'cache-first',
  });
};
