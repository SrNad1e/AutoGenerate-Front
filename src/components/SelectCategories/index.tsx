/* eslint-disable react-hooks/exhaustive-deps */
import { TreeSelect } from 'antd';
import { useEffect } from 'react';

import { useGetCategories } from '@/hooks/category.hooks';

const { TreeNode } = TreeSelect;

export type Params = {
  onChange?: (value: string) => void;
  value?: string;
};

const SelectCategories = ({ value, onChange }: Params) => {
  const [getCategories, { data, loading }] = useGetCategories();

  /**
   * @description se encarga de buscar las categorías
   * @param name comodín del nombre de la categoría
   */
  const onSearch = (name?: string) => {
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

  useEffect(() => {
    onSearch();
  }, []);

  return (
    <TreeSelect
      placeholder="Seleccione categoría"
      loading={loading}
      value={value}
      onChange={onChange}
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
  );
};

export default SelectCategories;
