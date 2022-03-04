/* eslint-disable react-hooks/exhaustive-deps */
import { useGetSizes } from '@/hooks/size.hooks';
import { Select, Alert } from 'antd';
import { useEffect, useState } from 'react';

import styles from './styles.less';

const { Option } = Select;

export type Props = {
  onChange?: (value: SIZE.Size | undefined) => void;
  value?: string;
};

const SelectSize = ({ onChange }: Props) => {
  const [sizes, setSizes] = useState<Partial<SIZE.Size[]>>([]);
  const [error, setError] = useState<string | undefined>();

  /**
   * @description callback ejecutado por el customHook
   * @param sizesData array de tallas
   */
  const resultSizes = (sizesData: SIZE.ResponsePaginate) => {
    if (sizesData) {
      setSizes(sizesData.docs);
    }
  };

  /**
   * @description maneja el error de la consulta
   * @param message error que genera al consulta
   */
  const showError = (message: string) => {
    setError(message);
  };

  const { getSizes, loading } = useGetSizes(resultSizes, showError);

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
      onChange(sizes.find((size) => size?._id === sizeId));
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
        {sizes.map((size) => (
          <Option key={size?._id}>{size?.value}</Option>
        ))}
      </Select>
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SelectSize;
