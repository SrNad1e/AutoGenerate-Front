import { useLazyQuery, useMutation } from '@apollo/client';

import {
  CreateProductDocument,
  Product,
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
  return useMutation(UpdateProductDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          colors(existingProducts = []) {
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
