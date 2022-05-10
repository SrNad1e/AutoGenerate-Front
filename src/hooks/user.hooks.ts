import { useMutation, useQuery } from '@apollo/client';

import { CurrentUserDocument, LoginDocument } from '@/graphql/graphql';

export const useLogin = () => {
  return useMutation(LoginDocument);
};

export const useGetCurrentUser = () => {
  return useQuery(CurrentUserDocument);
};
