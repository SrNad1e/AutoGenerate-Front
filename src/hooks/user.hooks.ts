import { useMutation, useQuery } from '@apollo/client';

import { LOGIN } from '@/graphql/mutations/user.mutations';
import { CURRENTUSER } from '@/graphql/queries/user.queries';

export const useLogin = (
  callback: (data: USER.Response) => void,
  showError: (message: string) => void,
) => {
  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: (result) => callback(result.login),
    onError: ({ graphQLErrors }) => showError(graphQLErrors[0].message),
  });

  return {
    login,
    loading,
  };
};

export const useGetCurrentUser = () => {
  const result = useQuery(CURRENTUSER);
  return result;
};
