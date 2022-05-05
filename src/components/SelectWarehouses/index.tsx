/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Select } from 'antd';
import { useEffect } from 'react';

import { useGetWarehouses } from '@/hooks/warehouse.hooks';

import styles from './styles.less';

const { Option } = Select;

export type Props = {
  onChange?: (warehouseId: string) => void;
  value?: string;
};

const SelectWarehouses = ({ onChange, value }: Props) => {
  const [getWarehouses, { data, error, loading }] = useGetWarehouses();

  /**
   * @description se encarga de consultar con base a un comodín
   * @param name comodín de coincidencia en el nombre
   */
  const onSearch = (name: string) => {
    getWarehouses({
      variables: {
        input: {
          name,
          active: true,
        },
      },
    });
  };

  useEffect(() => {
    getWarehouses({
      variables: { input: { active: true } },
    });
  }, []);

  return (
    <>
      <Select
        className={styles.select}
        showSearch
        loading={loading}
        placeholder="Seleccione Bodega"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        allowClear
        value={value}
      >
        {data?.warehouses?.docs.map((warehouse) => (
          <Option key={warehouse._id?.toString()}>{warehouse.name}</Option>
        ))}
      </Select>
      {error && <Alert type="error" message={error} />}
    </>
  );
};

export default SelectWarehouses;
