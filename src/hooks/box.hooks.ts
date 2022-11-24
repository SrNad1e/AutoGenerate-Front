import type { Box, ErrorCash } from '@/graphql/graphql';
import { ErrorCashDocument, VerifiedErrorCashDocument } from '@/graphql/graphql';
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

export const useGetErrorCash = () => {
  return useLazyQuery(ErrorCashDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useVerifiedErrorCash = () => {
  return useMutation(VerifiedErrorCashDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          errorCash(existingErrors = []) {
            return existingErrors?.docs?.map((errorCash: ErrorCash) => {
              if (errorCash?._id === data?.verifiedErrorsCash?._id) {
                return data?.verifiedErrorsCash;
              }
              return errorCash;
            });
          },
        },
      });
    },
  });
};
