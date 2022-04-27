import { CREATEREFERENCE, UPDATEREFERENCE } from '@/graphql/mutations/reference.mutations';
import { REFERENCE, REFERENCES } from '@/graphql/queries/reference.queries';
import { useLazyQuery, useMutation } from '@apollo/client';

export const useGetReference = (
  callback: (data: Partial<PRODUCT.Reference>) => void,
  showError: (message: string) => void,
) => {
  const [getReference, { loading }] = useLazyQuery(REFERENCE, {
    onCompleted: (result) => callback(result?.referenceId),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    getReference,
    loadingGetOne: loading,
  };
};

export const useGetReferences = (
  callback: (data: Partial<PRODUCT.ResponsePaginate>) => void,
  showError: (message: string) => void,
) => {
  const [getReferences, { loading }] = useLazyQuery(REFERENCES, {
    onCompleted: (result) => callback(result?.references),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    getReferences,
    loading,
  };
};

export const useCreateReference = (
  callback: (data: Partial<PRODUCT.Reference>) => void,
  showError: (message: string) => void,
) => {
  const [createReference, { loading }] = useMutation(CREATEREFERENCE, {
    onCompleted: (result) => callback(result.createReference),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0].message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    createReference,
    loadingCreate: loading,
  };
};

export const useUpdateReference = (
  callback: (data: Partial<PRODUCT.Reference>) => void,
  showError: (message: string) => void,
) => {
  const [updateReference, { loading }] = useMutation(UPDATEREFERENCE, {
    onCompleted: (result) => callback(result.updateReference),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0].message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    updateReference,
    loadingUpdate: loading,
  };
};
