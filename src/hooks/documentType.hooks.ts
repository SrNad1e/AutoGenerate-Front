import { useLazyQuery } from '@apollo/client';

import { DocumentTypesDocument } from '@/graphql/graphql';

export const useGetDocumentTypes = () => {
  return useLazyQuery(DocumentTypesDocument, {
    fetchPolicy: 'cache-first',
  });
};
