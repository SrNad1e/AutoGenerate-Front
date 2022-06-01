/* eslint-disable react-hooks/exhaustive-deps */
import { Select, Alert } from 'antd';
import { useEffect } from 'react';

import { useGetPointOfSales } from '@/hooks/pointOfSale.hooks';

const { Option } = Select;

export type Params = {
  onChange?: (id: string) => void;
  value?: string;
  disabled: boolean;
};

const SelectPointOfSale = ({ onChange, disabled, value }: Params) => {
  const [getPointOfSales, { loading, data, error }] = useGetPointOfSales();

  /**
   * @description se encarga de consultar con base a un comodín
   * @param name comodín de coincidencia en el nombre
   */
  const onSearch = (name: string) => {
    getPointOfSales({
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
    getPointOfSales({
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
        placeholder="Seleccione el punto de venta"
        optionFilterProp="key"
        onChange={onChange}
        onSearch={onSearch}
        disabled={disabled}
        value={value}
      >
        {data?.pointOfSales?.docs?.map(({ _id, name, shop }) => (
          <Option key={name} value={_id}>
            {shop.name} / {name}
          </Option>
        ))}
      </Select>
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SelectPointOfSale;
