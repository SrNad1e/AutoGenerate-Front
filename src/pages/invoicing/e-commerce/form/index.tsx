/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  ArrowLeftOutlined,
  CloseCircleOutlined,
  HomeOutlined,
  PhoneOutlined,
  PrinterOutlined,
  SendOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Affix,
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Popconfirm,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import moment from 'moment';
import numeral from 'numeral';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory, useModel } from 'umi';
import { useGetOrder, useUpdateOrder } from '@/hooks/order.hooks';
import type { Order } from '@/graphql/graphql';
import { StatusOrder, StatusOrderDetail } from '@/graphql/graphql';
import { useReactToPrint } from 'react-to-print';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import Tabs from '../components/Tabs';
import { StatusType } from '../e-commerce.data';
import ShippingLabel from '../reports/shippingLabel/TiketSent';
import OrderProduction from '../reports/order/Order';
import InvoicePrint from '../reports/ticket/Invoice';

import styles from './styles';

const { Text, Title } = Typography;
const { Grid } = Card;

const EcommerceForm = () => {
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [orderData, setOrderData] = useState<Partial<Order>>({});
  const [shippingLabelData, setShippingLabelData] = useState({});
  const [invoiceData, setInvoiceData] = useState({});

  const { id } = useParams<Partial<{ id: string }>>();

  const { initialState } = useModel('@@initialState');

  const history = useHistory();

  const reportRef = useRef(null);
  const reportRef1 = useRef(null);
  const reportRef2 = useRef(null);

  const [getOrder, paramsGetOrder] = useGetOrder();
  const [updateOrder, paramsUpdateOrder] = useUpdateOrder();

  const total = paramsGetOrder?.data?.orderId?.order?.summary?.total || 0;
  const totalPaid = paramsGetOrder?.data?.orderId.order.summary.totalPaid || 0;
  const balance = total - totalPaid;
  const change = totalPaid - total;

  const handlePrintInvoice = useReactToPrint({
    content: () => reportRef2.current,
  });
  const handlePrint = useReactToPrint({
    content: () => reportRef?.current,
  });
  const handlePrintShippingLabel = useReactToPrint({
    content: () => reportRef1?.current,
  });

  /**
   * @description se encarga de seleccionar la factura e imprime
   * @param record factura
   */
  const printInvoice = async (record: any) => {
    await setInvoiceData(record);
    handlePrintInvoice();
  };

  /**
   * @description se encarga de seleccionar el pedido e imprime
   * @param record pedido
   */
  const printOrder = async (record: Partial<Order>) => {
    await setOrderData(record);
    handlePrint();
  };

  /**
   * @description se encarga de seleccionar la etiqueta de envio e imprime
   * @param record etiqueta de envio
   */
  const printShippingLabel = async (record: any) => {
    await setShippingLabelData(record);
    handlePrintShippingLabel();
  };

  /**
   * @description se encarga de cerrar la alerta informativa
   */
  const closeAlertInformation = () => {
    setPropsAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  /**
   * @description funcion usada para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const showError = (message: string) => {
    setPropsAlertInformation({
      message: message,
      type: 'error',
      visible: true,
    });
  };

  /**
   * @description funcion usada para cambiar el estado del pedido a cancelado
   */
  const onCancelOrder = () => {
    try {
      updateOrder({
        variables: {
          id: paramsGetOrder.data?.orderId?.order?._id || '',
          input: {
            status: StatusOrder.Cancelled,
          },
        },
      });
    } catch (error: any) {
      showError(error.message);
    }
  };

  /**
   * @description funcion usada para obtener un pedido
   */
  const onSearchOrder = () => {
    try {
      getOrder({
        variables: {
          id: id || '',
        },
      });
    } catch (error: any) {
      showError(error.message);
    }
  };

  /**
   * @description funcion usada para deshabilitar el boton de enviado si no se han confirmado todos los pagos
   * @returns retorna un booleano
   */
  const disabledSentButton = () => {
    let countConfirmed = 0;
    if (paramsGetOrder?.data?.orderId?.order?.payments?.length) {
      for (let i = 0; i < paramsGetOrder?.data?.orderId?.order?.payments?.length; i++) {
        if (paramsGetOrder.data.orderId.order.payments[i].status === StatusOrderDetail.Confirmed) {
          countConfirmed++;
        }
      }
    }
    if (countConfirmed === paramsGetOrder?.data?.orderId?.order?.payments?.length) {
      return false;
    } else if (countConfirmed !== paramsGetOrder?.data?.orderId?.order?.payments?.length) {
      return true;
    }
    return;
  };

  /**
   * @description funcion usada para deshabilitar el boton de cancelado si se han confirmado todos los pagos
   * @returns retorna un booleano
   */
  const disabledCancelButton = () => {
    let countConfirmed = 0;
    if (paramsGetOrder?.data?.orderId?.order?.payments) {
      for (let index = 0; index < paramsGetOrder?.data?.orderId?.order?.payments?.length; index++) {
        if (
          paramsGetOrder?.data?.orderId?.order?.payments[index].status ===
          StatusOrderDetail.Confirmed
        ) {
          countConfirmed++;
        }
      }
    }
    if (countConfirmed === paramsGetOrder?.data?.orderId?.order?.payments?.length) {
      return true;
    } else if (countConfirmed !== paramsGetOrder?.data?.orderId?.order?.payments?.length) {
      return false;
    }
    return;
  };

  /**
   * @description funcion usada para cambiar el estado del pedido a enviado
   */
  const onSentOrder = () => {
    try {
      updateOrder({
        variables: {
          id: paramsGetOrder.data?.orderId?.order?._id || '',
          input: {
            status: StatusOrder.Sent,
          },
        },
      });
    } catch (error: any) {
      showError(error.message);
    }
  };

  const dateInitial = new Date(
    moment(paramsGetOrder?.data?.orderId?.order?.createdAt).format(FORMAT_DATE_API),
  );
  if (dateInitial.getTime() === 604800000) {
    onCancelOrder();
  }

  useEffect(() => {
    onSearchOrder();
  }, []);

  return (
    <PageContainer
      title={
        <Space align="center">
          {' '}
          <Tooltip title="Atrás">
            <Button
              type="primary"
              ghost
              icon={<ArrowLeftOutlined />}
              onClick={() => history.goBack()}
            />
          </Tooltip>
          <Divider type="vertical" />
          <> E-Commerce</>
        </Space>
      }
    >
      <Card
        title={<Title level={3}>Pedido #{paramsGetOrder?.data?.orderId?.order?.number}</Title>}
        bordered={false}
      >
        <Grid hoverable={false} style={styles.firstGrid}>
          <Row align="middle" justify="center" gutter={[0, 5]} style={styles.rowFGrid}>
            <Col>
              <Title level={4}>Información</Title>
            </Col>
            <Divider style={styles.noMargin} />
            <Col xs={24} md={8} lg={7} xl={12}>
              <Text strong style={styles.textSize}>
                Estado:
              </Text>
            </Col>
            <Col xs={24} md={16} lg={17} xl={12}>
              <Badge
                color={StatusType[paramsGetOrder?.data?.orderId?.order?.status || '']?.color}
                text={StatusType[paramsGetOrder?.data?.orderId?.order?.status || '']?.text}
              />
            </Col>
            <Col xs={24} md={10} lg={9} xl={12}>
              <Text strong style={styles.textSize}>
                Registro:
              </Text>
            </Col>
            <Col xs={24} md={14} lg={15} xl={12}>
              <Tag style={styles.tagStyle}>
                {moment(paramsGetOrder?.data?.orderId?.order?.createdAt).format(FORMAT_DATE)}
              </Tag>
            </Col>
            <Col xs={24} md={12} lg={12} xl={12}>
              <Text strong style={styles.textSize}>
                Actualizado:
              </Text>
            </Col>
            <Col xs={24} md={12} lg={12} xl={12}>
              <Tag style={styles.tagStyle}>
                {moment(paramsGetOrder?.data?.orderId?.order?.updatedAt).format(FORMAT_DATE)}
              </Tag>
            </Col>
          </Row>
        </Grid>
        <Grid hoverable={false} style={styles.secondGrid}>
          <Row justify="center" align="middle" style={styles.rowSGrid}>
            <Col>
              <Title level={4}>Total del Pedido</Title>
            </Col>
            <Divider style={styles.noMargin} />
            <Col span={12}>
              <Row align="middle">
                <Col span={24}>
                  <Text strong style={styles.textSize}>
                    Total:
                  </Text>
                </Col>
                <Col span={24}>
                  <Text strong style={styles.textSize}>
                    {totalPaid > total ? ' Cambio:' : 'Saldo:'}
                  </Text>
                </Col>
                <Col span={24}>
                  <Text strong style={styles.textSize}>
                    Abonado:
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col span={12} style={styles.textRight}>
              <Row gutter={[0, 6]}>
                <Col span={24}>
                  <Text strong>{numeral(total).format('$ 0,0')}</Text>
                </Col>
                <Col span={24}>
                  <Text strong>
                    {numeral(totalPaid > total ? change : balance).format('$ 0,0')}
                  </Text>
                </Col>
                <Col span={24}>
                  <Text strong>{numeral(totalPaid).format('$ 0,0')}</Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
        <Grid hoverable={false} style={styles.thirdGrid}>
          <Row justify="center" align="middle" gutter={[0, 5]}>
            <Col>
              <Title level={4}>Envío</Title>
            </Col>
            <Divider style={styles.divGrid} />
            <Col xs={24} md={4} lg={4} xl={8}>
              {<UserOutlined style={styles.iconStyle} />}
            </Col>
            <Col xs={24} md={20} lg={20} xl={16}>
              <Text strong style={styles.textSize}>
                {paramsGetOrder?.data?.orderId?.order?.customer?.firstName}{' '}
                {paramsGetOrder?.data?.orderId?.order?.customer?.lastName}
              </Text>
            </Col>
            <Col xs={24} md={4} lg={4} xl={8}>
              {<HomeOutlined style={styles.iconStyle} />}
            </Col>
            <Col xs={24} md={20} lg={20} xl={16}>
              <Space>
                {paramsGetOrder.data?.orderId?.order?.address ? (
                  <Text strong key={1} style={styles.textSize}>
                    {' '}
                    {paramsGetOrder?.data?.orderId?.order?.address?.field1}{' '}
                    {paramsGetOrder?.data?.orderId?.order?.address?.number1}
                    {' # '}
                    {paramsGetOrder?.data?.orderId?.order?.address?.loteNumber}
                    {' - '}
                    {paramsGetOrder?.data?.orderId?.order?.address?.number2}
                  </Text>
                ) : (
                  <Text strong key={1} style={styles.textSize}>
                    No Registra Dirección
                  </Text>
                )}
                <Text key={2} strong style={styles.textSize}>
                  {paramsGetOrder?.data?.orderId?.order?.address?.city?.name}
                </Text>
              </Space>
            </Col>
            <Col xs={24} md={4} lg={4} xl={8} style={styles.marginB}>
              {<PhoneOutlined style={styles.iconStyle} />}
            </Col>
            <Col xs={24} md={20} lg={20} xl={16} style={styles.marginB}>
              <Text strong style={styles.textSize}>
                {paramsGetOrder?.data?.orderId?.order?.customer?.phone || 'No registra Teléfono'}
              </Text>
            </Col>
          </Row>
        </Grid>
        <Divider />
      </Card>
      <Row gutter={[0, 10]} justify="center">
        <Col style={styles.widthMax}>{<Tabs order={paramsGetOrder?.data?.orderId?.order} />}</Col>
        <Col>
          <Affix offsetBottom={10}>
            <Card size="small" style={styles.affixStyle}>
              <Space>
                <Popconfirm
                  title="¿Esta seguro que desea cancelar el pedido?"
                  okText="Si"
                  cancelText="No"
                  onConfirm={() => onCancelOrder()}
                >
                  <Button
                    style={styles.buttonR}
                    loading={paramsUpdateOrder?.loading}
                    disabled={
                      paramsGetOrder?.data?.orderId?.order?.status === StatusOrder.Cancelled ||
                      (paramsGetOrder?.data?.orderId?.order?.status !== StatusOrder.Cancelled
                        ? initialState?.currentUser?.role?.name === 'Administrador'
                          ? false
                          : disabledCancelButton()
                        : true) ||
                      paramsGetOrder.data?.orderId.order.status === StatusOrder.Sent ||
                      paramsGetOrder.data?.orderId.order.status === StatusOrder.Closed
                    }
                    icon={<CloseCircleOutlined />}
                    type="primary"
                  >
                    Cancelar Pedido
                  </Button>
                </Popconfirm>
                <Button
                  style={styles.buttonR}
                  icon={<PrinterOutlined />}
                  type="primary"
                  onClick={() => printOrder(paramsGetOrder?.data?.orderId?.order)}
                >
                  Imprimir Pedido
                </Button>

                <Button
                  icon={<PrinterOutlined />}
                  style={styles.buttonR}
                  disabled={paramsGetOrder?.data?.orderId?.order?.invoice === null}
                  type="primary"
                  onClick={() => printInvoice(paramsGetOrder?.data?.orderId?.order?.invoice)}
                >
                  Imprimir Factura
                </Button>
                <Button
                  icon={<PrinterOutlined />}
                  type="primary"
                  disabled={paramsGetOrder?.data?.orderId?.order?.conveyorOrder === null}
                  style={styles.buttonR}
                  onClick={() => printShippingLabel(paramsGetOrder?.data?.orderId?.order)}
                >
                  Etiqueta de Envio
                </Button>
                <Button
                  icon={<SendOutlined />}
                  type="primary"
                  style={styles.buttonR}
                  disabled={
                    paramsGetOrder.data?.orderId.order.status === StatusOrder.Sent ||
                    paramsGetOrder.data?.orderId.order.status === StatusOrder.Closed ||
                    paramsGetOrder?.data?.orderId?.order?.status === StatusOrder.Cancelled ||
                    balance > 0 ||
                    disabledSentButton()
                  }
                  onClick={() => onSentOrder()}
                >
                  Enviar Pedido
                </Button>
              </Space>
            </Card>
          </Affix>
        </Col>
      </Row>
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertInformation} />
      <div style={{ display: 'none' }}>
        <OrderProduction ref={reportRef} data={orderData} />
      </div>
      <div style={{ display: 'none' }}>
        <ShippingLabel ref={reportRef1} data={shippingLabelData} />
      </div>
      <div style={{ display: 'none' }}>
        <InvoicePrint ref={reportRef2} data={invoiceData} />
      </div>
    </PageContainer>
  );
};

export default EcommerceForm;
