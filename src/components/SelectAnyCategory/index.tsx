/* eslint-disable react-hooks/exhaustive-deps */
import { useGetCategories } from '@/hooks/category.hooks';
import { TreeSelect } from 'antd';
import { TreeNode } from 'antd/lib/tree-select';
import { useEffect } from 'react';

const SelectAnyCategory = () => {
  const [getCategories, { data, loading }] = useGetCategories();

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
      style={{ width: '100%' }}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder="Please select"
      loading={loading}
    >
      {data?.categories.docs.map(({ _id, name, childs }) => (
        <TreeNode key={_id} value={_id} title={name}>
          {childs?.map((child) => (
            <TreeNode value={child._id} key={child._id} title={child.name}>
              {child.childs?.map((child1) => (
                <TreeNode value={child1._id} key={child1._id} title={child1.name} />
              ))}
            </TreeNode>
          ))}
        </TreeNode>
      ))}
    </TreeSelect>
  );
};

export default SelectAnyCategory;
