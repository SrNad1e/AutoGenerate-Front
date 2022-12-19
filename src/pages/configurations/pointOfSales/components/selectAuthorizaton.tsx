/* eslint-disable react-hooks/exhaustive-deps */
import { Select, Alert } from 'antd';
import { useEffect } from 'react';

import { useGetAuthorizations } from '@/hooks/authorization.hooks';
import { useModel } from 'umi';
import { Permissions } from '@/graphql/graphql';

const { Option } = Select;

export type Params = {
  onChange?: (id: string) => void;
  value?: string;
  disabled: boolean;
};

const SelectAuthorization = ({ onChange, disabled, value }: Params) => {
  const [getAuthorizations, { loading, data, error }] = useGetAuthorizations();

  const { initialState } = useModel('@@initialState');
  const canQueryAuthorizations = initialState?.currentUser?.role.permissions.find(
    (permission) => permission.action === Permissions.ReadInvoicingAuthorizations,
  );

  /**
   * @description se encarga de consultar con base a un comodín
   * @param prefix comodín de coincidencia en el nombre
   */
  const onSearch = (prefix: string) => {
    getAuthorizations({
      variables: {
        input: {
          prefix,
          sort: {
            prefix: 1,
          },
        },
      },
    });
  };

  useEffect(() => {
    if (canQueryAuthorizations) {
      getAuthorizations({
        variables: {
          input: {
            prefix: value,
            sort: {
              prefix: 1,
            },
          },
        },
      });
    }
  }, []);

  return (
    <>
      <Select
        style={{ width: '100%' }}
        showSearch
        loading={loading}
        placeholder="Seleccione la autorización"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        disabled={disabled}
        value={value}
      >
        {data?.authorizations?.docs?.map(({ _id, prefix }) => (
          <Option key={_id} value={_id}>
            {prefix}
          </Option>
        ))}
      </Select>
      {!canQueryAuthorizations && (
        <Alert message="No tiene permiso para consultar las autorizaciones" type="error" showIcon />
      )}
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SelectAuthorization;
