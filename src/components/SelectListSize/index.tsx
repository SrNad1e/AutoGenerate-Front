/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Select } from 'antd';
import { useEffect } from 'react';

import { useGetSizes } from '@/hooks/size.hooks';
import type { Size } from '@/graphql/graphql';

const { Option } = Select;

export type Params = {
  onChange?: (sizes: Size[] | []) => void;
  value?: Size[];
  disabled: boolean;
};

const SelectListSize = ({ onChange, disabled, value }: Params) => {
  const [getSizes, { loading, data, error }] = useGetSizes();

  /**
   * @description se encarga de consultar con base a un comodín
   * @param name comodín de coincidencia en el nombre
   */
  const onSearch = (name?: string) => {
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

  const onChangeLocal = (ids: string[]) => {
    const newIds = ids.filter((id) => !value?.find(({ _id }) => _id === id));

    const newSizes = data?.sizes?.docs?.filter(({ _id }) => !!newIds.includes(_id));

    if (onChange) {
      onChange(newSizes || []);
    }
  };

  useEffect(() => {
    onSearch();
  }, []);

  return (
    <>
      <Select
        mode="multiple"
        showSearch
        loading={loading}
        placeholder="Seleccione Tallas"
        optionFilterProp="children"
        onChange={onChangeLocal}
        onSearch={onSearch}
        disabled={disabled}
      >
        {data?.sizes?.docs?.map((size) => (
          <Option key={size?._id}>{size?.value}</Option>
        ))}
      </Select>
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SelectListSize;
