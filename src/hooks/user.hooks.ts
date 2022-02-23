import { useMutation, useQuery } from '@apollo/client';

import { LOGIN } from '@/graphql/mutations/user.mutations';
import { CURRENTUSER } from '@/graphql/queries/user.queries';

export const useLogin = () => {
  const [login, { data, error, loading }] = useMutation(LOGIN);

  return {
    login,
    data,
    error,
    loading,
  };
};

export const useGetCurrentUser = () => {
  const result = useQuery(CURRENTUSER);
  return result;
};
