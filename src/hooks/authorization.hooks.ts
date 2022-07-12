import type { AuthorizationDian } from '@/graphql/graphql';
import {
  AuthorizationsDocument,
  CreateAuthorizationDocument,
  UpdateAuthorizationDocument,
} from '@/graphql/graphql';
import { useLazyQuery, useMutation } from '@apollo/client';

export const useGetAuthorizations = () => {
  return useLazyQuery(AuthorizationsDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useCreateAuthorization = () => {
  return useMutation(CreateAuthorizationDocument);
};

export const useUpdateAuthorization = () => {
  return useMutation(UpdateAuthorizationDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          authorizations(existingAuthorizations = []) {
            return existingAuthorizations?.docs?.map((authorizations: AuthorizationDian) => {
              if (authorizations?._id === data?.updateAuthorization?._id) {
                return data?.updateAuthorization;
              }
              return authorizations;
            });
          },
        },
      });
    },
  });
};
