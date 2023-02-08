/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Input, message as messages } from 'antd';
import {
  BankOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  DollarCircleOutlined,
  EditOutlined,
  MinusOutlined,
  PlusOutlined,
  RetweetOutlined,
  SaveOutlined,
  TagOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  Form,
  InputNumber,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import { useForm } from 'antd/lib/form/Form';
import moment from 'moment';
import numeral from 'numeral';
import { useEffect, useState } from 'react';
import { useGetPayments } from '@/hooks/payment.hooks';
import { useModel } from 'umi';
import type { Credit, Order, PaymentOrder, PaymentsOrderInput } from '@/graphql/graphql';
import { StatusCoupon } from '@/graphql/graphql';
import { StatusWeb } from '@/graphql/graphql';
import { StatusOrder, StatusOrderDetail } from '@/graphql/graphql';
import { ActionPaymentsOrder, TypePayment } from '@/graphql/graphql';
import { useAddPaymentsOrder, useConfirmPaymentOrder, useUpdateOrder } from '@/hooks/order.hooks';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import SelectPayment from '@/components/SelectPayment';

import styles from '../styles';
import './style.less';
import { useGetCoupon } from '@/hooks/coupon.hooks';

const { Text } = Typography;
const FormItem = Form.Item;

type Props = {
  orderData: Order;
  tabKey?: string;
  creditData?: Credit;
};

const Payments = ({ orderData, tabKey, creditData }: Props) => {
  const [visiblePayment, setVisiblePayment] = useState(false);
  const [canEditTotal, setCanEditTotal] = useState(false);
  const [editPayments, setEditPayments] = useState<PaymentsOrderInput[]>([]);
  const [addPayments, setAddPayments] = useState<PaymentOrder[]>([]);
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [productsDelete, setProductsDelete] = useState([]);
  const [visibleField, setVisibleField] = useState(false);
  const [isCoupon, setIsCoupon] = useState(false);
  const [editingKey, setEditingKey] = useState('');
  const [paymentBankTotal, setPaymentBankTotal] = useState(0);
  const [isBonus, setIsBonus] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);

  const [addPayment, paramsAddPayment] = useAddPaymentsOrder();
  const [getPayments, { data, loading }] = useGetPayments();
  const [confirmPayment, paramsConfirmPayment] = useConfirmPaymentOrder();
  const [updateOrder, paramsUpdateOrder] = useUpdateOrder();
  const [getCoupon, paramsGetCoupon] = useGetCoupon();

  const [form] = useForm();

  const { initialState } = useModel('@@initialState');

  const total = orderData?.summary?.total || 0;
  const totalPaid = orderData?.summary?.totalPaid || 0;
  const balance = total - totalPaid;
  const change = totalPaid - total;
  const couponId = data?.payments?.docs.filter((payment) => payment?.name === 'Bono');
  const bankId = data?.payments?.docs.filter((payment) => payment?.name === 'Bancolombia');
  const cashId = data?.payments?.docs.filter((payment) => payment?.name === 'Efectivo');

  /**
   * @description funcion usada para identificar el medio de pago que se esta editando
   * @param detail identificador del pago que se quiere editar
   * @returns retorna un boolean
   */
  const isEditing = (detail: PaymentOrder) => detail?.payment?._id === editingKey;

  /**
   * @description funcion usada para seleccionar el medio de pago que se quiere editar
   * @param detail identificador del pago que se quiere editar
   */
  const edit = (detail: PaymentOrder) => {
    setEditingKey(detail?.payment?._id);
    setCanEditTotal(canEditTotal ? false : true);
  };

  /**
   * @description funcion usada para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const showError = (message: string) => {
    setAlertInformation({
      message,
      type: 'warning',
      visible: true,
    });
  };

  /**
   * @description se encarga de cerrar la alerta informativa
   */
  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  /**
   *@description funcion usada para mostrar mensaje de éxito
   * @param mensaje mensaje a mostrar
   */
  const alertSuccess = (mensaje: string) => {
    messages.success({
      content: mensaje,
    });
  };

  /**
   *@description funcion usada para mostrar mensaje de éxito
   * @param mensaje mensaje a mostrar
   */
  const alertWarning = (mensaje: string) => {
    messages.warning({
      content: mensaje,
    });
  };

  /**
   * @description funcion usada para cambiar el estado del pedido a pago confimado
   */
  const onPayOrder = async () => {
    try {
      await updateOrder({
        variables: {
          id: orderData?._id,
          input: {
            statusWeb: StatusWeb.PaymentConfirmed,
          },
        },
      });
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description funcion usada para reversar pagos
   * @param paymentId identificador del pago a reversar
   */
  const reversePaymentOrder = async (paymentId: string) => {
    for (let i = 0; i < addPayments.length; i++) {
      if (paymentId === addPayments[i].payment._id) {
        addPayments[i].status = StatusOrderDetail.New;
      }
    }
    try {
      confirmPayment({
        variables: {
          input: {
            orderId: orderData._id,
            payments: [
              {
                paymentId: paymentId,
                status: StatusOrderDetail.New,
              },
            ],
          },
        },
      });
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description funcion usada para confirmar el medio de pago en el pedido
   * @param paymentId identificador del pago a confirmar
   */
  const confirmPaymentOrder = (paymentId: string) => {
    for (let i = 0; i < addPayments.length; i++) {
      if (paymentId === addPayments[i].payment._id) {
        addPayments[i].status = StatusOrderDetail.Confirmed;
      }
    }
    try {
      if (paymentId === cashId[0]?._id) {
        confirmPayment({
          variables: {
            input: {
              orderId: orderData._id,
              payments: [
                {
                  paymentId: paymentId,
                  status: StatusOrderDetail.Confirmed,
                },
              ],
            },
          },
        });
      } else {
        confirmPayment({
          variables: {
            input: {
              orderId: orderData._id,
              payments: [
                {
                  paymentId: paymentId,
                  status: StatusOrderDetail.Confirmed,
                },
              ],
            },
          },
        });
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description funcion usada para controlar el cambio de medio de pago
   * @param e Id del medio de pago seleccionado
   */
  const onSelectPayment = (e: string) => {
    if (bankId && e === bankId[0]?._id) {
      setPaymentBankTotal(balance);
    } else {
      form.setFieldsValue({
        total: undefined,
      });
      setPaymentBankTotal(0);
    }
    if (couponId && e === couponId[0]?._id) {
      setIsCoupon(true);
      setVisibleField(false);
    } else if (couponId && e && e !== couponId[0]?._id) {
      setIsCoupon(false);
      setVisibleField(true);
    } else {
      setVisibleField(false);
      setIsCoupon(false);
    }
  };

  const onAddCoupon = async () => {
    const values = await form.validateFields();
    try {
      const response = await getCoupon({
        variables: {
          input: {
            code: values?.code,
          },
        },
      });
      if (response?.data?.coupon) {
        if (moment().isAfter(response?.data?.coupon?.expiration)) {
          showError('El bono se encuentra vencido');
        } else if (response?.data?.coupon?.status === StatusCoupon.Redeemed) {
          showError('El bono ya se redimió');
        } else if (response?.data?.coupon?.status === StatusCoupon.Inactive) {
          showError('El bono se encuentra inactivo');
        } else {
          const payment: PaymentOrder = {
            action: ActionPaymentsOrder.Update,
            total: response?.data?.coupon?.value || 0,
            createdAt: orderData?.createdAt,
            updatedAt: orderData?.updatedAt,
            status: StatusOrderDetail.New,
            code: response?.data?.coupon?.code,
            payment: {
              _id: values.paymentId || '',
              name: 'Bono',
              type: TypePayment.Bonus,
            },
          };
          setAddPayments([...addPayments, payment]);
          form.resetFields();
          setVisiblePayment(false);
        }
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description funcion usada para actualizar los medios de pago
   */
  const updatePayment = async () => {
    const values = addPayments.map((i) => ({
      action: ActionPaymentsOrder.Update,
      paymentId: i.payment._id,
      total: i.total,
    }));
    try {
      if (orderData?.payments) {
        for (let index = 0; index < orderData?.payments?.length; index++) {
          if (
            orderData?.payments[index].payment._id === values[index]?.paymentId &&
            orderData?.payments[index].total !== values[index].total &&
            editPayments[index]?.paymentId !== values[index]?.paymentId
          ) {
            await setEditPayments([values[index]]);
            break;
          }
        }

        if (editPayments.length > 0) {
          const response = await addPayment({
            variables: {
              input: {
                orderId: orderData?._id,
                payments: editPayments,
              },
            },
          });
          setCanEditTotal(canEditTotal ? false : true);
          setEditingKey('');
          setVisiblePayment(false);
          if (response?.data) {
            alertSuccess('Pago actualizado correctamente');
            setEditPayments([]);
          }
        } else {
          setCanEditTotal(canEditTotal ? false : true);
          setEditingKey('');
        }
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description funcion usada para eliminar los medios de pago del estado
   * @param arrComparison array con los medios de pagos que estan en el estado
   * @param paymentId Identificador del pago a eliminar del estado
   */
  const deleteDetailPayment = (arrComparison: PaymentOrder[], paymentId: string) => {
    try {
      const productDelete = {
        action: ActionPaymentsOrder.Delete,
        paymentId: paymentId,
        total: 1,
      };
      for (let index = 0; index < arrComparison?.length; index++) {
        const newPayments = addPayments.filter((pay) => pay?.payment?._id !== paymentId);
        if (newPayments.length === 0) {
          alertWarning('El pedido no puede quedar sin medios de pago');
          break;
        }
        setProductsDelete([...productsDelete, productDelete]);
        setAddPayments([...newPayments]);
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description funcion usada para agregar los medios de pago al pedido
   */
  const createNewPaymentMethod = async () => {
    const bonoId = '629fc27ee4251f089ecd275e';

    const values = addPayments.map((i) => {
      if (i.payment._id === bonoId) {
        return {
          action: ActionPaymentsOrder.Create,
          paymentId: i.payment._id,
          total: i.total,
          code: i.code,
        };
      } else {
        return { action: ActionPaymentsOrder.Create, paymentId: i.payment._id, total: i.total };
      }
    });
    try {
      if (orderData.payments) {
        for (let index = 0; index < addPayments.length; index++) {
          if (orderData?.payments[index]?.payment?._id === addPayments[index]?.payment?._id) {
            if (editPayments.length > 0) {
              updatePayment();
            }
          }
          if (orderData?.payments[index]?.payment?._id !== values[index]?.paymentId) {
            const filterValues = orderData?.payments.find((item) => {
              if (item.payment._id === values[index]?.paymentId) {
                return values[index];
              }
              return;
            });
            if (filterValues?.payment._id !== values[index].paymentId) {
              const response = await addPayment({
                variables: {
                  input: {
                    orderId: orderData?._id,
                    payments: [values[index], ...productsDelete],
                  },
                },
              });
              if (response?.data) {
                alertSuccess('Pago agregado correctamente');
                if (productsDelete.length > 0) {
                  alertSuccess('Pago eliminado correctamente');
                }
                form.resetFields();
                setVisiblePayment(false);
                setProductsDelete([]);
              }
            } else {
              if (productsDelete.length > 0) {
                const response = await addPayment({
                  variables: {
                    input: {
                      orderId: orderData?._id,
                      payments: [...productsDelete],
                    },
                  },
                });
                if (response.data) {
                  alertSuccess('Producto eliminado correctamente');
                  setProductsDelete([]);
                }
              }
            }
          } else {
            if (productsDelete.length > 0) {
              const response = await addPayment({
                variables: {
                  input: {
                    orderId: orderData?._id,
                    payments: [...productsDelete],
                  },
                },
              });
              if (response.data) {
                alertSuccess('Producto eliminado correctamente');
                setProductsDelete([]);
              }
            }
          }
        }
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description funcion usada para actualizar la cantidad del abonado de los medios de pago en el estado
   * @param totalPayment cantidad ingresada para actualizar
   * @param paymentId identificador del medio de pago
   */
  const onChangeTotalDetailPayment = async (
    totalPayment: number,
    paymentId?: string,
    update?: boolean,
  ) => {
    try {
      const values = addPayments.map((i) => ({
        action: ActionPaymentsOrder.Update,
        paymentId: i.payment._id,
        total: i.total,
      }));
      if (orderData?.payments) {
        for (let index = 0; index < addPayments.length; index++) {
          if (paymentId === values[index]?.paymentId) {
            if (
              editPayments[index]?.paymentId === paymentId &&
              editPayments.includes(editPayments[index])
            ) {
              editPayments[index].total = totalPayment;
              setEditPayments([...editPayments]);
            }
            if (!editPayments.includes(values[index]) && editPayments.length > 0) {
              values[index].total = totalPayment;
              const unicos = editPayments.filter(
                (item) => item.paymentId !== values[index]?.paymentId,
              );
              setEditPayments([values[index], ...unicos]);
            }
            if (editPayments.includes(values[index]) && editPayments.length > 0) {
              const indice = editPayments.indexOf(values[index]);
              const unicos = editPayments.filter(
                (item) => item.paymentId !== editPayments[indice]?.paymentId,
              );
              setEditPayments([values[index], ...unicos]);
            }
            if (editPayments.length === 0) {
              values[index].total = totalPayment;
              await setEditPayments([values[index]]);
              if (update) {
                setIsUpdate(true);
              }
            }
          }
        }
        if (totalPayment && totalPayment > 0) {
          for (let i = -1; i < addPayments.length; i++) {
            if (totalPayment && paymentId === addPayments[i]?.payment?._id) {
              addPayments[i].total = totalPayment;
              setAddPayments([...addPayments]);
              break;
            }
            if (totalPayment && paymentId !== addPayments[i]?.payment?._id) {
              if (paymentId !== addPayments[i]?.payment?._id) {
                setAddPayments([...addPayments]);
              }
            }
          }
        } else {
          alertWarning('Cantidad no puede estar en 0');
        }
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description funcion usada para guardar los detalles de los pagos en el estado
   */
  const onAddPayment = async () => {
    const values = await form.validateFields();
    try {
      const payment: PaymentOrder = {
        action: ActionPaymentsOrder.Update,
        total: values.total || 0,
        createdAt: orderData?.createdAt,
        updatedAt: orderData?.updatedAt,
        status: StatusOrderDetail.New,
        payment: {
          _id: values.paymentId || '',
          name: '',
          type: '',
        },
      };
      if (values?.paymentId === '629fc27ee4251f089ecd275b') {
        payment.payment.name = 'Efectivo';
        payment.payment.type = TypePayment.Cash;
      } else if (values?.paymentId === '629fc27ee4251f089ecd275d') {
        payment.payment.name = 'Bancolombia';
        payment.payment.type = TypePayment.Bank;
      } else if (values?.paymentId === '629fc27ee4251f089ecd275c') {
        payment.payment.name = 'Crédito';
        payment.payment.type = TypePayment.Credit;
      } else if (values?.paymentId === '629fc27ee4251f089ecd275e') {
        payment.payment.name = 'Bono';
        payment.payment.type = TypePayment.Bonus;
      }
      if (!isNaN(values.total)) {
        if (values.total && values.total > 0) {
          for (let i = 0; i < addPayments.length; i++) {
            if (values.total && values?.paymentId === addPayments[i]?.payment._id) {
              await onChangeTotalDetailPayment(
                (addPayments[i].total += values.total),
                addPayments[i]?.payment._id,
                true,
              );
              form.resetFields();
              setVisiblePayment(false);
              break;
            }
            if (values.total && values?.paymentId !== addPayments[i]?.payment._id) {
              if (values?.paymentId === addPayments[i]?.payment._id) {
                addPayments[i].total += values.total;
                setAddPayments([...addPayments]);
                form.resetFields();
                setVisiblePayment(false);
              } else if (values?.paymentId !== addPayments[i]?.payment._id) {
                payment.total = Math.floor(payment.total);
                setAddPayments([...addPayments, payment]);
                form.resetFields();
                setVisiblePayment(false);
              } else {
                showError('Error');
              }
            }
          }
        } else {
          showError('Cantidad no puede estar en 0');
        }
      } else {
        alertWarning('El valor ingresado no es valido');
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  const typePaymetCash = orderData?.payments?.find((i) => i?.payment?.type === TypePayment.Cash);

  const validateAllPayConfirmed = () => {
    try {
      if (orderData?.payments) {
        let countConfirmed = 0;
        for (let index = 0; index < orderData?.payments?.length; index++) {
          if (
            orderData?.payments[index]?.status === StatusOrderDetail.Confirmed &&
            orderData?.payments[index]?.payment?.type !== TypePayment.Cash
          ) {
            countConfirmed++;
          }
        }
        if (typePaymetCash !== undefined) {
          if (countConfirmed === orderData?.payments?.length - 1) {
            return false;
          } else {
            return true;
          }
        } else {
          if (countConfirmed === orderData?.payments?.length) {
            return false;
          } else {
            return true;
          }
        }
      }
    } catch (error: any) {
      showError(error?.message);
    }
    return;
  };

  useEffect(() => {
    getPayments({
      variables: {
        input: {},
      },
    });
  }, []);

  useEffect(() => {
    if (paymentBankTotal > 0) {
      form.setFieldsValue({ total: paymentBankTotal });
    }
  }, [paymentBankTotal]);

  useEffect(() => {
    try {
      if (orderData !== undefined) {
        setAddPayments(
          orderData?.payments?.map((i) => ({
            total: i?.total,
            updatedAt: i?.updatedAt,
            createdAt: i?.createdAt,
            status: i?.status,
            payment: {
              _id: i?.payment?._id,
              name: i?.payment?.name,
              type: i?.payment?.type,
            },
          })),
        );
      }
    } catch (error: any) {
      showError(error?.message);
    }
  }, [orderData]);

  useEffect(() => {
    if (addPayments.find((payment) => payment.payment._id === '629fc27ee4251f089ecd275e')) {
      setIsBonus(false);
    } else {
      setIsBonus(true);
    }
  }, [addPayments]);

  useEffect(() => {
    if (isUpdate) {
      updatePayment();
    }
  }, [isUpdate]);

  const column: ColumnsType<PaymentOrder> = [
    {
      title: 'Registro',
      dataIndex: 'payment',
      render: (_, detail) => (
        <Space direction="vertical">
          <Tag icon={<UserOutlined />} style={styles.tagStyle}>
            {orderData?.user?.name}
          </Tag>
          <Text strong>
            Registro:{' '}
            <Tag style={styles.tagStyle}>{moment(detail?.createdAt).format(FORMAT_DATE)}</Tag>
          </Text>
          <Text strong>
            Actualizado:{' '}
            <Tag style={styles.tagStyle}>{moment(detail?.updatedAt).format(FORMAT_DATE)}</Tag>
          </Text>
        </Space>
      ),
    },
    {
      title: 'Forma de pago',
      dataIndex: 'payment',
      align: 'center',
      render: (_, payment) => (
        <>
          {payment?.payment?.name}{' '}
          {(payment?.payment?.type === TypePayment.Cash && (
            <DollarCircleOutlined style={styles.colorPrimary} />
          )) ||
            (payment?.payment?.type === TypePayment.Bank && (
              <BankOutlined style={styles.colorPrimary} />
            )) ||
            (payment?.payment?.type === TypePayment.Bonus && (
              <TagOutlined style={styles.colorPrimary} />
            )) ||
            (payment?.payment?.type === TypePayment.Credit && (
              <TagOutlined style={styles.colorPrimary} />
            ))}
        </>
      ),
    },
    {
      title: totalPaid > total ? ' Cambio:' : 'Saldo',
      dataIndex: 'payment',
      width: 100,
      align: 'center',
      render: () => numeral(totalPaid > total ? change : balance).format('$ 0,0'),
    },
    {
      title: 'Abonado',
      dataIndex: 'payment',
      align: 'center',
      render: (_, detail) => {
        const editable = isEditing(detail);

        return editable ? (
          <Row>
            <Col span={4} style={{ bottom: 2 }}>
              <Tooltip
                title={
                  detail.status === StatusOrderDetail.New ? 'Pago Sin Confirmar' : 'Pago Confirmado'
                }
              >
                <Badge
                  title={
                    detail.status === StatusOrderDetail.New
                      ? 'Pago Sin Confirmar'
                      : 'Pago Confirmado'
                  }
                  count={
                    detail.status === StatusOrderDetail.New ? (
                      <ClockCircleOutlined style={{ color: '#f5222d' }} />
                    ) : (
                      <CheckCircleOutlined style={{ color: 'green' }} />
                    )
                  }
                />{' '}
              </Tooltip>
            </Col>
            <Col span={18}>
              <InputNumber
                min={0}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                controls={false}
                defaultValue={numeral(detail?.total).format('$ 0,0')}
                onChange={(e) => onChangeTotalDetailPayment(e, detail?.payment?._id)}
              />
            </Col>
          </Row>
        ) : (
          <Row>
            <Col span={4} style={{ bottom: 2 }}>
              <Tooltip
                title={
                  detail.status === StatusOrderDetail.New ? 'Pago Sin Confirmar' : 'Pago Confirmado'
                }
              >
                <Badge
                  count={
                    detail.status === StatusOrderDetail.New ? (
                      <ClockCircleOutlined style={{ color: '#f5222d' }} />
                    ) : (
                      <CheckCircleOutlined style={{ color: 'green' }} />
                    )
                  }
                />
              </Tooltip>
            </Col>{' '}
            <Col span={18}> {numeral(detail?.total).format('$ 0,0')}</Col>
          </Row>
        );
      },
    },
    {
      title: 'Opciones',
      dataIndex: 'payment',
      fixed: 'right',
      align: 'center',
      render: (_, detail) => {
        const editable = isEditing(detail);

        return (
          <Space>
            {initialState?.currentUser?.role?.name === 'Administrador' && (
              <Tooltip title="Reversar Pago">
                <Button
                  disabled={
                    detail.status === StatusOrderDetail.New
                      ? true
                      : initialState?.currentUser?.role.name === 'Administrador'
                      ? false
                      : (tabKey === '4' && detail?.payment?.type !== TypePayment.Cash) ||
                        (tabKey === '1' && detail?.payment?.type === TypePayment.Cash) ||
                        orderData?.statusWeb === StatusWeb.Sent ||
                        orderData?.status === StatusOrder.Closed ||
                        orderData?.statusWeb === StatusWeb.Cancelled ||
                        orderData?.statusWeb === StatusWeb.PaymentConfirmed
                  }
                  loading={
                    paramsAddPayment?.loading ||
                    paramsConfirmPayment?.loading ||
                    paramsUpdateOrder?.loading ||
                    loading
                  }
                  style={styles.inputBorder}
                  icon={<RetweetOutlined />}
                  onClick={() => reversePaymentOrder(detail?.payment?._id)}
                />
              </Tooltip>
            )}
            <Tooltip title="Confirmar pago">
              <Button
                disabled={
                  detail?.status === StatusOrderDetail.Confirmed
                    ? true
                    : initialState?.currentUser?.role.name === 'Administrador'
                    ? false
                    : (tabKey === '4' && detail?.payment?.type !== TypePayment.Cash) ||
                      (tabKey === '1' && detail?.payment?.type === TypePayment.Cash) ||
                      balance > 0 ||
                      orderData?.statusWeb === StatusWeb.Sent ||
                      orderData?.status === StatusOrder.Closed ||
                      orderData?.statusWeb === StatusWeb.Cancelled ||
                      orderData?.statusWeb === StatusWeb.PaymentConfirmed
                }
                loading={
                  paramsAddPayment?.loading ||
                  paramsConfirmPayment?.loading ||
                  paramsUpdateOrder?.loading ||
                  loading
                }
                onClick={() => confirmPaymentOrder(detail?.payment?._id)}
                type="primary"
                icon={<DollarCircleOutlined />}
                style={styles.inputBorder}
              />
            </Tooltip>
            {detail?.payment?._id !== '629fc27ee4251f089ecd275e' && (
              <Tooltip title={editable ? 'Guardar Valor' : 'Editar Valor'} placement="topLeft">
                <Button
                  disabled={
                    initialState?.currentUser?.role.name === 'Administrador'
                      ? false
                      : (tabKey === '4' && detail?.payment?.type !== TypePayment.Cash) ||
                        (tabKey === '1' && detail?.payment?.type === TypePayment.Cash) ||
                        detail?.status === StatusOrderDetail.Confirmed ||
                        orderData?.statusWeb === StatusWeb.Sent ||
                        orderData?.status === StatusOrder.Closed ||
                        orderData?.statusWeb === StatusWeb.Cancelled ||
                        orderData?.statusWeb === StatusWeb.PaymentConfirmed
                  }
                  loading={
                    paramsAddPayment?.loading ||
                    paramsConfirmPayment?.loading ||
                    paramsUpdateOrder?.loading ||
                    loading
                  }
                  onClick={editable ? () => updatePayment() : () => edit(detail)}
                  type="primary"
                  ghost
                  icon={editable ? <SaveOutlined /> : <EditOutlined />}
                />
              </Tooltip>
            )}
            <Tooltip title="Eliminar">
              <Button
                disabled={
                  initialState?.currentUser?.role.name === 'Administrador'
                    ? false
                    : (tabKey === '4' && detail?.payment?.type !== TypePayment.Cash) ||
                      detail?.status === StatusOrderDetail.Confirmed ||
                      orderData?.statusWeb === StatusWeb.Sent ||
                      orderData?.status === StatusOrder.Closed ||
                      orderData?.statusWeb === StatusWeb.Cancelled ||
                      orderData?.statusWeb === StatusWeb.PaymentConfirmed
                }
                danger
                type="primary"
                loading={
                  paramsAddPayment?.loading ||
                  paramsConfirmPayment?.loading ||
                  paramsUpdateOrder?.loading ||
                  loading
                }
                onClick={() => deleteDetailPayment(addPayments, detail?.payment?._id)}
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  const footerTable = () => (
    <Row>
      <Col span={16}>
        <Row gutter={[0, 20]}>
          <Col span={24}>
            <Space size={20}>
              {tabKey !== '4' && (
                <Button
                  style={styles.inputBorder}
                  loading={
                    paramsAddPayment?.loading ||
                    paramsConfirmPayment?.loading ||
                    paramsUpdateOrder?.loading ||
                    loading ||
                    paramsGetCoupon?.loading
                  }
                  disabled={
                    initialState?.currentUser?.role.name === 'Administrador'
                      ? false
                      : orderData?.statusWeb === StatusWeb.PaymentConfirmed ||
                        orderData?.statusWeb === StatusWeb.Sent ||
                        orderData?.status === StatusOrder.Closed ||
                        orderData?.statusWeb === StatusWeb.Cancelled
                  }
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={() => createNewPaymentMethod()}
                >
                  Guardar Pagos
                </Button>
              )}
              {tabKey !== '4' && (
                <Button
                  disabled={
                    initialState?.currentUser?.role.name === 'Administrador'
                      ? false
                      : balance === 0 ||
                        change > 0 ||
                        orderData?.statusWeb === StatusWeb.Sent ||
                        orderData?.status === StatusOrder.Closed ||
                        orderData?.statusWeb === StatusWeb.Cancelled
                  }
                  loading={
                    paramsAddPayment?.loading ||
                    paramsConfirmPayment?.loading ||
                    paramsUpdateOrder?.loading ||
                    loading ||
                    paramsGetCoupon?.loading
                  }
                  style={styles.inputBorder}
                  onClick={() => setVisiblePayment(visiblePayment ? false : true)}
                  type="primary"
                  icon={visiblePayment ? <MinusOutlined /> : <PlusOutlined />}
                >
                  Agregar Pago
                </Button>
              )}
              {tabKey !== '4' && (
                <Button
                  type="primary"
                  style={styles.buttonR}
                  icon={<CheckCircleOutlined />}
                  disabled={
                    initialState?.currentUser?.role.name === 'Administrador'
                      ? false
                      : balance > 0 ||
                        validateAllPayConfirmed() ||
                        orderData?.statusWeb === StatusWeb.Sent ||
                        orderData?.status === StatusOrder.Closed ||
                        orderData?.statusWeb === StatusWeb.Cancelled ||
                        orderData?.statusWeb === StatusWeb.PaymentConfirmed ||
                        orderData?.statusWeb === StatusWeb.Preparing ||
                        orderData?.statusWeb === StatusWeb.Delivered
                  }
                  onClick={() => onPayOrder()}
                  loading={
                    paramsAddPayment?.loading ||
                    paramsConfirmPayment?.loading ||
                    paramsUpdateOrder?.loading ||
                    loading ||
                    paramsGetCoupon?.loading
                  }
                >
                  Confirmar Medio de Pago
                </Button>
              )}
            </Space>
          </Col>
          <Col span={12}>
            {visiblePayment && tabKey !== '4' && (
              <Form form={form} layout="horizontal">
                <FormItem
                  label="Medio de Pago"
                  name="paymentId"
                  rules={[{ required: true, message: 'Este campo no puede estar vacío' }]}
                >
                  <SelectPayment
                    bonus={isBonus}
                    credit={creditData !== null}
                    onChange={(e) => onSelectPayment(e)}
                    disabled={false}
                  />
                </FormItem>
                {visibleField && (
                  <>
                    <FormItem
                      label="Valor"
                      name="total"
                      rules={[{ required: true, message: 'Este campo no puede estar vacío' }]}
                    >
                      <InputNumber
                        step={100}
                        autoFocus
                        min={1}
                        max={250000000}
                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                        controls={false}
                        addonAfter={
                          <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            disabled={
                              orderData?.statusWeb === StatusWeb.Sent ||
                              orderData?.status === StatusOrder.Closed ||
                              orderData?.statusWeb === StatusWeb.Cancelled
                            }
                            loading={
                              paramsAddPayment?.loading ||
                              paramsConfirmPayment?.loading ||
                              paramsUpdateOrder?.loading ||
                              loading ||
                              paramsGetCoupon?.loading
                            }
                            onClick={() => onAddPayment()}
                          />
                        }
                      />
                    </FormItem>
                  </>
                )}
                {isCoupon && (
                  <>
                    <FormItem
                      label="Código"
                      name="code"
                      rules={[{ required: true, message: 'Este campo no puede estar vacío' }]}
                    >
                      <Input
                        addonAfter={
                          <Button
                            loading={
                              paramsAddPayment?.loading ||
                              paramsConfirmPayment?.loading ||
                              paramsUpdateOrder?.loading ||
                              loading ||
                              paramsGetCoupon?.loading
                            }
                            disabled={
                              orderData?.statusWeb === StatusWeb.Sent ||
                              orderData?.status === StatusOrder.Closed ||
                              orderData?.statusWeb === StatusWeb.Cancelled
                            }
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => onAddCoupon()}
                          />
                        }
                      />
                    </FormItem>
                  </>
                )}
              </Form>
            )}
          </Col>
        </Row>
      </Col>
      <Col span={8} style={styles.textRight}>
        <Row>
          <Col span={12}>
            <Text strong>Subtotal</Text>
          </Col>
          <Col span={12}>{numeral(orderData?.summary?.subtotal).format('$ 0,0')}</Col>
          <Col span={12}>
            <Text strong>Descuento</Text>
          </Col>
          <Col span={12}>{numeral(orderData?.summary?.discount).format('$ 0,0')}</Col>
          <Col span={12}>
            <Text strong>Envío</Text>
          </Col>
          <Col span={12}>{numeral(orderData?.conveyorOrder?.value).format('$ 0,0')}</Col>
          <Col span={12}>
            <Text strong>Total</Text>
          </Col>
          <Col span={12}>{numeral(orderData?.summary?.total).format('$ 0,0')}</Col>
          <Col span={12}>
            <Text strong>Abonos</Text>
          </Col>
          <Col span={12}>{numeral(orderData?.summary?.totalPaid).format('$ 0,0')}</Col>
          <Col span={12}>
            <Text strong>{totalPaid > total ? ' Cambio:' : 'Saldo:'}</Text>
          </Col>
          <Col span={12}>{numeral(totalPaid > total ? change : balance).format('$ 0,0')}</Col>
        </Row>
      </Col>
    </Row>
  );

  return (
    <>
      <Divider>{tabKey === '4' ? 'Confirmar Efectivo' : 'Pagos'}</Divider>
      <Table
        bordered
        rowKey="payment"
        columns={column}
        dataSource={addPayments}
        scroll={{ x: 'auto' }}
        footer={footerTable}
        pagination={false}
        sortDirections={['descend', 'ascend']}
        loading={
          paramsAddPayment.loading ||
          paramsConfirmPayment.loading ||
          paramsUpdateOrder.loading ||
          loading
        }
      />
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </>
  );
};

export default Payments;
