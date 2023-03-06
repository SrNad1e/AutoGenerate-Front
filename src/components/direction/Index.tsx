import React, { useState } from 'react';
import { AutoComplete } from 'antd';

const { Option } = AutoComplete;

const Index: React.FC = () => {
  const [dataSource, setDataSource] = useState([]);
  // eslint-disable-next-line
  const [value, setValue] = useState('');
  // eslint-disable-next-line
  const locations = async (text: String) => {
    try {
      const requestOptions = {
        method: 'GET',
      };

      await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=2704b0ce520b4865b61a4285e94b95a3`,
        requestOptions,
      )
        .then((response) => response.json())
        .then((result) => {
          setDataSource(result?.features);

          console.log(result);
        })
        .catch((error) => console.log('error', error));
    } catch (error) {
      console.log(error);
    }
  };

  const onSelect = (data: string) => {
    console.log('onSelect', data);
  };

  const onChange = (data: string) => {
    setValue(data);
  };

  console.log(dataSource);

  return (
    <>
      <AutoComplete
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={(text) => locations(text)}
        onChange={onChange}
        placeholder="Dirección"
      >
        {dataSource?.map((m: any) => (
          // eslint-disable-next-line
          <Option> {`${m?.properties?.formatted}`} </Option>
        ))}
      </AutoComplete>
    </>
  );
};

export default Index;
