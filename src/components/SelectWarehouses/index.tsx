/* eslint-disable react-hooks/exhaustive-deps */
import { Select } from 'antd';
import { useEffect, useState } from 'react';

import { useGetWarehouses } from '@/hooks/warehouse.hooks';
import type { FiltersWarehousesInput } from '@/graphql/graphql';
import type { ApolloError } from '@apollo/client';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';

import styles from './styles.less';
import AlertInformation from '@/components/Alerts/AlertInformation';

const { Option } = Select;

export type Props = {
  onChange?: (warehouseId: string) => void;
  value?: string;
};

const SelectWarehouses = ({ onChange, value }: Props) => {
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

  const onError = (e: ApolloError) => {
    const { statusCode } = e?.graphQLErrors[0]?.extensions?.response as any;

    if (statusCode == 403) {
      setPropsAlertInformation({
        message: 'No tiene acceso a consultar bodegas',
        visible: true,
        type: 'error',
      });
    } else {
      setPropsAlertInformation({
        message: e?.graphQLErrors[0]?.message,
        visible: true,
        type: 'error',
      });
    }
  };
  const [getWarehouses, { data, loading }] = useGetWarehouses(onError);

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
    onSearch({ _id: value, active: true });
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
        onSearch={onSearch}
        allowClear
        value={value}
      >
        {data?.warehouses?.docs.map((warehouse) => (
          <Option key={warehouse._id?.toString()}>{warehouse.name}</Option>
        ))}
      </Select>
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
    </>
  );
};

export default SelectWarehouses;
