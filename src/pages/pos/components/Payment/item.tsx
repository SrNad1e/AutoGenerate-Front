import { Card, Col, Image, Row } from 'antd';

import type { Payment } from '@/graphql/graphql';

import DefaultImage from '@/assets/default.webp';

export type Params = {
  payment: Payment;
  setPayment: (payment: Payment) => void;
};

const Item = ({ payment, setPayment }: Params) => {
  const { name, color, logo } = payment;
  return (
    <Card
      style={{
        backgroundColor: color || 'yellow',
        color: 'white',
      }}
      onClick={() => setPayment(payment)}
    >
      <Row>
        <Col span={24}>
          <Image src={`${CDN_URL}/${logo?.urls?.webp?.small}`} fallback={DefaultImage} />
        </Col>
        <Col span={24}>{name}</Col>
      </Row>
    </Card>
  );
};

export default Item;
