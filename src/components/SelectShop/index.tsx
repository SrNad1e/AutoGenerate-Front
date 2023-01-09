/* eslint-disable react-hooks/exhaustive-deps */
import { Select, Alert } from 'antd';
import { useEffect } from 'react';

import { useGetShops } from '@/hooks/shop.hooks';
import { useModel } from 'umi';
import { Permissions } from '@/graphql/graphql';

const { Option } = Select;

export type Params = {
  onChange?: (id: string) => void;
  value?: string;
  disabled: boolean;
};

const SelectShop = ({ onChange, disabled, value }: Params) => {
  const [getShops, { loading, data, error }] = useGetShops();

  const { initialState } = useModel('@@initialState');
  const canQueryShops = initialState?.currentUser?.role.permissions.find(
    (permission) => permission.action === Permissions.ReadConfigurationShops,
  );

  /**
   * @description se encarga de consultar con base a un comodín
   * @param name comodín de coincidencia en el nombre
   */
  const onSearch = (name: string) => {
    getShops({
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
    if (canQueryShops) {
      getShops({
        variables: {
          input: {
            _id: value,
            sort: {
              name: 1,
            },
          },
        },
      });
    }
  }, []);

  return (
    <>
      <Select
        allowClear
        style={{ width: '100%' }}
        showSearch
        loading={loading}
        placeholder="Seleccione la tienda"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        disabled={disabled}
        value={value}
      >
        {data?.shops?.docs?.map(({ _id, name }) => (
          <Option key={_id} value={_id}>
            {name}
          </Option>
        ))}
      </Select>
      {!canQueryShops && (
        <Alert message="No tiene permiso para consultar las tiendas" type="error" showIcon />
      )}
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SelectShop;
