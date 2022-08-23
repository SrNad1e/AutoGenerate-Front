/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Select } from 'antd';
import { useEffect, useState } from 'react';

import { useGetWarehouses } from '@/hooks/warehouse.hooks';
import type { FiltersWarehousesInput } from '@/graphql/graphql';
import { Permissions } from '@/graphql/graphql';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';

import styles from './styles.less';
import { useModel } from 'umi';

const { Option } = Select;

export type Props = {
  onChange?: (warehouseId: string) => void;
  value?: string;
  onClear?: () => void;
  disabled: boolean;
};

const SelectWarehouses = ({ onChange, value, onClear, disabled }: Props) => {
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const closeAlertInformation = () => {
    setPropsAlertInformation({
      visible: false,
      type: 'error',
      message: '',
    });
  };

  const { initialState } = useModel('@@initialState');
  const canQueryWarehouses = initialState?.currentUser?.role.permissions.find(
    (permission) => permission.action === Permissions.ReadConfigurationWarehouses,
  );

  const [getWarehouses, { data, loading }] = useGetWarehouses();

  /**
   * @description se encarga de consultar con base a un comodín
   * @param name comodín de coincidencia en el nombre
   */
  const onSearch = (params: FiltersWarehousesInput) => {
    getWarehouses({
      variables: {
        input: {
          ...params,
          active: true,
        },
      },
    });
  };

  useEffect(() => {
    if (canQueryWarehouses) {
      onSearch({ _id: value, active: true });
    }
  }, [!!value]);

  return (
    <>
      <Select
        className={styles.select}
        showSearch
        loading={loading}
        placeholder="Seleccione Bodega"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={(name) => onSearch({ name })}
        allowClear
        onClear={onClear}
        value={value}
        disabled={disabled}
      >
        {data?.warehouses?.docs.map((warehouse) => (
          <Option key={warehouse._id?.toString()}>{warehouse.name}</Option>
        ))}
      </Select>
      {!canQueryWarehouses && (
        <Alert message="No tiene permiso para consultar las bodegas" type="error" showIcon />
      )}
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
    </>
  );
};

export default SelectWarehouses;
