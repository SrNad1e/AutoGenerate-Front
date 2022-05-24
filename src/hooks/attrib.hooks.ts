import { useLazyQuery, useMutation } from '@apollo/client';

import type { Attrib } from '@/graphql/graphql';
import { AttribsDocument, CreateAttribDocument, UpdateAttribDocument } from '@/graphql/graphql';

export const useGetAttribs = () => {
  return useLazyQuery(AttribsDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useCreateAttrib = () => {
  return useMutation(CreateAttribDocument);
};

export const useUpdateAttrib = () => {
  return useMutation(UpdateAttribDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          colors(existingAttribs = []) {
            return existingAttribs?.docs?.map((attrib: Attrib) => {
              if (attrib?._id === data?.updateAttrib?._id) {
                return data?.updateAttrib;
              }
              return attrib;
            });
          },
        },
      });
    },
  });
};
