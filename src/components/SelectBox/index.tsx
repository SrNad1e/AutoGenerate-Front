/* eslint-disable react-hooks/exhaustive-deps */
import { Select, Alert } from 'antd';
import { useEffect } from 'react';

import { useGetBoxes } from '@/hooks/box.hooks';
import { useModel } from 'umi';
import { Permissions } from '@/graphql/graphql';

const { Option } = Select;

export type Params = {
  onChange?: (id: string) => void;
  value?: string;
  disabled: boolean;
};

const SelectBox = ({ onChange, disabled, value }: Params) => {
  const [getBoxes, { loading, data, error }] = useGetBoxes();

  const { initialState } = useModel('@@initialState');
  const canQueryBox = initialState?.currentUser?.role.permissions.find(
    (permission) => permission.action === Permissions.ReadTreasuryBoxes,
  );

  /**
   * @description se encarga de consultar con base a un comodín
   * @param name comodín de coincidencia en el nombre
   */
  const onSearch = (name: string) => {
    getBoxes({
      variables: {
        input: {
          name,
          _id: value,
        },
      },
    });
  };

  useEffect(() => {
    if (canQueryBox) {
      getBoxes({
        variables: {
          input: {
            _id: value,
          },
        },
      });
    }
  }, []);

  return (
    <>
      <Select
        style={{ width: '100%' }}
        showSearch
        loading={loading}
        placeholder="Seleccione la caja"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        disabled={disabled}
        value={value}
      >
        {data?.boxes?.docs?.map(({ _id, name }) => (
          <Option key={_id} value={_id}>
            {name}
          </Option>
        ))}
      </Select>
      {!canQueryBox && (
        <Alert message="No tiene permiso para consultar las cajas" type="error" showIcon />
      )}
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SelectBox;
