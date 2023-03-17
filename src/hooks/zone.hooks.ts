import { useLazyQuery, useMutation } from '@apollo/client';
import { ZoneDocument, CreatezoneDocument, UpdatezoneDocument } from '@/graphql/graphql';

export const useGetZone = () => {
  return useLazyQuery(ZoneDocument);
};

export const useCreateZone = () => {
  return useMutation(CreatezoneDocument);
};

export const useUpdateZone = () => {
  return useMutation(UpdatezoneDocument);
};
