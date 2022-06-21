import { DollarCircleOutlined } from '@ant-design/icons';
import { Form, InputNumber, Modal, Space } from 'antd';

const FormItem = Form.Item;

type Props = {
  visible: boolean;
  onCancel: () => void;
  balance: number;
};

const Balance = ({ visible, onCancel, balance }: Props) => {
  return (
    <Modal visible={visible} onCancel={onCancel}>
      <FormItem
        label={
          <Space>
            <DollarCircleOutlined />
            Saldo
          </Space>
        }
      >
        <InputNumber
          min={0}
          defaultValue={balance}
          controls={false}
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
        />
      </FormItem>
    </Modal>
  );
};

export default Balance;
