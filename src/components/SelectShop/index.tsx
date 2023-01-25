/* eslint-disable react-hooks/exhaustive-deps */
import { Select, Alert } from 'antd';
import { useEffect, useState } from 'react';

import { useGetShops } from '@/hooks/shop.hooks';
import { useModel } from 'umi';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import { Permissions } from '@/graphql/graphql';

const { Option } = Select;

export type Params = {
  onChange?: (id: string) => void;
  value?: string;
  disabled: boolean;
};

const SelectShop = ({ onChange, disabled, value }: Params) => {
  const [getShops, { loading, data, error }] = useGetShops();
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const { initialState } = useModel('@@initialState');
  const canQueryShops = initialState?.currentUser?.role.permissions.find(
    (permission) => permission.action === Permissions.ReadConfigurationShops,
  );

  /**
   * @description cierra la alerta y el modal
   */
  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  /**
   * @description funcion usada para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const showError = (message: string) => {
    setAlertInformation({
      message,
      type: 'warning',
      visible: true,
    });
  };

  /**
   * @description se encarga de consultar con base a un comodín
   * @param name comodín de coincidencia en el nombre
   */
  const onSearch = async () => {
    try {
      getShops({
        variables: {
          input: {
            sort: {
              name: 1,
            },
          },
        },
      });
    } catch (e: any) {
      showError(e?.message);
    }
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
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </>
  );
};

export default SelectShop;
