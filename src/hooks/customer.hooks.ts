import { useLazyQuery, useMutation } from '@apollo/client';

import { CreateCustomerDocument, CustomersDocument } from '@/graphql/graphql';

export const useGetCustomers = () => {
  return useLazyQuery(CustomersDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useCreatecustomer = () => {
  return useMutation(CreateCustomerDocument);
};
