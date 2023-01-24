import { GenerateDailyClosingDocument } from './../graphql/graphql';
import { DailyClosingDocument } from '@/graphql/graphql';
import { useLazyQuery, useMutation } from '@apollo/client';

export const useGetDailyClosings = () => {
  return useLazyQuery(DailyClosingDocument);
};

export const useGenerateDailyClosing = () => {
  return useMutation(GenerateDailyClosingDocument);
};
