/* eslint-disable react-hooks/exhaustive-deps */
import { Select, Alert } from 'antd';
import { useEffect } from 'react';

import { useGetCategoriesLevel } from '@/hooks/category.hooks';

const { Option } = Select;

export type Params = {
  onChange?: (id: string) => void;
  value?: string;
  parentId?: string;
  level: number;
  disabled: boolean;
};

const SelectCategory = ({ onChange, level, disabled, value, parentId }: Params) => {
  const [getCategories, { loading, data, error }] = useGetCategoriesLevel();

  /**
   * @description se encarga de consultar con base a un comodín
   * @param name comodín de coincidencia en el nombre
   */
  const onSearch = (name: string) => {
    getCategories({
      variables: {
        input: {
          name,
          parentId,
          level,
          sort: {
            name: 1,
          },
        },
      },
    });
  };

  useEffect(() => {
    getCategories({
      variables: {
        input: {
          level,
          parentId,
          sort: {
            name: 1,
          },
        },
      },
    });
  }, [level]);

  useEffect(() => {
    getCategories({
      variables: {
        input: {
          _id: value,
          level,
          sort: {
            name: 1,
          },
        },
      },
    });
  }, [!!value]);

  return (
    <>
      <Select
        style={{ width: 220 }}
        showSearch
        loading={loading}
        placeholder="Seleccione Categoría"
        optionFilterProp="parentId"
        onChange={onChange}
        onSearch={onSearch}
        disabled={disabled}
        value={value}
      >
        {data?.categoriesLevel?.docs?.map(({ _id, name }) => (
          <Option key={_id} value={_id}>
            {name}
          </Option>
        ))}
      </Select>
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SelectCategory;
