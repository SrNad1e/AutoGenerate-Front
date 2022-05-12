import { useGetColors } from '@/hooks/color.hooks';
import { Alert, Avatar, Select, Typography } from 'antd';

const { Text } = Typography;
const { Option } = Select;

export type Params = {
  onChange?: (value: string[]) => void;
  disabled: boolean;
};

const SelectListColor = ({ onChange, disabled }: Params) => {
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

  return (
    <>
      <Select
        mode="multiple"
        showSearch
        loading={loading}
        placeholder="Seleccione Colores"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        disabled={disabled}
      >
        {data?.colors?.docs?.map(({ _id, name_internal, name, image, html }) => (
          <Option key={_id} name={name_internal}>
            <>
              <Avatar
                size="small"
                style={{ backgroundColor: html, border: 'solid 1px black' }}
                src={`${CDN_URL}/${image?.urls?.webp?.small}`}
              />

              <Text style={{ marginLeft: 10 }}>
                {name} / {name_internal}
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
