/* eslint-disable react-hooks/exhaustive-deps */
import { Select, Alert } from 'antd';
import { useEffect, useState } from 'react';

import { useGetCities } from '@/hooks/cities.hooks';
import { Permissions } from '@/graphql/graphql';
import { useModel } from 'umi';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';

const { Option } = Select;

export type Params = {
  onChange?: (id: string) => void;
  value?: string;
  disabled: boolean;
};

const SelectCity = ({ onChange, disabled, value }: Params) => {
  const [getCities, { loading, data, error }] = useGetCities();
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const { initialState } = useModel('@@initialState');
  const canQueryCities = initialState?.currentUser?.role.permissions.find(
    (permission) => permission.action === Permissions.ReadCrmCities,
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
  const onSearch = () => {
    try {
      getCities({
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
    if (canQueryCities) {
      try {
        getCities({
          variables: {
            input: {
              _id: value,
            },
          },
        });
      } catch (e: any) {
        showError(e?.message);
      }
    } else {
      showError('No tiene permiso para consultar las ciudades');
    }
  }, []);

  return (
    <>
      <Select
        style={{ width: '100%' }}
        showSearch
        loading={loading}
        placeholder="Seleccione Ciudad"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        disabled={disabled}
        value={value}
      >
        {data?.cities?.docs?.map((city) => (
          <Option key={city._id} value={city._id}>
            {city.name}
          </Option>
        ))}
      </Select>
      {error && <Alert message={error} type="info" showIcon />}
      {!canQueryCities && (
        <Alert message="No tiene permiso para consultar las ciudades" type="error" showIcon />
      )}
      {error && <Alert message={error} type="info" showIcon />}
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </>
  );
};

export default SelectCity;
