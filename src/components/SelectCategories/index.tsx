/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, TreeSelect } from 'antd';
import { useEffect } from 'react';

import { useGetCategories } from '@/hooks/category.hooks';

const { TreeNode } = TreeSelect;

export type Params = {
  onChange?: (value: string) => void;
  value?: string;
};

const SelectCategories = ({ value, onChange }: Params) => {
  const [getCategories, { data, loading, error }] = useGetCategories();

  /**
   * @description se encarga de buscar las categorías
   * @param name comodín del nombre de la categoría
   */
  const onSearch = (name?: string) => {
    getCategories({
      variables: {
        input: {
          name,
          limit: 100,
          sort: {
            name: 1,
          },
        },
      },
    });
  };

  useEffect(() => {
    onSearch();
  }, [value]);

  useEffect(() => {
    if (value) {
      getCategories({
        variables: {
          input: {
            _id: value.split('-')[0],
            sort: {
              name: 1,
            },
          },
        },
      });
    }
  }, [!!value]);

  return (
    <>
      <TreeSelect
        placeholder="Seleccione categoría"
        loading={loading}
        allowClear
        defaultValue={value?.split('-')}
        value={value}
        onChange={onChange}
        onSearch={onSearch}
      >
        {data?.categories.docs.map(({ _id, name, childs }) => (
          <TreeNode key={_id} value={_id} title={name}>
            {childs?.map((child) => (
              <TreeNode value={`${_id}-${child._id}`} key={child._id} title={child.name}>
                {child.childs?.map((child1) => (
                  <TreeNode
                    value={`${_id}-${child._id}-${child1._id}`}
                    key={child1._id}
                    title={child1.name}
                  />
                ))}
              </TreeNode>
            ))}
          </TreeNode>
        ))}
      </TreeSelect>
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SelectCategories;