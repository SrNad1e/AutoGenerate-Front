/* eslint-disable react-hooks/exhaustive-deps */
import { useGetAttribs } from '@/hooks/attrib.hooks';
import { Alert, Select } from 'antd';
import { useEffect } from 'react';

const { Option } = Select;

export type Params = {
  onChange?: (value: string[]) => void;
  value?: string[];
  disabled?: boolean;
};

const SelectListAttrib = ({ onChange, value, disabled }: Params) => {
  const [getAttribs, { loading, data, error }] = useGetAttribs();

  /**
   * @description se encarga de consultar con base a un comodín
   * @param name comodín de coincidencia en el nombre
   */
  const onSearch = (name?: string) => {
    getAttribs({
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
    if (value && value?.length > 0) {
      getAttribs({
        variables: {
          input: {
            _ids: value,
            active: true,
            sort: {
              name: 1,
            },
          },
        },
      });
    } else {
      getAttribs({
        variables: {
          input: {
            active: true,
            sort: {
              name: 1,
            },
          },
        },
      });
    }
  }, [!!value]);

  return (
    <>
      <Select
        mode="multiple"
        allowClear
        showSearch
        loading={loading}
        optionFilterProp="children"
        placeholder="Seleccione Atributos"
        onChange={onChange}
        onSearch={onSearch}
        value={value}
        disabled={disabled}
      >
        {data?.attribs?.docs?.map(({ _id, name }) => (
          <Option key={_id} name={name}>
            {name}
          </Option>
        ))}
      </Select>
      {error && <Alert message={error} type="info" showIcon />}
    </>
  );
};

export default SelectListAttrib;
