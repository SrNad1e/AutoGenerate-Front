/* eslint-disable react-hooks/exhaustive-deps */
import { Select, Alert } from 'antd';
import { useEffect } from 'react';

import { useGetBoxes } from '@/hooks/box.hooks';

const { Option } = Select;

export type Params = {
  onChange?: (id: string) => void;
  value?: string;
  disabled: boolean;
};

const SelectBox = ({ onChange, disabled, value }: Params) => {
  const [getBoxes, { loading, data, error }] = useGetBoxes();

  /**
   * @description se encarga de consultar con base a un comodín
   * @param name comodín de coincidencia en el nombre
   */
  const onSearch = (name: string) => {
    getBoxes({
      variables: {
        input: {
          name,
          _id: value,
        },
      },
    });
  };

  useEffect(() => {
    getBoxes({
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
        placeholder="Seleccione la caja"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        disabled={disabled}
        value={value}
      >
        {data?.boxes?.docs?.map(({ _id, name }) => (
          <Option key={_id} value={_id}>
            {name}
          </Option>
        ))}
      </Select>
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SelectBox;
