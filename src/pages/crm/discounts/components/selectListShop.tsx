/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Select, Typography } from 'antd';
import { useEffect } from 'react';
import type { CustomerType } from '@/graphql/graphql';
import { useGetShops } from '@/hooks/shop.hooks';

const { Text } = Typography;
const { Option } = Select;

export type Params = {
  onChange?: (customerType: CustomerType[] | []) => void;
  value?: CustomerType[];
  disabled: boolean;
};

const SelectListShop = ({ onChange, value, disabled }: Params) => {
  const [getShops, { loading, data, error }] = useGetShops();

  /**
   * @description se encarga de consultar con base a un comodín
   * @param name comodín de coincidencia en el nombre
   */
  const onSearch = (name?: string) => {
    getShops({
      variables: {
        input: {
          name,
        },
      },
    });
  };

  useEffect(() => {
    onSearch();
  }, []);

  return (
    <>
      <Select
        mode="multiple"
        showSearch
        loading={loading}
        placeholder="Seleccione Tiendas"
        optionFilterProp="child"
        onChange={onChange}
        value={value?.length > 0 ? value : undefined}
        onSearch={onSearch}
        disabled={disabled}
      >
        {data?.shops?.docs?.map((type) => (
          <Option key={type?._id} name={type?.name}>
            <Text style={{ marginLeft: 10 }}>{type?.name}</Text>
          </Option>
        ))}
      </Select>
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SelectListShop;
