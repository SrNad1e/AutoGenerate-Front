/* eslint-disable react-hooks/exhaustive-deps */
import { Select, Alert } from '@/utils/Desing';
import { useEffect } from 'react';

import { useGetRoles } from '@/hooks/rol.hooks';
import { Permissions } from '@/graphql/graphql';
import { useModel, useLocation } from 'umi';

const { Option } = Select;

export type Params = {
  onChange?: (id: string) => void;
  value?: string;
  disabled: boolean;
};

const SelectRole = ({ onChange, disabled, value }: Params) => {
  const locations = useLocation();

  const [getRoles, { loading, data, error }] = useGetRoles();

  const { initialState } = useModel('@@initialState');
  const canQueryRoles = initialState?.currentUser?.role.permissions.find(
    (permission) => permission.action === Permissions.ReadConfigurationRoles,
  );

  /**
   * @description se encarga de consultar con base a un comodín
   * @param name comodín de coincidencia en el nombre
   */
  const onSearch = (name: string) => {
    getRoles({
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
    if (canQueryRoles) {
      getRoles({
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
        style={{ width: '100%' }}
        showSearch
        loading={loading}
        placeholder="Seleccione el Rol"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        disabled={disabled}
        value={value}
      >
        {data?.roles?.docs?.map(({ _id, name }) =>
          name === 'Cliente' && locations.pathname === '/configurations/users/list' ? null : (
            <Option key={_id} value={_id}>
              {name}
            </Option>
          ),
        )}
      </Select>
      {!canQueryRoles && (
        <Alert message="No tiene permiso para consultar los roles" type="error" showIcon />
      )}
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SelectRole;
