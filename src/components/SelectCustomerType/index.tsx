/* eslint-disable react-hooks/exhaustive-deps */
import { Select, Alert } from 'antd';
import { useEffect } from 'react';

import { useGetCustomerTypes } from '@/hooks/customerType.hooks';

const { Option } = Select;

export type Params = {
  onChange?: (id: string) => void;
  value?: string;
  disabled: boolean;
};

const SelectCustomerType = ({ onChange, disabled, value }: Params) => {
  const [getCustomerTypes, { loading, data, error }] = useGetCustomerTypes();

  /**
   * @description se encarga de consultar con base a un comodín
   * @param name comodín de coincidencia en el nombre
   */
  const onSearch = (name: string) => {
    getCustomerTypes({
      variables: {
        input: {
          name,
        },
      },
    });
  };

  useEffect(() => {
    getCustomerTypes({
      variables: {
        input: {
          _id: value,
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
        placeholder="Seleccione tipo de cliente"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        disabled={disabled}
        value={value}
      >
        {data?.customerTypes?.docs?.map(({ _id, name }) => (
          <Option key={_id} value={_id}>
            {name}
          </Option>
        ))}
      </Select>
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SelectCustomerType;
