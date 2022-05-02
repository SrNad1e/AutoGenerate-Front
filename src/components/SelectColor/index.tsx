/* eslint-disable react-hooks/exhaustive-deps */
import { useGetColors } from '@/hooks/color.hooks';
import { Alert, Avatar, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';

import styles from './styles.less';

const { Option } = Select;
const { Text } = Typography;

export type Props = {
  onChange?: (value: COLOR.Color | undefined) => void;
  value?: string;
};

const SelectColor = ({ onChange }: Props) => {
  const [colors, setColors] = useState<Partial<COLOR.Color[]>>([]);
  const [error, setError] = useState<string | undefined>();

  /**
   * @description callback ejecutado por el customHook
   * @param colorsData array de colores
   */
  const resultColors = (colorsData: COLOR.ResponsePaginate) => {
    if (colorsData) {
      setColors(colorsData.docs);
    }
  };

  /**
   * @description maneja el error de la consulta
   * @param message error que genera al consulta
   */
  const showError = (message: string) => {
    setError(message);
  };

  const { getColors, loading } = useGetColors(resultColors, showError);

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

  const onChangeLocal = (colorId: string) => {
    if (onChange) {
      onChange(colors.find((color) => color?._id === colorId));
    }
  };

  useEffect(() => {
    getColors({
      variables: {
        input: {
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
        className={styles.select}
        showSearch
        loading={loading}
        placeholder="Seleccione Color"
        optionFilterProp="name"
        onChange={onChangeLocal}
        onSearch={onSearch}
      >
        {colors.map((color) => (
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

export default SelectColor;
