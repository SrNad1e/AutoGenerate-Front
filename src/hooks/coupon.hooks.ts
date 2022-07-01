import { useLazyQuery } from '@apollo/client';

import { CouponDocument } from '@/graphql/graphql';

export const useGetCoupon = () => {
  return useLazyQuery(CouponDocument, {
    fetchPolicy: 'cache-first',
  });
};
