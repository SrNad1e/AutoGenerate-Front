/* eslint-disable react-hooks/exhaustive-deps */
import { Select, Alert } from 'antd';
import { useEffect, useState } from 'react';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import { useGetCompanies } from '@/hooks/company.hooks';

const { Option } = Select;

export type Params = {
  onChange?: (id: string) => void;
  value?: string;
  disabled: boolean;
};

const SelectCompany = ({ onChange, disabled, value }: Params) => {
  const [getCompanies, { loading, data, error }] = useGetCompanies();
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

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

  const onSearch = async () => {
    try {
      await getCompanies({
        variables: {
          input: {
            sort: {
              name: 1,
            },
            limit: 100,
          },
        },
      });
    } catch (e: any) {
      showError(e?.message);
    }
  };

  useEffect(() => {
    onSearch();
  }, []);

  return (
    <>
      <Select
        style={{ width: '100%' }}
        showSearch
        loading={loading}
        placeholder="Seleccione Compañia"
        optionFilterProp="children"
        onChange={onChange}
        disabled={disabled}
        value={value}
      >
        {data?.companies?.docs?.map((city) => (
          <Option key={city._id} value={city._id}>
            {city.name}
          </Option>
        ))}
      </Select>
      {error && <Alert message={error} type="info" showIcon />}
      {error && <Alert message={error} type="info" showIcon />}
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </>
  );
};

export default SelectCompany;
