import {
  CategoriesDocument,
  CreateCategoryDocument,
  UpdateCategoryDocument,
} from '@/graphql/graphql';
import { useLazyQuery, useMutation } from '@apollo/client';

export const useGetCategories = () => {
  return useLazyQuery(CategoriesDocument);
};

export const useCreateCategory = () => {
  return useMutation(CreateCategoryDocument);
};

export const useUpdateCategory = () => {
  return useMutation(UpdateCategoryDocument);
};
