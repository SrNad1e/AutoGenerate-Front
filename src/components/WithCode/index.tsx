import { BarcodeOutlined } from '@ant-design/icons';
import { Select } from 'antd';

const { Option } = Select;

export type Props = {
  onChange?: (value: string) => void;
  value?: string;
};

const WithCode = ({ onChange, value }: Props) => {
  return (
    <Select onChange={onChange} value={value}>
      <Option key="true">
        <BarcodeOutlined /> Con barras
      </Option>
      <Option key="false">Sin Barras</Option>
    </Select>
  );
};

export default WithCode;
