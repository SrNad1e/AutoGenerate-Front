/* eslint-disable react-hooks/exhaustive-deps */
import { Select, Alert } from 'antd';
import { useEffect } from 'react';

import { useGetSizes } from '@/hooks/size.hooks';
import type { Size } from '@/graphql/graphql';

import styles from './styles.less';

const { Option } = Select;

export type Props = {
  onChange?: (value: Size | undefined) => void;
  value?: string;
};

const SelectSize = ({ onChange }: Props) => {
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
            value: 1,
          },
        },
      },
    });
  };

  const onChangeLocal = (sizeId: string) => {
    if (onChange) {
      onChange(data?.sizes?.docs?.find((size) => size?._id === sizeId) as Size);
    }
  };

  useEffect(() => {
    getSizes({
      variables: {
        input: {
          active: true,
          sort: {
            value: 1,
          },
        },
      },
    });
  }, []);

  return (
    <>
      <Select
        className={styles.select}
        showSearch
        loading={loading}
        placeholder="Seleccione Talla"
        optionFilterProp="children"
        onChange={onChangeLocal}
        onSearch={onSearch}
      >
        {data?.sizes?.docs?.map((size) => (
          <Option key={size?._id}>{size?.value}</Option>
        ))}
      </Select>
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SelectSize;
