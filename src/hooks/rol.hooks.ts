import {
  CreateRoleDocument,
  RoleIdDocument,
  RolesDocument,
  UpdateRoleDocument,
} from '@/graphql/graphql';
import type { Role } from '@/graphql/graphql';
import { useLazyQuery, useMutation } from '@apollo/client';

export const useGetRoles = () => {
  return useLazyQuery(RolesDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useGetRol = () => {
  return useLazyQuery(RoleIdDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useCreateRol = () => {
  return useMutation(CreateRoleDocument);
};

export const useUpdateRol = () => {
  return useMutation(UpdateRoleDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          roles(existingRoles = []) {
            return existingRoles?.docs?.map((role: Role) => {
              if (role?._id === data?.updateRole?._id) {
                return data?.updateRole;
              }
              return role;
            });
          },
          roleId() {
            return data?.updateRole;
          },
        },
      });
    },
  });
};
