import { useLazyQuery, useMutation } from '@apollo/client';

import type { Brand } from '@/graphql/graphql';
import { BrandsDocument, CreateBrandDocument, UpdateBrandDocument } from '@/graphql/graphql';

export const useGetBrands = () => {
  return useLazyQuery(BrandsDocument);
};

export const useCreateBrand = () => {
  return useMutation(CreateBrandDocument);
};

export const useUpdateBrand = () => {
  return useMutation(UpdateBrandDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          colors(existingBrands = []) {
            return existingBrands?.docs?.map((brand: Brand) => {
              if (brand?._id === data?.updateBrand?._id) {
                return data?.updateBrand;
              }
              return brand;
            });
          },
        },
      });
    },
  });
};
