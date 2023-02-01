/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Divider, Modal, Row, Typography } from 'antd';
import { useModel, useParams } from 'umi';
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
import { useAddPaymentsOrder, useGetOrder } from '@/hooks/order.hooks';
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
  paymentsSave?: PaymentOrder[];
};

const ModalPayment = ({ visible, onCancel, editOrder, summary, credit, paymentsSave }: Params) => {
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

  const { initialState } = useModel('@@initialState');

  const [getPayments, { data }] = useGetPayments();
  const [addPayments, dataPayments] = useAddPaymentsOrder();
  const [getOrder, paramsGetOrder] = useGetOrder();

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

  function compare_lname(a, b) {
    if (a.payment.name.toLowerCase() < b.payment.name.toLowerCase()) {
      return -1;
    }
    if (a.payment.name.toLowerCase() > b.payment.name.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  const savePayments = () => {
    const arr: any = [];

    const paymenSave = paramsGetOrder?.data?.orderId?.order?.payments;
    const paymentSave = paymenSave?.sort(compare_lname);
    const paymentCurrent = payments?.sort(compare_lname);

    if (paymentSave?.length > paymentCurrent?.length) {
      for (let i = 0; i < payments?.length; i++) {
        if (paymentSave[i + 1]?.payment?._id === paymentCurrent[i]?.payment?._id) {
          arr.push({
            paymentId: payments[i]?.payment?._id,
            action: ActionPaymentsOrder.Update,
            total: payments[i]?.total,
            code: payments[i]?.code,
          });

          arr.push({
            paymentId: paymenSave[i]?.payment?._id,
            action: ActionPaymentsOrder.Delete,
            total: paymenSave[i]?.total,
          });
        } else if (paymentSave[i]?.payment?._id === paymentCurrent[i]?.payment?._id) {
          arr.push({
            paymentId: payments[i]?.payment?._id,
            action: ActionPaymentsOrder.Update,
            total: payments[i]?.total,
            code: payments[i]?.code,
          });
          arr.push({
            paymentId: paymenSave[i + 1]?.payment?._id,
            action: ActionPaymentsOrder.Delete,
            total: paymenSave[i]?.total,
          });
        } else if (paymentSave[i]?.payment?._id !== paymentCurrent[i]?.payment?._id) {
          arr.push({
            paymentId: payments[i]?.payment?._id,
            action: ActionPaymentsOrder.Create,
            total: payments[i]?.total,
            code: payments[i]?.code,
          });
        }
      }
    } else {
      for (let i = 0; i < payments?.length; i++) {
        if (paymentCurrent[i]?.payment?._id === paymentSave[i]?.payment?._id) {
          arr.push({
            paymentId: payments[i]?.payment?._id,
            action: ActionPaymentsOrder.Update,
            total: payments[i]?.total,
            code: payments[i]?.code,
          });
          console.log(1);
        } else if (paymentCurrent.length > paymentSave?.length) {
          if (
            paymentCurrent[i + 1]?.payment?._id === paymentSave[i]?.payment?._id &&
            paymentSave[i] !== undefined
          ) {
            arr.push({
              paymentId: paymentCurrent[i + 1]?.payment?._id,
              action: ActionPaymentsOrder.Update,
              total: paymentCurrent[i + 1]?.total,
              code: paymentCurrent[i + 1]?.code,
            });
          } else if (paymentCurrent[i]?.payment?._id !== paymentSave[i]?.payment?._id) {
            if (paymentSave?.length > 0) {
              const payFound = paymentCurrent.find(
                (payment) => payment.payment._id !== paymentSave[i]?.payment?._id,
              );
              arr.push({
                paymentId: payFound?.payment?._id, // paymentCurrent[i]?.payment?._id,
                action: ActionPaymentsOrder.Create,
                total: payFound?.total, // paymentCurrent[i]?.total,
                code: payFound?.code, //paymentCurrent[i]?.code,
              });
            } else {
              arr.push({
                paymentId: paymentCurrent[i]?.payment?._id,
                action: ActionPaymentsOrder.Create,
                total: paymentCurrent[i]?.total,
                code: paymentCurrent[i]?.code,
              });
            }
          }
        } else if (paymentCurrent[i]?.payment?._id !== paymentSave[i]?.payment?._id) {
          arr.push({
            paymentId: paymentCurrent[i]?.payment?._id,
            action: ActionPaymentsOrder.Create,
            total: paymentCurrent[i]?.total,
            code: paymentCurrent[i]?.code,
          });
        }
        if (paymentCurrent[i]?.payment?._id !== paymentSave[i]?.payment?._id) {
          if (paymentSave.includes(paymentCurrent[i])) {
            if (paymentSave?.[i]?.payment?._id)
              arr.push({
                paymentId: paymentSave[i]?.payment?._id,
                action: ActionPaymentsOrder.Update,
                total: paymentCurrent[i + 1]?.total,
                code: paymentSave[i]?.code,
              });
            break;
          }
        }
      }
    }

    return arr;
  };

  const onFinish = async () => {
    try {
      const responsePayments = await addPayments({
        variables: {
          input: {
            orderId: id || '',
            payments: savePayments(),
          },
        },
      });
      if (responsePayments?.data?.addPaymentsOrder) {
        setLoading(true);
        const response: any = await editOrder({
          status: StatusOrder.Closed,
        });

        setLoading(false);
        if (response?.order?.number !== undefined) {
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
            shopId: initialState?.currentUser?.shop?._id,
          },
        },
      });
    } catch (error: any) {
      showError(error?.message);
    }
  }, []);

  useEffect(() => {
    if (id) {
      getOrder({
        variables: {
          id,
        },
      });
    }
  }, [id]);

  useEffect(() => {
    if (paymentsSave?.length > 0) {
      setPayments(paymentsSave);
    }
  }, [paymentsSave]);

  const paymentsSort: any[] = [];

  data?.payments?.docs.forEach((payment) => {
    if (payment.type === TypePayment.Cash) {
      paymentsSort[0] = payment;
    }
    if (payment.type === TypePayment.Bank) {
      paymentsSort[1] = payment;
    }
    if (payment.type === TypePayment.Bonus) {
      paymentsSort[2] = payment;
    }
    if (payment.type === TypePayment.Credit) {
      paymentsSort[3] = payment;
    }
    if (
      paymentsSort[3]?.type === TypePayment.Credit &&
      paymentsSort[0]?.type === TypePayment.Cash &&
      payment.type !== TypePayment.Bank &&
      payment.type !== TypePayment.Bonus &&
      payment.type !== TypePayment.Credit &&
      payment.type !== TypePayment.Cash
    ) {
      paymentsSort.push(payment);
    }
  });

  return (
    <Modal
      centered
      open={visible}
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
            {paymentsSort
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
