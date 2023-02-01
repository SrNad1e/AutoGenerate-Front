/* eslint-disable react-hooks/exhaustive-deps */
import { Select, Alert } from 'antd';
import { useEffect, useState } from 'react';
import { useGetConveyors } from '@/hooks/conveyors.hooks';
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

const SelectConveyor = ({ onChange, disabled, value }: Params) => {
  const [getConveyor, { loading, data, error }] = useGetConveyors();
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const { initialState } = useModel('@@initialState');
  const canQueryConveyors = initialState?.currentUser?.role.permissions.find(
    (permission) => permission.action === Permissions.ReadConfigurationConveyors,
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
      getConveyor({
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
    if (canQueryConveyors) {
      try {
        getConveyor({
          variables: {
            input: {
              _id: value,
            },
          },
        });
      } catch (e: any) {
        showError(e?.message);
      }
    }
  }, []);

  return (
    <>
      <Select
        style={{ width: 200 }}
        showSearch
        loading={loading}
        placeholder="Seleccione Transportista"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        allowClear
        disabled={disabled}
        value={value}
      >
        {data?.conveyors?.docs?.map(({ _id, name }) => (
          <Option key={_id} value={_id}>
            {name}
          </Option>
        ))}
      </Select>
      {error && <Alert message={error} type="info" showIcon />}
      {!canQueryConveyors && (
        <Alert message="No tiene permiso para consultar los transportistas" type="error" showIcon />
      )}
      {error && <Alert message={error} type="info" showIcon />}
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </>
  );
};

export default SelectConveyor;
