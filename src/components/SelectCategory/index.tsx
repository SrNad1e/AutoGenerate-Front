/* eslint-disable react-hooks/exhaustive-deps */
import { Select, Alert } from 'antd';
import { useEffect } from 'react';

import type { CategoryLevel1, CategoryLevel2, CategoryLevel3 } from '@/graphql/graphql';
import { useGetCategoriesLevel } from '@/hooks/category.hooks';

const { Option } = Select;

export type Params = {
  onChange?: (value: CategoryLevel1 | CategoryLevel2 | CategoryLevel3) => void;
  level: number;
};

const SelectCategory = ({ onChange, level }: Params) => {
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
          level,
          sort: {
            name: 1,
          },
        },
      },
    });
  };

  /**
   * @description se encarga de organizar la selección del campo
   * @param categoryId identificador de la categoría
   */
  const onChangeLocal = (categoryId: string) => {
    if (onChange) {
      onChange(
        data?.categoriesLevel?.docs?.find(
          (category) => category?._id === categoryId,
        ) as CategoryLevel1,
      );
    }
  };

  useEffect(() => {
    getCategories({
      variables: {
        input: {
          level,
          sort: {
            name: 1,
          },
        },
      },
    });
  }, []);

  return (
    <>
      <Select
        style={{ width: 220 }}
        showSearch
        loading={loading}
        placeholder="Seleccione Categoría"
        optionFilterProp="parentCategoryId"
        onChange={onChangeLocal}
        onSearch={onSearch}
      >
        {data?.categoriesLevel?.docs?.map(({ _id, name }) => (
          <Option key={_id}>{name}</Option>
        ))}
      </Select>
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SelectCategory;
