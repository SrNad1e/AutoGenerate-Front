import type { PointOfSale } from '@/graphql/graphql';
import {
  CreatePointOfSaleDocument,
  PointOfSalesDocument,
  UpdatePointOfSaleDocument,
} from '@/graphql/graphql';
import { useLazyQuery, useMutation } from '@apollo/client';

export const useGetPointOfSales = () => {
  return useLazyQuery(PointOfSalesDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useCreatePointOfSale = () => {
  return useMutation(CreatePointOfSaleDocument);
};

export const useUpdatePointOfSale = () => {
  return useMutation(UpdatePointOfSaleDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          pointOfSales(existingPointOfSales = []) {
            return existingPointOfSales?.docs?.map((pointOfSale: PointOfSale) => {
              if (pointOfSale?._id === data?.updatePointOfSale?._id) {
                return data?.updatePointOfSale;
              }
              return pointOfSale;
            });
          },
        },
      });
    },
  });
};
