import { useLazyQuery, useMutation } from '@apollo/client';

import { BrandsDocument, CreateBrandDocument, UpdateBrandDocument } from '@/graphql/graphql';

export const useGetBrands = () => {
  return useLazyQuery(BrandsDocument);
};

export const useCreateBrand = () => {
  return useMutation(CreateBrandDocument);
};

export const useUpdateBrand = () => {
  return useMutation(UpdateBrandDocument);
};
