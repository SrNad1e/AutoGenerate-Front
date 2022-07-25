/* eslint-disable react-hooks/exhaustive-deps */
import SelectPayment from '@/components/SelectPayment';
import { Input, message as messages } from 'antd';
import type { Order, PaymentOrder, PaymentsOrderInput } from '@/graphql/graphql';
import { ActionPaymentsOrder, TypePayment } from '@/graphql/graphql';
import { useAddPaymentsOrder } from '@/hooks/order.hooks';
import {
  BankOutlined,
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
import moment from 'moment';
import numeral from 'numeral';
import { useEffect, useState } from 'react';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';

import styles from '../styles';
import { useForm } from 'antd/lib/form/Form';
import { useGetPayments } from '@/hooks/payment.hooks';

const { Text } = Typography;
const FormItem = Form.Item;

type Props = {
  orderData: Order;
};

const Payments = ({ orderData }: Props) => {
  const [visiblePayment, setVisiblePayment] = useState(false);
  const [canEditTotal, setCanEditTotal] = useState(false);
  const [editPayments, setEditPayments] = useState<PaymentsOrderInput[]>([]);
  const [addPayments, setAddPayments] = useState<PaymentOrder[]>([...orderData?.payments]);
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [visibleField, setVisibleField] = useState(false);
  const [isCoupon, setIsCoupon] = useState(false);
  const [editingKey, setEditingKey] = useState('');

  const [addPayment, paramsAddPayment] = useAddPaymentsOrder();
  const [getPayments, { data }] = useGetPayments();

  const [form] = useForm();

  const isEditing = (detail: PaymentOrder) => detail?.payment?._id === editingKey;

  const edit = (detail: PaymentOrder) => {
    setEditingKey(detail.payment._id);
    setCanEditTotal(canEditTotal ? false : true);
  };

  const total = orderData?.summary?.total || 0;

  const totalPaid = orderData?.summary?.totalPaid || 0;

  const balance = total - totalPaid;

  const change = totalPaid - total;

  const couponId = data?.payments.docs.filter((payment) => payment?.name === 'Bono');

  //TODO: Cuando se seleccione el medio de pago credito, banco setear el total del saldo

  //TODO: programar funcionalidada para confirmar pagos

  //TODO: Programar medio de pago bono

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

  const onSelectPayment = (e: string) => {
    if (e === couponId[0]?._id) {
      setIsCoupon(true);
      setVisibleField(false);
    } else if (e && e !== couponId[0]?._id) {
      setIsCoupon(false);
      setVisibleField(true);
    } else {
      setVisibleField(false);
      setIsCoupon(false);
    }
  };

  //TODO: Programar funcionalidad para los botones de guardar pagos y reversar pagos en todo caso de que sea necesario hacerlo en el paso extra
  /**
   * @description funcion usada para guardar los detalles de los pagos en el estado
   */
  const onAddPayment = () => {
    const values = form.getFieldsValue();
    const payment: PaymentOrder = {
      action: ActionPaymentsOrder.Update,
      total: values.total || 0,
      createdAt: orderData?.createdAt,
      updatedAt: orderData?.updatedAt,
      payment: {
        _id: values.paymentId || '',
        name: '',
        type: '',
      },
    };
    if (values.paymentId === '629fc27ee4251f089ecd275b') {
      payment.payment.name = 'Efectivo';
      payment.payment.type = TypePayment.Cash;
    } else if (values.paymentId === '629fc27ee4251f089ecd275d') {
      payment.payment.name = 'Bancolombia';
      payment.payment.type = TypePayment.Bank;
    } else if (values.paymentId === '629fc27ee4251f089ecd275c') {
      payment.payment.name = 'Crédito';
      payment.payment.type = TypePayment.Credit;
    }

    if (values.total && values.total > 0) {
      for (let i = -1; i < addPayments.length; i++) {
        if (values.total && values.paymentId === addPayments[i]?.payment._id) {
          addPayments[i].total += values.total;
          setAddPayments([...addPayments]);
          break;
        }
        if (values.total && values.paymentId !== addPayments[i]?.payment._id) {
          if (values.paymentId === addPayments[i]?.payment._id) {
            addPayments[i].total += values.total;
            setAddPayments([...addPayments]);
          } else if (values.paymentId !== addPayments[i]?.payment._id) {
            setAddPayments([...addPayments, payment]);
          } else {
            console.log('Error');
          }
        }
      }
    } else {
      console.log('Cantidad no puede estar en 0');
    }
  };

  const deleteDetailPayment = (arrComparison: PaymentOrder[]) => {
    for (let index = 0; index < arrComparison?.length; index++) {
      const newPayments = addPayments.filter(
        (pay) => pay?.payment?._id !== arrComparison[index]?.payment?._id,
      );
      if (newPayments[index]?.payment?._id !== arrComparison[index]?.payment?._id) {
        setAddPayments([...newPayments]);
      }
    }
  };

  const updatePayment = async () => {
    try {
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
      if (response?.data) {
        alertSuccess('Pago actualizado correctamente');
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /* const deletePayment = async (paymentId: string) => {
    try {
      const response = await addPayment({
        variables: {
          input: {
            orderId: orderData?._id,
            payments: [
              {
                action: ActionPaymentsOrder.Delete,
                paymentId: paymentId,
                total: 1,
              },
            ],
          },
        },
      });
      if (response?.data) {
        alertSuccess('Pago eliminado correctamente');
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };*/

  const createPayment = async () => {
    const values = await form.validateFields();
    try {
      const response = await addPayment({
        variables: {
          input: {
            orderId: orderData?._id,
            payments: [
              {
                action: ActionPaymentsOrder.Create,
                paymentId: values.paymentId,
                total: values.total,
              },
            ],
          },
        },
      });
      if (response?.data) {
        alertSuccess('Pago agregado correctamente');
      }
    } catch (error: any) {
      showError(error?.message);
    }
  };

  /**
   * @description funcion usada para guardar los detalles de los pagos en el estado
   * @param totalPayment total ingresado
   * @param paymentId identificador del pago al cual se le cambiara el total
   */
  const onChangeTotalPayment = (totalPayment?: number, paymentId?: string) => {
    const payment: PaymentsOrderInput = {
      action: ActionPaymentsOrder.Update,
      total: totalPayment || 0,
      paymentId: paymentId || '',
    };

    if (totalPayment && totalPayment > 0) {
      for (let i = -1; i < editPayments.length; i++) {
        if (totalPayment && paymentId === editPayments[i]?.paymentId) {
          editPayments[i].total = totalPayment;
          setEditPayments([...editPayments]);
          break;
        }
        if (totalPayment && paymentId !== editPayments[i]?.paymentId) {
          if (paymentId === editPayments[i]?.paymentId) {
            editPayments[i].total = totalPayment;
            setEditPayments([...editPayments]);
          } else if (paymentId !== editPayments[i]?.paymentId) {
            setEditPayments([...editPayments, payment]);
          } else {
            showError('Error');
          }
        }
      }
    } else {
      alertWarning('Cantidad no puede estar en 0');
    }
  };

  useEffect(() => {
    getPayments({
      variables: {
        input: {},
      },
    });
  }, []);

  useEffect(() => {
    console.log(addPayments);
  }, [addPayments]);

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
            payment?.payment?.type === TypePayment.Bonus ||
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
        const detailsPayment = detail?.payment;
        const editable = isEditing(detail);

        return editable ? (
          <InputNumber
            min={0}
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
            controls={false}
            defaultValue={numeral(detail?.total).format('$ 0,0')}
            onChange={(e) => onChangeTotalPayment(e, detailsPayment?._id)}
          />
        ) : (
          numeral(detail?.total).format('$ 0,0')
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
            <Tooltip title="Confirmar Pago" placement="topLeft">
              <Button onClick={() => {}} type="primary" icon={<DollarCircleOutlined />} />
            </Tooltip>
            <Tooltip title={editable ? 'Guardar Valor' : 'Editar Valor'} placement="topLeft">
              <Button
                onClick={editable ? () => updatePayment() : () => edit(detail)}
                type="primary"
                ghost
                icon={editable ? <SaveOutlined /> : <EditOutlined />}
              />
            </Tooltip>
            <Tooltip title="Eliminar">
              <Button
                danger
                type="primary"
                loading={paramsAddPayment?.loading}
                onClick={() => deleteDetailPayment(addPayments)}
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
              <Button style={styles.inputBorder} type="primary" icon={<SaveOutlined />}>
                Guardar Pagos
              </Button>
              <Button style={styles.inputBorder} type="primary" icon={<RetweetOutlined />}>
                Reversar Pagos
              </Button>
              <Button
                style={styles.inputBorder}
                onClick={() => setVisiblePayment(visiblePayment ? false : true)}
                type="primary"
                icon={visiblePayment ? <MinusOutlined /> : <PlusOutlined />}
              >
                Agregar Pago
              </Button>
            </Space>
          </Col>
          <Col span={12}>
            {visiblePayment && (
              <Form form={form}>
                <FormItem label="Medio de Pago" name="paymentId" required>
                  <SelectPayment onChange={(e) => onSelectPayment(e)} disabled={false} />
                </FormItem>
                {visibleField && (
                  <>
                    <FormItem label="Valor" name="total" required>
                      <InputNumber
                        min={1}
                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                        controls={false}
                      />
                    </FormItem>
                    <Divider type="vertical" />
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => onAddPayment()} />
                  </>
                )}
                {isCoupon && (
                  <>
                    <FormItem label="Código" name="code">
                      <Input />
                    </FormItem>
                    <Divider type="vertical" />
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => createPayment()}
                    />
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
          <Col span={12}>{numeral(0).format('$ 0,0')}</Col>
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
      <Divider>Pagos</Divider>
      <Table
        bordered
        rowKey="payment"
        columns={column}
        dataSource={addPayments}
        scroll={{ x: 'auto' }}
        footer={footerTable}
        pagination={false}
        sortDirections={['descend', 'ascend']}
      />
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </>
  );
};

export default Payments;
