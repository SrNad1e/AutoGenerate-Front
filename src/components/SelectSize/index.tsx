/* eslint-disable react-hooks/exhaustive-deps */
import { Select, Alert } from 'antd';
import { useEffect } from 'react';

import { useGetSizes } from '@/hooks/size.hooks';

const { Option } = Select;

export type Props = {
  onChange?: (value: string | undefined) => void;
  value?: string;
  disabled: boolean;
};

const SelectSize = ({ onChange, value, disabled }: Props) => {
  const [getSizes, { loading, data, error }] = useGetSizes();

  /**
   * @description se encarga de consultar con base a un comodín
   * @param name comodín de coincidencia en el nombre
   */
  const onSearch = (name: string) => {
    getSizes({
      variables: {
        input: {
          name,
          active: true,
          sort: {
            weight: 1,
          },
        },
      },
    });
  };

  useEffect(() => {
    getSizes({
      variables: {
        input: {
          _id: value,
          active: true,
          sort: {
            weight: 1,
          },
        },
      },
    });
  }, [!!value]);

  return (
    <>
      <Select
        showSearch
        loading={loading}
        placeholder="Seleccione Talla"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        value={value}
        disabled={disabled}
        allowClear
      >
        {data?.sizes?.docs?.map((size) => (
          <Option key={size?._id} value={size._id}>
            {size?.value}
          </Option>
        ))}
      </Select>
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SelectSize;
