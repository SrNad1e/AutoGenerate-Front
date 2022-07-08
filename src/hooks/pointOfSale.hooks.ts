import { CreatePointOfSaleDocument, PointOfSalesDocument } from '@/graphql/graphql';
import { useLazyQuery, useMutation } from '@apollo/client';

export const useGetPointOfSales = () => {
  return useLazyQuery(PointOfSalesDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useCreatePointOfSale = () => {
  return useMutation(CreatePointOfSaleDocument);
};

/*export const useUpdatePointOfSale = () => {
  return useMutation(UpdateBrandDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          brands(existingBrands = []) {
            return existingBrands?.docs?.map((brand: Brand) => {
              if (brand?._id === data?.updateBrand?._id) {
                return data?.updateBrand;
              }
              return brand;
            });
          },
        },
      });
    },
  });
};*/
