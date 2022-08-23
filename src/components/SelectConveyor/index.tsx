/* eslint-disable react-hooks/exhaustive-deps */
import { Select, Alert } from 'antd';
import { useEffect } from 'react';
import { useGetConveyors } from '@/hooks/conveyors.hooks';

const { Option } = Select;

export type Params = {
  onChange?: (id: string) => void;
  value?: string;
  disabled: boolean;
};

const SelectConveyor = ({ onChange, disabled, value }: Params) => {
  const [getConveyor, { loading, data, error }] = useGetConveyors();

  /**
   * @description se encarga de consultar con base a un comodín
   * @param name comodín de coincidencia en el nombre
   */
  const onSearch = (name: string) => {
    getConveyor({
      variables: {
        input: {
          name,
        },
      },
    });
  };

  useEffect(() => {
    getConveyor({
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
        style={{ width: 200 }}
        showSearch
        loading={loading}
        placeholder="Seleccione Transportista"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        allowClear
        disabled={disabled}
        value={value}
      >
        {data?.conveyors?.docs?.map(({ _id, name }) => (
          <Option key={_id} value={_id}>
            {name}
          </Option>
        ))}
      </Select>
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SelectConveyor;
