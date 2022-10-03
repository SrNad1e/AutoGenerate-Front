import { useLazyQuery, useMutation } from '@apollo/client';

import type { Color } from '@/graphql/graphql';
import { ColorsDocument, CreateColorDocument, UpdateColorDocument } from '@/graphql/graphql';

export const useGetColors = () => {
  return useLazyQuery(ColorsDocument);
};

export const useCreateColor = () => {
  return useMutation(CreateColorDocument);
};

export const useUpdateColor = () => {
  return useMutation(UpdateColorDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          colors(existingColors = []) {
            return existingColors?.docs?.map((color: Color) => {
              if (color?._id === data?.updateColor?._id) {
                return data?.updateColor;
              }
              return color;
            });
          },
        },
      });
    },
  });
};
