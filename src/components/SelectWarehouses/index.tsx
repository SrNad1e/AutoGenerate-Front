/* eslint-disable react-hooks/exhaustive-deps */
import { useGetWarehouses } from '@/hooks/warehouse.hooks';
import { Alert, Select } from 'antd';
import { useState, useEffect } from 'react';

import styles from './styles.less';

const { Option } = Select;

const SelectWarehouses = ({ onChange, value }: any) => {
  const [warehouses, setWarehouses] = useState<Partial<WAREHOUSE.Warehouse>[]>([]);
  const [error, setError] = useState<string | undefined>();

  /**
   * @description callback ejecutado por el customHook
   * @param warehousesData array de datos
   */
  const resultWarehouses = (warehousesData: WAREHOUSE.Response) => {
    if (warehousesData) {
      setWarehouses(warehousesData.docs);
    }
  };

  /**
   * @description maneja el error de la consulta
   * @param message error que genera al consulta
   */
  const showError = (message: string) => {
    setError(message);
  };

  const { getWarehouses, loading } = useGetWarehouses(resultWarehouses, showError);

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

  const onChangeLocal = (warehouseId: string) => {
    onChange(warehouses.find((warehouse) => warehouse._id === warehouseId));
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
        onChange={onChangeLocal}
        onSearch={onSearch}
        allowClear
        value={value?._id.toString()}
      >
        {warehouses.map((warehouse) => (
          <Option key={warehouse._id?.toString()}>{warehouse.name}</Option>
        ))}
      </Select>
      {error && <Alert type="error" message={error} />}
    </>
  );
};

export default SelectWarehouses;
