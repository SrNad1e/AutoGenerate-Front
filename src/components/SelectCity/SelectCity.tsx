import { Select, Alert } from '@/utils/Desing';
import { useEffect, useState } from 'react';

import { useGetCities } from '@/hooks/cities.hooks';
import { Permissions } from '@/graphql/graphql';
import { useModel } from 'umi';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';

const { Option } = Select;

interface propsSelect {
  setCity: any;
}

const SelectCity = ({ setCity }: propsSelect) => {
  const [getCities, { loading, data, error, refetch }] = useGetCities();
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
  // eslint-disable-next-line
  const onSearch = (e) => {
    try {
      if (e.length === 0 || e.length === 5 || e.length === 7 || e.length === 10) {
        refetch({
          input: {
            sort: {
              name: 1,
            },
            name: e,
          },
        });
      }

      // eslint-disable-next-line
    } catch (e: any) {
      showError(e?.message);
    }
  };

  useEffect(() => {
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
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Select
        style={{ width: '100%' }}
        showSearch
        loading={loading}
        placeholder="Seleccione Ciudad"
        optionFilterProp="children"
        onChange={(e) => setCity(e)}
        onSearch={onSearch}
        disabled={false}
        allowClear
        onClear={() => setCity('')}
      >
        {data?.cities?.docs?.map((city) => (
          <Option key={city._id} value={city.name}>
            {city.name}{' '}
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
