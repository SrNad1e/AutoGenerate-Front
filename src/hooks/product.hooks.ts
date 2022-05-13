import { useLazyQuery, useMutation } from '@apollo/client';

import {
  CreateProductDocument,
  ProductDocument,
  ProductsDocument,
  ReferenceIdDocument,
  UpdateProductDocument,
} from '@/graphql/graphql';

export const useGetProducts = () => {
  return useLazyQuery(ProductsDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useGetProduct = () => {
  return useLazyQuery(ProductDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useUpdateProduct = () => {
  return useMutation(UpdateProductDocument);
};

export const useCreateProduct = (id: string) => {
  return useMutation(CreateProductDocument, {
    refetchQueries: [{ query: ReferenceIdDocument, variables: { id } }],
  });
};
