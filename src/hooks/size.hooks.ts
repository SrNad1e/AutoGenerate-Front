import { useLazyQuery, useMutation } from '@apollo/client';

import type { Size } from '@/graphql/graphql';
import { SizesDocument, UpdateSizeDocument, CreateSizeDocument } from '@/graphql/graphql';

export const useGetSizes = () => {
  return useLazyQuery(SizesDocument);
};

export const useUpdateSize = () => {
  return useMutation(UpdateSizeDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          sizes(existingSizes = []) {
            return existingSizes?.docs?.map((size: Size) => {
              if (size?._id === data?.updateSize?._id) {
                return data?.updateSize;
              }
              return size;
            });
          },
        },
      });
    },
  });
};

export const useCreateSize = () => {
  return useMutation(CreateSizeDocument);
};
