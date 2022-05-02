import { CREATECATEGORY, UPDATECATEGORY } from '@/graphql/mutations/categories.mutations';
import { CATEGORIES } from '@/graphql/queries/categories.queries';
import { useLazyQuery, useMutation } from '@apollo/client';

export const useGetCategories = (
  callback: (data: Partial<CATEGORY.ResponsePaginate>) => void,
  showError: (message: string) => void,
) => {
  const [getCategories, { loading }] = useLazyQuery(CATEGORIES, {
    onCompleted: (result) => callback(result?.categories),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    getCategories,
    loading,
  };
};

export const useCreateCategory = (
  callback: (data: Partial<CATEGORY.CategoryLevel1>) => void,
  showError: (message: string) => void,
) => {
  const [createCategory, { loading }] = useMutation(CREATECATEGORY, {
    onCompleted: (result) => callback(result?.createCategory),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    createCategory,
    loadingCreate: loading,
  };
};

export const useUpdateCategory = (
  callback: (data: Partial<CATEGORY.CategoryLevel1>) => void,
  showError: (message: string) => void,
) => {
  const [updateCategory, { loading }] = useMutation(UPDATECATEGORY, {
    onCompleted: (result) => callback(result?.updateCategory),
    onError: ({ graphQLErrors }) => {
      const message = graphQLErrors ? graphQLErrors[0]?.message : 'Error sin identificar';

      showError(message ?? 'Error en la consulta');
    },
  });
  return {
    updateCategory,
    loadingUpdate: loading,
  };
};
