import { Alert, Select } from 'antd';

import { useGetSizes } from '@/hooks/size.hooks';

const { Option } = Select;

export type Params = {
  onChange?: (value: string[]) => void;
};

const SelectListSize = ({ onChange }: Params) => {
  const [getSizes, { loading, data, error }] = useGetSizes();

  /**
   * @description se encarga de consultar con base a un comodín
   * @param name comodín de coincidencia en el nombre
   */
  const onSearch = (name: string) => {
    getSizes({
      variables: {
        input: {
          name,
          active: true,
          sort: {
            value: 1,
          },
        },
      },
    });
  };

  return (
    <>
      <Select
        mode="multiple"
        showSearch
        loading={loading}
        placeholder="Seleccione Tallas"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
      >
        {data?.sizes?.docs?.map((size) => (
          <Option key={size?._id}>{size?.value}</Option>
        ))}
      </Select>
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SelectListSize;
