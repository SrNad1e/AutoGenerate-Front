import { GoalStatusDocument } from '@/graphql/graphql';
import { useLazyQuery } from '@apollo/client';

export const useGetGoal = () => {
  return useLazyQuery(GoalStatusDocument, {
    fetchPolicy: 'cache-first',
  });
};
