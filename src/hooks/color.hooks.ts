import { useLazyQuery, useMutation } from '@apollo/client';

import { ColorsDocument, CreateColorDocument, UpdateColorDocument } from '@/graphql/graphql';

export const useGetColors = () => {
  return useLazyQuery(ColorsDocument);
};

export const useCreateColor = () => {
  return useMutation(CreateColorDocument);
};

export const useUpdateColor = () => {
  return useMutation(UpdateColorDocument);
};
