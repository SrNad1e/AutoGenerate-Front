import { useGetBrands } from '@/hooks/brand.hooks';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { useEffect, useState } from 'react';
import { Select } from 'antd';
import AlertInformation from '@/components/Alerts/AlertInformation';

export type Props = {
  onChange?: (_id: string) => void;
  value?: string;
};

const SelectBrand = ({ onChange, value }: Props) => {
  const [brands, setBrands] = useState<Partial<BRAND.Brand[]>>([]);
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const { Option } = Select;

  const resultBrands = (brandData: Partial<BRAND.ResponseBrands>) => {
    setBrands(brandData.docs || []);
  };

  const showError = (message: string) => {
    setAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  const { getBrands, loadingGet } = useGetBrands(resultBrands, showError);

  const onSearchLocal = (name?: string) => {
    getBrands({
      variables: {
        input: {
          name,
        },
      },
    });
  };

  useEffect(() => {
    onSearchLocal();
  }, []);
  return (
    <>
      <Select
        showSearch
        optionFilterProp="children"
        allowClear
        loading={loadingGet}
        style={{ width: '80%' }}
        placeholder="Seleccionar Marca"
        onChange={onChange}
        onSearch={onSearchLocal}
        value={value}
      >
        {brands.map((brand) => (
          <Option key={brand?._id?.toString()}>{brand?.name}</Option>
        ))}
      </Select>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </>
  );
};

export default SelectBrand;
