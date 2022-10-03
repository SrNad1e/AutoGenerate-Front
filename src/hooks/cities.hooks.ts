import type { City } from '@/graphql/graphql';
import { CitiesDocument, CreateCityDocument, UpdateCityDocument } from '@/graphql/graphql';
import { useLazyQuery, useMutation } from '@apollo/client';

export const useGetCities = () => {
  return useLazyQuery(CitiesDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useCreateCities = () => {
  return useMutation(CreateCityDocument);
};

export const useUpdateCity = () => {
  return useMutation(UpdateCityDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          cities(existingCities = []) {
            return existingCities?.docs?.map((city: City) => {
              if (city?._id === data?.updateCity?._id) {
                return data?.updateCity;
              }
              return city;
            });
          },
        },
      });
    },
  });
};
