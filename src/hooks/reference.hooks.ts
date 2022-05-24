import { useLazyQuery, useMutation } from '@apollo/client';

import type { Reference } from '@/graphql/graphql';
import {
  CreateReferenceDocument,
  ReferenceIdDocument,
  ReferencesDocument,
  UpdateReferenceDocument,
} from '@/graphql/graphql';

export const useGetReference = () => {
  return useLazyQuery(ReferenceIdDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useGetReferences = () => {
  return useLazyQuery(ReferencesDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useCreateReference = () => {
  return useMutation(CreateReferenceDocument);
};

export const useUpdateReference = () => {
  return useMutation(UpdateReferenceDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          colors(existingReferences = []) {
            return existingReferences?.docs?.map((reference: Reference) => {
              if (reference?._id === data?.updateReference?._id) {
                return data?.updateReference;
              }
              return reference;
            });
          },
        },
      });
    },
  });
};
