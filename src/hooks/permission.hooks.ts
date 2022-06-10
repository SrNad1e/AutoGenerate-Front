import { PermissionsDocument } from '@/graphql/graphql';
import { useLazyQuery } from '@apollo/client';

export const useGetPermissions = () => {
  return useLazyQuery(PermissionsDocument, {
    fetchPolicy: 'cache-first',
  });
};
