/* eslint-disable react-hooks/exhaustive-deps */
import { Select, Alert } from 'antd';
import { useEffect } from 'react';

import { useGetCustomers } from '@/hooks/customer.hooks';
import { useModel } from 'umi';
import { Permissions } from '@/graphql/graphql';

const { Option } = Select;

export type Params = {
  onChange?: (id: string) => void;
  value?: string;
  disabled: boolean;
};

const SearchCustomer = ({ onChange, disabled, value }: Params) => {
  const [getCustomers, { loading, data, error }] = useGetCustomers();

  const { initialState } = useModel('@@initialState');
  const canQueryCustomer = initialState?.currentUser?.role.permissions.find(
    (permission) => permission.action === Permissions.ReadCrmCustomers,
  );
  /**
   * @description se encarga de consultar con base a un comodín
   * @param name comodín de coincidencia en el nombre
   */
  const onSearch = (dato: string) => {
    getCustomers({
      variables: {
        input: {
          dato,
        },
      },
    });
  };

  useEffect(() => {
    if (!data && value) {
      getCustomers({
        variables: {
          input: {
            _id: value,
          },
        },
      });
    }
  }, [value]);

  return (
    <>
      <Select
        style={{ width: '100%' }}
        showSearch
        allowClear
        loading={loading}
        placeholder="Buscar Cliente"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        disabled={disabled}
        value={value}
      >
        {data?.customers?.docs?.map(({ _id, firstName, document, lastName }) => (
          <Option key={_id} value={_id}>
            {firstName} {lastName} / {document}
          </Option>
        ))}
      </Select>
      {!canQueryCustomer && (
        <Alert message="No tiene permiso para consultar los clientes" type="error" showIcon />
      )}
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SearchCustomer;
