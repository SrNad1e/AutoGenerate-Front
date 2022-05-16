/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Avatar, Select, Typography } from 'antd';
import { useEffect } from 'react';

import { useGetColors } from '@/hooks/color.hooks';
import type { Color } from '@/graphql/graphql';

const { Text } = Typography;
const { Option } = Select;

export type Params = {
  onChange?: (colors: Color[] | []) => void;
  value?: Color[];
  disabled: boolean;
};

const SelectListColor = ({ onChange, value, disabled }: Params) => {
  const [getColors, { loading, data, error }] = useGetColors();

  /**
   * @description se encarga de consultar con base a un comodín
   * @param name comodín de coincidencia en el nombre
   */
  const onSearch = (name?: string) => {
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

  const onChangeLocal = (ids: string[]) => {
    const newIds = ids.filter((id) => !value?.find(({ _id }) => _id === id));

    const newColors = data?.colors?.docs?.filter(({ _id }) => !!newIds.includes(_id));

    if (onChange) {
      onChange(value?.concat(newColors) || newColors || []);
    }
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
        placeholder="Seleccione Colores"
        optionFilterProp="children"
        onChange={onChangeLocal}
        onSearch={onSearch}
        disabled={disabled}
      >
        {data?.colors?.docs?.map((color) => (
          <Option key={color?._id} name={color?.name_internal}>
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

export default SelectListColor;
