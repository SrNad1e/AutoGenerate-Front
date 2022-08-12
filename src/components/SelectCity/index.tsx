/* eslint-disable react-hooks/exhaustive-deps */
import { Select, Alert } from 'antd';
import { useEffect } from 'react';

import { useGetCities } from '@/hooks/cities.hooks';

const { Option } = Select;

export type Params = {
  onChange?: (id: string) => void;
  value?: string;
  disabled: boolean;
};

const SelectCity = ({ onChange, disabled, value }: Params) => {
  const [getCities, { loading, data, error }] = useGetCities();

  /**
   * @description se encarga de consultar con base a un comodín
   * @param name comodín de coincidencia en el nombre
   */
  const onSearch = (name: string) => {
    getCities({
      variables: {
        input: {
          name,
        },
      },
    });
  };

  useEffect(() => {
    getCities({
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
        placeholder="Seleccione Ciudad"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        disabled={disabled}
        value={value}
      >
        {data?.cities?.docs?.map((city) => (
          <Option key={city._id} value={city._id}>
            {city.name}
          </Option>
        ))}
      </Select>
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SelectCity;
