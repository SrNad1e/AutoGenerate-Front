import { DailyClosingDocument } from '@/graphql/graphql';
import { useLazyQuery } from '@apollo/client';

export const useGetDailyClosings = () => {
  return useLazyQuery(DailyClosingDocument);
};
