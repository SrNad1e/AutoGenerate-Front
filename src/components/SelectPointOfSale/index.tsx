/* eslint-disable react-hooks/exhaustive-deps */
import { Select, Alert } from 'antd';
import { useEffect } from 'react';

import { useGetPointOfSales } from '@/hooks/pointOfSale.hooks';
import { Permissions } from '@/graphql/graphql';
import { useModel } from 'umi';

const { Option } = Select;

export type Params = {
  onChange?: (id: string) => void;
  value?: string;
  disabled: boolean;
  shopId?: string;
};

const SelectPointOfSale = ({ onChange, disabled, value, shopId }: Params) => {
  const [getPointOfSales, { loading, data, error }] = useGetPointOfSales();

  const { initialState } = useModel('@@initialState');
  const canQueryPos = initialState?.currentUser?.role.permissions.find(
    (permission) => permission.action === Permissions.ReadInvoicingPointofsales,
  );

  /**
   * @description se encarga de consultar con base a un comodín
   * @param name comodín de coincidencia en el nombre
   */
  const onSearch = (name: string) => {
    getPointOfSales({
      variables: {
        input: {
          shopId: shopId,
          name,
          sort: {
            name: 1,
          },
        },
      },
    });
  };

  useEffect(() => {
    if (canQueryPos) {
      getPointOfSales({
        variables: {
          input: {
            shopId: shopId,
            _id: value,
            sort: {
              name: 1,
            },
          },
        },
      });
    }
  }, [shopId]);

  return (
    <>
      <Select
        style={{ width: '100%' }}
        showSearch
        loading={loading}
        placeholder="Seleccione el punto de venta"
        optionFilterProp="key"
        onChange={onChange}
        onSearch={onSearch}
        disabled={disabled}
        value={value}
        allowClear
      >
        {data?.pointOfSales?.docs?.map(({ _id, name, shop }) => (
          <Option key={name} value={_id}>
            {shop.name} / {name}
          </Option>
        ))}
      </Select>
      {!canQueryPos && (
        <Alert
          message="No tiene permiso para consultar los puntos de venta"
          type="error"
          showIcon
        />
      )}
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SelectPointOfSale;
