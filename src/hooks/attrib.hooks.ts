import { useLazyQuery, useMutation } from '@apollo/client';

import { AttribsDocument, CreateAttribDocument, UpdateAttribDocument } from '@/graphql/graphql';

export const useGetAttribs = () => {
  return useLazyQuery(AttribsDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useCreateAttrib = () => {
  return useMutation(CreateAttribDocument, {
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: AttribsDocument });
      console.log(dataInStore?.attribs);
      store.writeQuery({
        query: AttribsDocument,
        data: {
          ...dataInStore,
          attribs: {
            ...dataInStore?.attribs,
            docs: [response.data?.createAttrib],
          },
        },
      });
    },
  });
};

export const useUpdateAttrib = () => {
  return useMutation(UpdateAttribDocument);
};
