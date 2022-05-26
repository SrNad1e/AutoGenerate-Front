/* eslint-disable react-hooks/exhaustive-deps */
import { Select, Alert } from 'antd';
import { useEffect } from 'react';

import { useGetShops } from '@/hooks/shop.hooks';

const { Option } = Select;

export type Params = {
  onChange?: (id: string) => void;
  value?: string;
  disabled: boolean;
};

const SelectShop = ({ onChange, disabled, value }: Params) => {
  const [getShops, { loading, data, error }] = useGetShops();

  /**
   * @description se encarga de consultar con base a un comodín
   * @param name comodín de coincidencia en el nombre
   */
  const onSearch = (name: string) => {
    getShops({
      variables: {
        input: {
          name,
          sort: {
            name: 1,
          },
        },
      },
    });
  };

  useEffect(() => {
    getShops({
      variables: {
        input: {
          _id: value,
          sort: {
            name: 1,
          },
        },
      },
    });
  }, []);

  return (
    <>
      <Select
        style={{ width: 220 }}
        showSearch
        loading={loading}
        placeholder="Seleccione la tienda"
        optionFilterProp="name"
        onChange={onChange}
        onSearch={onSearch}
        disabled={disabled}
        value={value}
      >
        {data?.shops?.docs?.map(({ _id, name }) => (
          <Option key={_id} value={_id}>
            {name}
          </Option>
        ))}
      </Select>
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SelectShop;
