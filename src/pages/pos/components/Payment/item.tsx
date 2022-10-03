import { Button, Image, Space, Typography } from 'antd';

import type { Payment, PaymentOrder } from '@/graphql/graphql';

import DefaultImage from '@/assets/default.webp';

import styles from '../styles';

const { Title } = Typography;

export type Params = {
  payment: Payment;
  paymentsOrder: PaymentOrder[];
  setPayment: (payment: Payment) => void;
  disabled: boolean;
};

const Item = ({ payment, setPayment, paymentsOrder, disabled }: Params) => {
  const { name, color, logo } = payment;

  const disabledLocal =
    !!paymentsOrder?.find((item) => item?.payment?._id === payment?._id) || disabled;

  return (
    <Button
      style={{
        backgroundColor: disabledLocal ? 'grey' : color || 'yellow',
        width: 230,
        height: '100%',
        padding: 20,
      }}
      disabled={disabledLocal}
      type="text"
      onClick={() => setPayment(payment)}
    >
      <Space direction="vertical" align="center" style={styles.maxWidth}>
        <Image
          width={100}
          src={`${CDN_URL}/${logo?.urls?.webp?.small}`}
          fallback={DefaultImage}
          preview={false}
        />
        <Title style={styles.whiteColor} level={3}>
          {name}
        </Title>
      </Space>
    </Button>
  );
};

export default Item;
