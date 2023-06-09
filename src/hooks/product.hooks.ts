import { useLazyQuery, useMutation } from '@apollo/client';

import type { Product } from '@/graphql/graphql';
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
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  });
};

export const useUpdateProduct = () => {
  return useMutation(UpdateProductDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          products(existingProducts = []) {
            return existingProducts?.docs?.map((product: Product) => {
              if (product?._id === data?.updateProduct?._id) {
                return data?.updateProduct;
              }
              return product;
            });
          },
        },
      });
    },
  });
};

export const useCreateProduct = (id: string) => {
  return useMutation(CreateProductDocument, {
    refetchQueries: [{ query: ReferenceIdDocument, variables: { id } }],
  });
};
