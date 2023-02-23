/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, TreeSelect } from 'antd';
import { useEffect, useState } from 'react';

import { useGetCategories } from '@/hooks/category.hooks';
import type { CategoryLevel1, CategoryLevel2 } from '@/graphql/graphql';
import { useModel } from 'umi';

const { TreeNode } = TreeSelect;

export type Params = {
  onChange?: (value: string) => void;
  value?: string;
  disabled?: boolean;
};

const SelectCategories = ({ value, onChange, disabled }: Params) => {
  const [dataChild, setDataChild] = useState<Partial<CategoryLevel1 | any>>({});
  const [getCategories, { data, loading, error }] = useGetCategories();

  const { initialState } = useModel('@@initialState');

  /**
   * @description se encarga de buscar las categorías
   * @param name comodín del nombre de la categoría
   */
  const onSearch = (name?: string) => {
    getCategories({
      variables: {
        input: {
          companyId: initialState?.currentUser?.company._id,
          name,
          limit: 100,
          sort: {
            name: 1,
          },
        },
      },
    });
  };

  const onSearchChild = async () => {
    const response = await getCategories({
      variables: {
        input: {
          _id: value?.split('-')[0],
          sort: {
            name: 1,
          },
        },
      },
    });
    if (response?.data?.categories) {
      setDataChild(response?.data?.categories?.docs[0]);
    }
  };

  useEffect(() => {
    onSearch();
  }, [value]);

  useEffect(() => {
    if (value) {
      onSearchChild();
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
        onTreeExpand={() => onSearch()}
        onDropdownVisibleChange={(e) => e && onSearch()}
        onChange={onChange}
        onSearch={onSearch}
        disabled={disabled}
      >
        {data?.categories?.docs?.map(({ _id, name, childs }) => (
          <TreeNode key={_id} value={_id} title={name}>
            {value
              ? dataChild?.childs?.map((child: CategoryLevel2) => (
                  <TreeNode value={`${_id}-${child?._id}`} key={child?._id} title={child?.name}>
                    {child?.childs?.map((child1) => (
                      <TreeNode
                        value={`${_id}-${child._id}-${child1._id}`}
                        key={child1._id}
                        title={child1.name}
                      />
                    ))}
                  </TreeNode>
                ))
              : childs?.map((child) => (
                  <TreeNode value={`${_id}-${child?._id}`} key={child?._id} title={child?.name}>
                    {child?.childs?.map((child1) => (
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
