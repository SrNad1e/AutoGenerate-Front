/* eslint-disable react-hooks/exhaustive-deps */
import { Select, Alert } from 'antd';
import { useEffect } from 'react';

import { useGetAuthorizations } from '@/hooks/authorization.hooks';

const { Option } = Select;

export type Params = {
  onChange?: (id: string) => void;
  value?: string;
  disabled: boolean;
};

const SelectAuthorization = ({ onChange, disabled, value }: Params) => {
  const [getAuthorizations, { loading, data, error }] = useGetAuthorizations();

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
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SelectAuthorization;
