import { useLazyQuery, useMutation } from '@apollo/client';
import { CreateregionDocument, GetregionDocument, UpdateregionDocument } from '@/graphql/graphql';

export const useGetRegion = () => {
  return useLazyQuery(GetregionDocument);
};

export const useCreateRegion = () => {
  return useMutation(CreateregionDocument);
};

export const useUpdateRegion = () => {
  return useMutation(UpdateregionDocument);
};
