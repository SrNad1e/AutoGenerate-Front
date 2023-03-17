import type { Shop } from '@/graphql/graphql';
import { AddGoalHistoryDocument } from '@/graphql/graphql';
import { CreateShopDocument, ShopsDocument, UpdateShopDocument } from '@/graphql/graphql';
import { useLazyQuery, useMutation } from '@apollo/client';

export const useGetShops = () => {
  return useLazyQuery(ShopsDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useCreateShop = () => {
  return useMutation(CreateShopDocument);
};

export const useUpdateShop = () => {
  return useMutation(UpdateShopDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          shops(existingShops = []) {
            return existingShops?.docs?.map((shop: Shop) => {
              if (shop?._id === data?.updateShop?._id) {
                return data?.updateShop;
              }
              return shop;
            });
          },
          roleId() {
            return data?.updateShop;
          },
        },
      });
    },
  });
};

export const useAddGoal = () => {
  return useMutation(AddGoalHistoryDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          shopId() {
            return data?.addGoalHistory;
          },
        },
      });
    },
  });
};
