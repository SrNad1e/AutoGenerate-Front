import { ReportSalesDocument } from '@/graphql/graphql';
import { useLazyQuery } from '@apollo/client';

export const useGetReportSales = () => {

  console.log("----> ", useLazyQuery(ReportSalesDocument, {
    fetchPolicy: 'cache-first',
  }))

  return useLazyQuery(ReportSalesDocument, {
    fetchPolicy: 'cache-first',
  });
};
