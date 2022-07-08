import type { Box } from '@/graphql/graphql';
import { BoxesDocument, CreateBoxDocument, UpdateBoxDocument } from '@/graphql/graphql';
import { useLazyQuery, useMutation } from '@apollo/client';

export const useGetBoxes = () => {
  return useLazyQuery(BoxesDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useCreateBox = () => {
  return useMutation(CreateBoxDocument);
};

export const useUpdateBox = () => {
  return useMutation(UpdateBoxDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          boxes(existingBoxes = []) {
            return existingBoxes?.docs?.map((boxes: Box) => {
              if (boxes?._id === data?.updateBox?._id) {
                return data?.updateBox;
              }
              return boxes;
            });
          },
        },
      });
    },
  });
};
