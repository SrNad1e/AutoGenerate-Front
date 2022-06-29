import type { Credit } from '@/graphql/graphql';
import { CreateCreditDocument } from '@/graphql/graphql';
import { CreditHistoryDocument } from '@/graphql/graphql';
import { CreditDocument, CreditsDocument, UpdateCreditDocument } from '@/graphql/graphql';
import { useLazyQuery, useMutation } from '@apollo/client';

export const useGetCredit = () => {
  return useLazyQuery(CreditDocument, { fetchPolicy: 'cache-first' });
};

export const useGetCredits = () => {
  return useLazyQuery(CreditsDocument, { fetchPolicy: 'cache-first' });
};

export const useCreateCredit = () => {
  return useMutation(CreateCreditDocument);
};

export const useUpdateCredit = () => {
  return useMutation(UpdateCreditDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          credits(existingCredits = []) {
            return existingCredits?.docs?.map((credit: Credit) => {
              if (credit?._id === data?.updateCredit?._id) {
                return data?.updateCredit;
              }
              return credit;
            });
          },
        },
      });
    },
  });
};

export const useGetHistoryCredits = () => {
  return useLazyQuery(CreditHistoryDocument, {
    fetchPolicy: 'cache-first',
  });
};
