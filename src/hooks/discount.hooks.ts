import type { DiscountRule } from '@/graphql/graphql';
import { CreateDiscountRuleDocument } from '@/graphql/graphql';
import { DiscountRulesDocument, UpdateDiscountRuleDocument } from '@/graphql/graphql';
import { useLazyQuery, useMutation } from '@apollo/client';

export const useGetDiscountsRules = () => {
  return useLazyQuery(DiscountRulesDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useCreateDiscountRule = () => {
  return useMutation(CreateDiscountRuleDocument);
};

export const useUpdateDiscountRule = () => {
  return useMutation(UpdateDiscountRuleDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          discountsRules(existingDiscountRules = []) {
            return existingDiscountRules?.docs?.map((discountsRules: DiscountRule) => {
              if (discountsRules?._id === data?.updateDiscountRule?._id) {
                return data?.updateDiscountRule;
              }
              return discountsRules;
            });
          },
        },
      });
    },
  });
};
