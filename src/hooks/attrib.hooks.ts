import { CREATEATTRIB, UPDATEATTRIB } from '@/graphql/mutations/attrib.mutations';
import { ATTRIBS } from '@/graphql/queries/attrib.queries';
import { useLazyQuery, useMutation } from '@apollo/client';

export const useGetAttribs = (
  callback: (data: ATTRIBS.ResponseAttribs) => void,
  showError: (message: string) => void,
) => {
  const [getAttribs, { loading }] = useLazyQuery(ATTRIBS, {
    onCompleted: (result) => callback(result.attribs),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    getAttribs,
    loading,
  };
};

export const useCreateAttrib = (
  callback: (data: ATTRIBS.Attribs) => void,
  showError: (message: string) => void,
) => {
  const [createAttrib, { loading }] = useMutation(CREATEATTRIB, {
    onCompleted: (result) => callback(result.createAttrib),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0].message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    createAttrib,
    loadingCreate: loading,
  };
};

export const useUpdateAttrib = (
  callback: (data: ATTRIBS.Attribs) => void,
  showError: (message: string) => void,
) => {
  const [updateAttrib, { loading }] = useMutation(UPDATEATTRIB, {
    onCompleted: (result) => callback(result.updateAttrib),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0].message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    updateAttrib,
    loadingUpdate: loading,
  };
};
