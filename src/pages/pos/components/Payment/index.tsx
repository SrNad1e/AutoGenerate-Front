/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Divider, Modal, Row, Typography } from 'antd';
import { useParams } from 'umi';
import { useEffect, useRef, useState } from 'react';
import numeral from 'numeral';
import { useReactToPrint } from 'react-to-print';

import type {
  Credit,
  Payment as PaymentModel,
  PaymentOrder,
  SummaryOrder,
  UpdateOrderInput,
} from '@/graphql/graphql';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { ActionPaymentsOrder, StatusOrder, TypePayment } from '@/graphql/graphql';
import Item from './item';
import { useGetPayments } from '@/hooks/payment.hooks';
import Payment from './payment';
import { useAddPaymentsOrder } from '@/hooks/order.hooks';
import AlertInformation from '@/components/Alerts/AlertInformation';
import OrderReport from '../../reports/order/Order';
import AlertLoading from '@/components/Alerts/AlertLoading';

import styles from '../styles';
import ModalBonus from './modalBonus';

const { Title } = Typography;

export type Params = {
  visible: boolean;
  onCancel: () => void;
  editOrder: (values: UpdateOrderInput) => void;
  summary: SummaryOrder;
  credit?: Credit;
};

const ModalPayment = ({ visible, onCancel, editOrder, summary, credit }: Params) => {
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState<PaymentOrder[]>([]);
  const [order, setOrder] = useState({});
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [showModalBonus, setShowModalBonus] = useState<{
    visible: boolean;
    payment?: PaymentModel;
  }>({
    visible: false,
  });
  const orderRef = useRef(null);

  const { id } = useParams<Partial<{ id: string }>>();

  const [getPayments, { data }] = useGetPayments();
  const [addPayments, dataPayments] = useAddPaymentsOrder();

  const totalPayments = payments?.reduce((sum, paymentOrder) => sum + paymentOrder?.total, 0);

  const handlePrint = useReactToPrint({
    content: () => orderRef?.current,
  });

  /**
   * @description funcion usada por los hooks para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const showError = (message: string) => {
    setAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  /**
   * @description funcion usada por los hooks para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const showSuccess = (message: string) => {
    setAlertInformation({
      message,
      type: 'success',
      redirect: '/pos/sales',
      visible: true,
    });
  };

  /**
   * @description cierra la alerta y el modal
   */
  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  const onCloseModaloupon = () => {
    setShowModalBonus({
      visible: false,
    });
  };

  /**
   * @description gestiona los pagos
   * @param payment tipo de pago
   */
  const setPayment = (payment: PaymentModel) => {
    switch (payment?.type) {
      case TypePayment.Bank:
        setPayments(
          payments.concat({
            payment,
            total: summary?.total - totalPayments,
          } as PaymentOrder),
        );
        break;
      case TypePayment.Cash:
        setPayments(
          payments.concat({
            payment,
            total: 0,
          } as PaymentOrder),
        );
        break;
      case TypePayment.Bonus:
        setShowModalBonus({
          payment,
          visible: true,
        });
        break;
      case TypePayment.Credit:
        setPayments(
          payments.concat({
            payment,
            total:
              credit && credit?.available < summary.total
                ? credit?.available
                : summary.total - totalPayments,
          } as PaymentOrder),
        );
      default:
        break;
    }
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
              action: ActionPaymentsOrder.Create,
              total: paymentOrder?.total,
              code: paymentOrder?.code,
            })),
          },
        },
      });
      if (responsePayments?.data?.addPaymentsOrder) {
        setLoading(true);
        const response: any = await editOrder({
          status: StatusOrder.Closed,
        });

        setLoading(false);
        if (response) {
          setOrder(response?.order);
          handlePrint();
          showSuccess(`Pedido ${response?.order?.number} generado correctamente`);
        } else {
          showError(response?.message);
        }
      }
    } catch (e: any) {
      showError(e?.message);
    }
  };

  const validateMax = (paymentOrder: PaymentOrder) => {
    if (paymentOrder?.payment?.type === TypePayment.Credit) {
      return credit?.amount;
    }
    if (paymentOrder?.payment?.type !== TypePayment.Cash) {
      return summary.total;
    }
    return undefined;
  };

  useEffect(() => {
    try {
      getPayments({
        variables: {
          input: {
            active: true,
          },
        },
      });
    } catch (error: any) {
      showError(error?.message);
    }
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
          <Row gutter={[24, 24]}>
            {data?.payments?.docs
              ?.filter((payment) => (credit ? true : payment?.type !== TypePayment.Credit))
              ?.map((payment) => (
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
                disabled={paymentOrder?.payment?.type === TypePayment.Bonus}
                max={validateMax(paymentOrder)}
                total={
                  payments.find((payment) => payment?.payment?._id === paymentOrder.payment?._id)
                    ?.total || 0
                }
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
              <Title style={styles.payStyle} level={4}>
                Total Pedido:
              </Title>
              <Title style={styles.payStyle} level={4}>
                Total pagos:
              </Title>
              <Title style={styles.payStyle} level={4}>
                Saldo:
              </Title>
              <Title style={styles.payStyle} level={4}>
                Cambio:
              </Title>
            </Col>
            <Col span={12} style={styles.payTextRight}>
              <Title style={styles.payStyle} level={4}>
                {numeral(summary?.total).format('$ 0,0')}
              </Title>
              <Title style={styles.payStyle} level={4}>
                {numeral(totalPayments).format('$ 0,0')}
              </Title>
              <Title style={styles.payStyle} level={4}>
                {numeral(
                  summary?.total > totalPayments ? summary?.total - totalPayments : 0,
                ).format('$ 0,0')}
              </Title>
              <Title style={styles.payStyle} level={4}>
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
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <AlertLoading
        visible={loading || dataPayments?.loading}
        message={dataPayments.loading ? 'Generando factura' : 'Guardando medios de pago'}
      />
      <ModalBonus
        onCancel={onCloseModaloupon}
        payments={payments}
        setPayments={setPayments}
        {...showModalBonus}
      />
      <div style={{ display: 'none' }}>
        <OrderReport data={order} ref={orderRef} />
      </div>
    </Modal>
  );
};

export default ModalPayment;
