import { ReportSalesDocument } from '@/graphql/graphql';
import { useLazyQuery } from '@apollo/client';

export const useGetReportSales = () => {
  return useLazyQuery(ReportSalesDocument);
};
