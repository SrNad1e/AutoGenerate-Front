/* eslint-disable react-hooks/exhaustive-deps */
import { Select, Alert } from 'antd';
import { useEffect } from 'react';

import type { CategoryLevel1, CategoryLevel2, CategoryLevel3 } from '@/graphql/graphql';
import { useGetCategories } from '@/hooks/category.hooks';

const { Option } = Select;

export type Props = {
  onChange?: (value: CategoryLevel1 | CategoryLevel2 | CategoryLevel3) => void;
};

const SelectCategory = ({ onChange }: Props) => {
  const [getCategories, { loading, data, error }] = useGetCategories();

  /**
   * @description se encarga de consultar con base a un comodín
   * @param name comodín de coincidencia en el nombre
   */
  const onSearch = (name: string) => {
    getCategories({
      variables: {
        input: {
          name,
          sort: {
            name: 1,
          },
        },
      },
    });
  };

  const onChangeLocal = (categoryId: string) => {
    if (onChange) {
      onChange(
        data?.categories?.docs?.find((category) => category?._id === categoryId) as CategoryLevel1,
      );
    }
  };

  useEffect(() => {
    getCategories({
      variables: {
        input: {
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
        placeholder="Seleccione Categoria Padre"
        optionFilterProp="parentCategoryId"
        onChange={onChangeLocal}
        onSearch={onSearch}
      >
        {/*Opciones para el selector de las categorias padre de nivel 1 */}
        {data?.categories?.docs?.map(({ _id, name }) => (
          <Option key={_id}>{name}</Option>
        ))}

        {/*Opciones para el selector de las categorias padre de nivel 2 */}
        {data?.categories.docs.map(({ childs }) =>
          childs.map((child) => <Option key={child._id}>{child.name}</Option>),
        )}
      </Select>
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SelectCategory;
