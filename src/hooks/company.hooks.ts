import type { Company } from '@/graphql/graphql';
import { CompaniesDocument, CreateCompanyDocument, UpdateCompanyDocument } from '@/graphql/graphql';
import { useLazyQuery, useMutation } from '@apollo/client';

export const useGetCompanies = () => {
  return useLazyQuery(CompaniesDocument, {
    fetchPolicy: 'cache-first',
  });
};

export const useCreateCompany = () => {
  return useMutation(CreateCompanyDocument);
};

export const useUpdateCompany = () => {
  return useMutation(UpdateCompanyDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          companies(existingCompanies = []) {
            return existingCompanies?.docs?.map((companies: Company) => {
              if (companies?._id === data?.updateCompany?._id) {
                return data?.updateCompany;
              }
              return companies;
            });
          },
        },
      });
    },
  });
};
