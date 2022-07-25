import { useLazyQuery, useMutation } from '@apollo/client';

import type { Customer } from '@/graphql/graphql';
import {
  CreateCustomerDocument,
  CustomersDocument,
  UpdateCustomerDocument,
} from '@/graphql/graphql';

export const useGetCustomers = () => {
  return useLazyQuery(CustomersDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useCreatecustomer = () => {
  return useMutation(CreateCustomerDocument);
};

export const useUpdateCustomer = () => {
  return useMutation(UpdateCustomerDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          customer(customers = []) {
            return customers?.docs?.map((customer: Customer) => {
              if (customer?._id === data?.updateCustomer?._id) {
                return data?.updateCustomer;
              }
              return customer;
            });
          },
        },
      });
    },
  });
};
