import { CREATEBRAND, UPDATEBRAND } from '@/graphql/mutations/brands.mutations';
import { BRANDS } from '@/graphql/queries/brand.queries';
import { useLazyQuery, useMutation } from '@apollo/client';

export const useGetBrands = (
  callback: (data: BRAND.ResponseBrands) => void,
  showError: (message: string) => void,
) => {
  const [getBrands, { loading }] = useLazyQuery(BRANDS, {
    onCompleted: (result) => callback(result.brands),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    getBrands,
    loadingGet: loading,
  };
};

export const useCreateBrand = (
  callback: (data: BRAND.Brand) => void,
  showError: (message: string) => void,
) => {
  const [createBrands, { loading }] = useMutation(CREATEBRAND, {
    onCompleted: (result) => callback(result.createBrand),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0].message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    createBrands,
    loadingCreate: loading,
  };
};

export const useUpdateBrand = (
  callback: (data: BRAND.Brand) => void,
  showError: (message: string) => void,
) => {
  const [updateBrands, { loading }] = useMutation(UPDATEBRAND, {
    onCompleted: (result) => callback(result.updateBrand),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0].message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    updateBrands,
    loadingUpdate: loading,
  };
};
