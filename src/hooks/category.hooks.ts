import { useLazyQuery, useMutation } from '@apollo/client';

import type { CategoryLevel1 } from '@/graphql/graphql';
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
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          colors(existingCategories = []) {
            return existingCategories?.docs?.map((category: CategoryLevel1) => {
              if (category?._id === data?.updateCategory?._id) {
                return data?.updateCategory;
              }
              return category;
            });
          },
        },
      });
    },
  });
};
