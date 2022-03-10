import { CREATEREQUEST, UPDATEREQUEST } from '@/graphql/mutations/request.mutations';
import { REQUEST, REQUESTS } from '@/graphql/queries/request.queries';
import { useLazyQuery, useMutation } from '@apollo/client';

export const useCreateRequest = (
  callback: (data: Partial<REQUEST.Request>) => void,
  showError: (message: string) => void,
) => {
  const [createRequest, { loading }] = useMutation(CREATEREQUEST, {
    onCompleted: (result) => callback(result.createStockRequest),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    createRequest,
    loadingCreate: loading,
  };
};

export const useGetRequest = (
  callback: (data: Partial<REQUEST.Request>) => void,
  showError: (message: string) => void,
) => {
  const [getRequest, { loading }] = useLazyQuery(REQUEST, {
    onCompleted: (result) => callback(result?.stockRequestId),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    getRequest,
    loading,
  };
};

export const useUpdateRequest = (
  callback: (data: Partial<REQUEST.Request>) => void,
  showError: (message: string) => void,
) => {
  const [updateRequest, { loading }] = useMutation(UPDATEREQUEST, {
    onCompleted: (result) => callback(result.updateStockRequest),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    updateRequest,
    loadingUpdate: loading,
  };
};

export const useGetRequests = (
  callback: (data: Partial<REQUEST.Request>) => void,
  showError: (message: string) => void,
) => {
  const [getRequests, { loading }] = useLazyQuery(REQUESTS, {
    onCompleted: (result) => callback(result?.getRequests),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    getRequests,
    loading,
  };
};
