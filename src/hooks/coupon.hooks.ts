import { useLazyQuery, useMutation } from '@apollo/client';
import type { Coupon } from '@/graphql/graphql';
import {
  CouponDocument,
  CouponsDocument,
  CreateCouponDocument,
  UpdateCouponDocument,
} from '@/graphql/graphql';

export const useGetCoupon = () => {
  return useLazyQuery(CouponDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useGetCoupons = () => {
  return useLazyQuery(CouponsDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useCreateCoupon = () => {
  return useMutation(CreateCouponDocument);
};

export const useUpdateCoupon = () => {
  return useMutation(UpdateCouponDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          coupons(existingCoupons = []) {
            return existingCoupons?.docs?.map((coupon: Coupon) => {
              if (coupon?._id === data?.updateCoupon?._id) {
                return data?.updateCoupon;
              }
              return coupon;
            });
          },
        },
      });
    },
  });
};
