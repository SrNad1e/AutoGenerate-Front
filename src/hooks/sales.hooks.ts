import { ReportSalesInvoicingDocument } from '@/graphql/graphql';
import { useLazyQuery } from '@apollo/client';

export const useGetSales = () => {
  return useLazyQuery(ReportSalesInvoicingDocument, {
    fetchPolicy: 'cache-first',
  });
};
