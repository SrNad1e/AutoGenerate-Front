import { useLazyQuery, useMutation } from '@apollo/client';

import {
  CREATEREQUEST,
  GENERATEREQUEST,
  UPDATEREQUEST,
} from '@/graphql/mutations/request.mutations';
import { REQUEST, REQUESTS } from '@/graphql/queries/request.queries';

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
    loadingGetOne: loading,
  };
};

export const useGetRequests = (
  callback: (data: Partial<REQUEST.Response>) => void,
  showError: (message: string) => void,
) => {
  const [getRequests, { loading }] = useLazyQuery(REQUESTS, {
    onCompleted: (result) => callback(result?.stockRequests),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    getRequests,
    loadingGetAll: loading,
  };
};

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

export const useGenerateRequest = (
  callback: (data: Partial<REQUEST.Request>) => void,
  showError: (message: string) => void,
) => {
  const [generateRequest, { loading }] = useMutation(GENERATEREQUEST, {
    onCompleted: (result) => callback(result.generateStockRequest),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    generateRequest,
    loadingGenerate: loading,
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
