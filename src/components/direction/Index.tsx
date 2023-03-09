import { useState } from 'react';
import { AutoComplete } from 'antd';

const { Option } = AutoComplete;

interface locations {
  setValue: any;
  // eslint-disable-next-line
  city: string;
  disable: boolean;
  onClear: any;
}

const Index = ({ setValue, defautValue, city, disable, onClear }: locations) => {
  const [dataSource, setDataSource] = useState([]);
  // eslint-disable-next-line

  // eslint-disable-next-line
  const locations = async (text: String) => {
    try {
      const requestOptions = {
        method: 'GET',
      };
      // eslint-disable-next-line
      let textValue: String = `${text},${city},Colombia`;

      await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${textValue}&apiKey=2704b0ce520b4865b61a4285e94b95a3`,
        requestOptions,
      )
        .then((response) => response.json())
        .then((result) => {
          setDataSource(result?.features);
        })
        .catch((error) => console.log('error', error));
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (data: string) => {
    setValue(data);
  };

  return (
    <>
      <AutoComplete
        style={{ width: '100%' }}
        onSearch={(text) => locations(text)}
        onChange={onChange}
        placeholder="Dirección"
        defaultValue={defautValue}
        disabled={disable}
        onClear={onClear}
        allowClear
      >
        {dataSource?.map((m: any) => (
          // eslint-disable-next-line
          <Option value={m?.properties?.formatted}> {`${m?.properties?.formatted}`} </Option>
        ))}
      </AutoComplete>
    </>
  );
};

export default Index;
