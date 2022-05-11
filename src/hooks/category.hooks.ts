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
  return useMutation(CreateCategoryDocument);
};

export const useUpdateCategory = () => {
  return useMutation(UpdateCategoryDocument);
};
