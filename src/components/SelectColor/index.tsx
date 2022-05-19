/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Avatar, Select, Typography } from 'antd';
import { useEffect } from 'react';

import { useGetColors } from '@/hooks/color.hooks';

const { Option } = Select;
const { Text } = Typography;

export type Props = {
  onChange?: (value: string | undefined) => void;
  value?: string;
  disabled: boolean;
};

const SelectColor = ({ onChange, value, disabled }: Props) => {
  const [getColors, { loading, data, error }] = useGetColors();

  /**
   * @description se encarga de consultar con base a un comodín
   * @param name comodín de coincidencia en el nombre
   */
  const onSearch = (name: string) => {
    getColors({
      variables: {
        input: {
          name,
          active: true,
          sort: {
            name: 1,
          },
        },
      },
    });
  };

  useEffect(() => {
    getColors({
      variables: {
        input: {
          _id: value,
          active: true,
          sort: {
            name: 1,
          },
        },
      },
    });
  }, []);

  return (
    <>
      <Select
        showSearch
        loading={loading}
        placeholder="Seleccione Color"
        optionFilterProp="name"
        onChange={onChange}
        onSearch={onSearch}
        value={value}
        disabled={disabled}
        allowClear
      >
        {data?.colors?.docs?.map((color) => (
          <Option key={color?._id} value={color?._id} name={color?.name_internal}>
            <>
              <Avatar
                size="small"
                style={{ backgroundColor: color?.html, border: 'solid 1px black' }}
                src={`${CDN_URL}/${color?.image?.urls?.webp?.small}`}
              />

              <Text style={{ marginLeft: 10 }}>
                {color?.name} / {color?.name_internal}
              </Text>
            </>
          </Option>
        ))}
      </Select>
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SelectColor;
