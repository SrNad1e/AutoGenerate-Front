import { useLazyQuery, useMutation } from '@apollo/client';
import {
  CreateReferenceDocument,
  ReferenceIdDocument,
  ReferencesDocument,
  UpdateReferenceDocument,
} from '@/graphql/graphql';

export const useGetReference = () => {
  return useLazyQuery(ReferenceIdDocument);
};

export const useGetReferences = () => {
  return useLazyQuery(ReferencesDocument);
};

export const useCreateReference = () => {
  return useMutation(CreateReferenceDocument);
};

export const useUpdateReference = () => {
  return useMutation(UpdateReferenceDocument);
};
