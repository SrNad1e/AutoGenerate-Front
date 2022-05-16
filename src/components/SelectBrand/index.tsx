/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Select } from 'antd';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import { useGetBrands } from '@/hooks/brand.hooks';

export type Props = {
  onChange?: (_id: string) => void;
  value?: string;
  disabled: boolean;
};
const { Option } = Select;

const SelectBrand = ({ onChange, value, disabled }: Props) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const [getBrands, { data, loading }] = useGetBrands();

  /**
   * @description cierra la alerta de información
   */
  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  /**
   * @description se encarga de organizar los filtros y ejecutar la función de busqueda
   * @param name nombre de la marca
   */
  const onSearchLocal = (values?: string) => {
    getBrands({
      variables: {
        input: {
          name: values,
        },
      },
    });
  };

  useEffect(() => {
    getBrands({
      variables: {
        input: {
          _id: value,
        },
      },
    });
  }, [!!value]);

  return (
    <>
      <Select
        showSearch
        disabled={disabled}
        optionFilterProp="children"
        allowClear
        loading={loading}
        placeholder="Seleccionar Marca"
        onChange={onChange}
        onSearch={onSearchLocal}
        value={value}
      >
        {data?.brands.docs.map((brand) => (
          <Option key={brand?._id?.toString()}>{brand?.name}</Option>
        ))}
      </Select>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </>
  );
};

export default SelectBrand;
