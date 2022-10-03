import type { Expense } from '@/graphql/graphql';
import { CreateExpenseDocument, ExpensesDocument, UpdateExpenseDocument } from '@/graphql/graphql';
import { useLazyQuery, useMutation } from '@apollo/client';

export const useGetExpenses = () => {
  return useLazyQuery(ExpensesDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useCreateExpense = () => {
  return useMutation(CreateExpenseDocument);
};

export const useUpdateExpense = () => {
  return useMutation(UpdateExpenseDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          expenses(existingExpenses = []) {
            return existingExpenses?.docs?.map((expense: Expense) => {
              if (expense?._id === data?.updateExpense?._id) {
                return data?.updateExpense;
              }
              return expense;
            });
          },
          expenseId() {
            return data?.updateExpense;
          },
        },
      });
    },
  });
};
