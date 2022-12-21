import { ReportSalesDocument } from '@/graphql/graphql';
import { useLazyQuery } from '@apollo/client';

export const useReportSales = () => {
  return useLazyQuery(ReportSalesDocument, {
    fetchPolicy: 'cache-first',
  });
};
