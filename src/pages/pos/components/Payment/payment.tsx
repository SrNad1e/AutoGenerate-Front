import { Button, Col, InputNumber, Space, Typography } from 'antd';

import type { PaymentOrder, Payment as PaymentModel } from '@/graphql/graphql';
import { DeleteOutlined } from '@ant-design/icons';

const { Text } = Typography;

export type Params = {
  setQuantityPayment: (payment: PaymentModel, total: number) => void;
  deletePayment: (payment: PaymentModel) => void;
  paymentOrder: PaymentOrder;
  total?: number;
  max?: number;
  disabled: boolean;
};

const Payment = ({
  paymentOrder: { payment },
  setQuantityPayment,
  deletePayment,
  total = 0,
  max,
  disabled,
}: Params) => {
  return (
    <>
      <Col span={12}>
        <Text strong>{payment?.name}</Text>
      </Col>
      <Col span={12}>
        <Space align="end">
          <InputNumber
            autoFocus
            max={max}
            disabled={disabled}
            controls={false}
            defaultValue={total}
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
            onChange={(value) => setQuantityPayment(payment, value)}
          />
          <Button
            onClick={() => deletePayment(payment)}
            icon={<DeleteOutlined />}
            danger
            type="primary"
          />
        </Space>
      </Col>
    </>
  );
};

export default Payment;
