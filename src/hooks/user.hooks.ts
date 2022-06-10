import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

import {
  CreateUserDocument,
  CurrentUserDocument,
  LoginDocument,
  UpdateUserDocument,
  UsersDocument,
} from '@/graphql/graphql';

import type { User } from '@/graphql/graphql';

export const useLogin = () => {
  return useMutation(LoginDocument);
};

export const useGetCurrentUser = () => {
  return useQuery(CurrentUserDocument);
};

export const useGetUsers = () => {
  return useLazyQuery(UsersDocument);
};

export const useCreateUser = () => {
  return useMutation(CreateUserDocument);
};

export const useUpdateUser = () => {
  return useMutation(UpdateUserDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          users(existingUsers = []) {
            return existingUsers?.docs?.map((user: User) => {
              if (user?._id === data?.updateUser?._id) {
                return data?.updateUser;
              }
              return user;
            });
          },
        },
      });
    },
  });
};
