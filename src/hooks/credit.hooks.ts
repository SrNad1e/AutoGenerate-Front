import { CreditDocument } from '@/graphql/graphql';
import { useLazyQuery } from '@apollo/client';

export const useGetCredit = () => {
  return useLazyQuery(CreditDocument, { fetchPolicy: 'cache-first' });
};
