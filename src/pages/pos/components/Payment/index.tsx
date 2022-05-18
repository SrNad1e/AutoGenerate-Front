/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Divider, Modal, Row, Typography } from 'antd';
import { useParams } from 'umi';
import { useEffect, useState } from 'react';
import numeral from 'numeral';

import type {
  Payment as PaymentModel,
  PaymentOrder,
  SummaryOrder,
  UpdateOrderInput,
} from '@/graphql/graphql';
import Item from './item';
import { useGetPayments } from '@/hooks/payment.hooks';
import Payment from './payment';
import { useAddPaymentsOrder } from '@/hooks/order.hooks';

const { Title } = Typography;

export type Params = {
  visible: boolean;
  onCancel: () => void;
  editOrder: (values: UpdateOrderInput) => void;
  summary: SummaryOrder;
};

const ModalPayment = ({ visible, onCancel, editOrder, summary }: Params) => {
  const [payments, setPayments] = useState<PaymentOrder[]>([]);

  const { id } = useParams<Partial<{ id: string }>>();

  const [getPayments, { data }] = useGetPayments();
  const [addPayments] = useAddPaymentsOrder();

  const totalPayments = payments?.reduce((sum, paymentOrder) => sum + paymentOrder?.total, 0);

  const setPayment = (payment: PaymentModel) => {
    setPayments(
      payments.concat({
        payment,
        total: payment?.type !== 'cash' ? summary?.total : 0,
      } as PaymentOrder),
    );
  };

  const setQuantityPayment = (payment: PaymentModel, total: number) => {
    setPayments(
      payments.map((paymentOrder) => {
        if (payment._id === paymentOrder?.payment?._id) {
          return {
            ...paymentOrder,
            total,
          };
        }

        return paymentOrder;
      }),
    );
  };

  const deletePayment = (payment: PaymentModel) => {
    setPayments(payments?.filter((paymentOrder) => paymentOrder?.payment?._id !== payment?._id));
  };

  const onFinish = async () => {
    try {
      const responsePayments = await addPayments({
        variables: {
          input: {
            orderId: id || '',
            payments: payments.map((paymentOrder) => ({
              paymentId: paymentOrder?.payment?._id,
              action: 'create',
              total: paymentOrder?.total,
            })),
          },
        },
      });
      if (responsePayments.data?.addPaymentsOrder) {
        await editOrder({
          status: 'invoiced',
        });
        //mostar la factura
      }
    } catch (e: any) {
      console.log(e);
    }
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
      bodyStyle={{
        height: '100%',
      }}
    >
      <Row>
        <Col span={12}>
          <Title level={3}>Medios de pago</Title>
          <Row gutter={24}>
            {data?.payments?.docs?.map((payment) => (
              <Col key={payment?._id}>
                <Item
                  disabled={summary?.total <= totalPayments}
                  paymentsOrder={payments}
                  payment={payment as PaymentModel}
                  setPayment={setPayment}
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={12}>
          <Title level={3}>Pagos</Title>
          <Row gutter={[16, 16]}>
            {payments.map((paymentOrder) => (
              <Payment
                deletePayment={deletePayment}
                setQuantityPayment={setQuantityPayment}
                max={paymentOrder?.payment?.type !== 'cash' ? summary?.total : undefined}
                total={paymentOrder?.payment?.type !== 'cash' ? summary?.total : 0}
                paymentOrder={paymentOrder}
                key={paymentOrder?.payment?._id}
              />
            ))}
          </Row>
          <Divider>
            <Title level={4}>Resumen</Title>
          </Divider>
          <Row>
            <Col span={12}>
              <Title
                style={{
                  lineHeight: 0,
                }}
                level={4}
              >
                Total pagos:
              </Title>
              <Title
                style={{
                  lineHeight: 0,
                }}
                level={4}
              >
                Saldo:
              </Title>
              <Title
                style={{
                  lineHeight: 0,
                }}
                level={4}
              >
                Cambio:
              </Title>
            </Col>
            <Col
              span={12}
              style={{
                textAlign: 'right',
                lineHeight: 0,
              }}
            >
              <Title
                style={{
                  lineHeight: 0,
                }}
                level={4}
              >
                {numeral(totalPayments).format('$ 0,0')}
              </Title>
              <Title
                style={{
                  lineHeight: 0,
                }}
                level={4}
              >
                {numeral(
                  summary?.total > totalPayments ? summary?.total - totalPayments : 0,
                ).format('$ 0,0')}
              </Title>
              <Title
                style={{
                  lineHeight: 0,
                }}
                level={4}
              >
                {numeral(
                  totalPayments > summary?.total ? totalPayments - summary?.total : 0,
                ).format('$ 0,0')}
              </Title>
            </Col>
          </Row>
          <Divider />
          <Button
            onClick={onFinish}
            disabled={totalPayments < summary?.total}
            type="primary"
            size="large"
          >
            FACTURAR
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalPayment;
