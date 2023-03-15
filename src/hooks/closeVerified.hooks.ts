import { useLazyQuery, useMutation } from '@apollo/client';
import { CloseVDocument, CreateCloseVDocument } from '@/graphql/graphql';

export const useGetCloseVerified = () => {
  return useLazyQuery(CloseVDocument);
};

export const useCreateCloseVerified = () => {
  return useMutation(CreateCloseVDocument);
};
