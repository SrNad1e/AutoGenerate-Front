/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Modal, Row, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';

import type { Payment } from '@/graphql/graphql';
import Item from './item';
import { useGetPayments } from '@/hooks/payment.hooks';

export type Props = {
  visible: boolean;
  onCancel: () => void;
};

const { Title, Text } = Typography;

const ModalPayment = ({ visible, onCancel }: Props) => {
  const [payments, setPayments] = useState<Payment[]>([]);

  const [getPayments, { data }] = useGetPayments();

  const setPayment = (payment: Payment) => {
    setPayments(payments.concat(payment));
  };

  useEffect(() => {
    getPayments({
      variables: {
        input: {},
      },
    });
  }, []);

  return (
    <Modal
      centered
      visible={visible}
      onCancel={onCancel}
      destroyOnClose
      footer={false}
      width={1200}
    >
      <Row align="middle">
        <Col span={11}>
          <Space align="center" direction="horizontal">
            <Title level={3}>Medios de pago</Title>
          </Space>
          <Row>
            {data?.payments?.docs?.map((payment) => (
              <Col key={payment?._id}>
                <Item payment={payment as Payment} setPayment={setPayment} />
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={11}>
          <Title level={3}>Pagos</Title>
          <Row>
            <Col span={12}>
              <Text strong>Efectivo</Text>
            </Col>
            <Col span={12}>
              <Text
                style={{
                  textAlign: 'right',
                }}
              >
                $ 50.000
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalPayment;
