/* eslint-disable react-hooks/exhaustive-deps */
import type { DetailReceiptOrder } from '@/graphql/graphql';
import { DollarCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, InputNumber, Modal, Space } from 'antd';
import { useEffect, useRef } from 'react';
import styles from '../styles';

const FormItem = Form.Item;

type Props = {
  visible: boolean;
  onCancel: () => void;
  detail?: DetailReceiptOrder;
  onOk: () => void;
};

const Balance = ({ visible, onCancel, detail, onOk }: Props) => {
  const refAmount = useRef(null);

  useEffect(() => {
    refAmount?.current?.select();
  }, [visible]);
  return (
    <Modal
      title="Elección de saldo"
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      style={{ marginTop: 150 }}
      okText="Elegir Saldo"
      cancelText="Cancelar"
      okButtonProps={{
        style: styles.buttonR,
        icon: <PlusOutlined />,
      }}
      cancelButtonProps={{
        style: styles.buttonR,
      }}
    >
      <FormItem
        label={
          <Space>
            <DollarCircleOutlined />
            Saldo
          </Space>
        }
        name="amount"
      >
        <InputNumber
          ref={refAmount}
          style={styles.maxWidth}
          min={1}
          max={detail?.amount}
          controls={false}
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
        />
      </FormItem>
    </Modal>
  );
};

export default Balance;
