import { useLazyQuery, useMutation } from '@apollo/client';

import {
  CategoriesDocument,
  CategoriesLevelDocument,
  CreateCategoryDocument,
  UpdateCategoryDocument,
} from '@/graphql/graphql';

export const useGetCategories = () => {
  return useLazyQuery(CategoriesDocument);
};

export const useGetCategoriesLevel = () => {
  return useLazyQuery(CategoriesLevelDocument);
};

export const useCreateCategory = () => {
  return useMutation(CreateCategoryDocument, {
    refetchQueries: [{ query: CategoriesDocument, variables: { input: {} } }],
  });
};

export const useUpdateCategory = () => {
  return useMutation(UpdateCategoryDocument, {
    refetchQueries: [{ query: CategoriesDocument, variables: { input: {} } }],
  });
};
