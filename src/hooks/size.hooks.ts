import { useLazyQuery, useMutation } from '@apollo/client';

import { SizesDocument, UpdateSizeDocument, CreateSizeDocument } from '@/graphql/graphql';

export const useGetSizes = () => {
  return useLazyQuery(SizesDocument);
};

export const useUpdateSize = () => {
  return useMutation(UpdateSizeDocument);
};

export const useCreateSize = () => {
  return useMutation(CreateSizeDocument);
};
