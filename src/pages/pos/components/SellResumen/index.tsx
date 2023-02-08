/* eslint-disable react-hooks/exhaustive-deps */
import {
  CheckOutlined,
  CloseCircleOutlined,
  DollarOutlined,
  PrinterOutlined,
  SaveOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Divider, Empty, List, Row, Space, Tag, Typography } from 'antd';
import numeral from 'numeral';
import { useParams } from 'umi';
import { useEffect, useState, useRef } from 'react';

import ModalPayment from '../Payment';
import ItemResume from './item';
import { useGetOrder } from '@/hooks/order.hooks';
import type { DetailOrder, Product, SummaryOrder, UpdateOrderInput } from '@/graphql/graphql';

import styles from '../styles';
import { useReactToPrint } from 'react-to-print';
import OrderProduction from './Resumen';
import { history } from 'umi';

const { Title } = Typography;

export type Params = {
  addProductOrder: (product: Product, quantity: number) => void;
  editOrder: (params: UpdateOrderInput) => void;
  setModalCustomerVisible: (flag: boolean) => void;
};

const Resumen = ({ addProductOrder, editOrder, setModalCustomerVisible }: Params) => {
  const [modalPaymentVisible, setModalPaymentVisible] = useState(false);
  const [orderCurrentData, setOrderCurrentData] = useState({});

  const { id } = useParams<Partial<{ id: string }>>();

  const [getOrder, { data }] = useGetOrder();

  const orderRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => orderRef?.current,
  });

  const totalProducts = data?.orderId?.order?.details?.reduce(
    (sum, detail) => detail?.quantity + sum,
    0,
  );

  /**
   * @description cierra el modal de pago
   */
  const onCloseModalPayment = () => {
    setModalPaymentVisible(false);
  };

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
    setOrderCurrentData(data?.orderId?.order);
  }, [data]);

  return (
    <Card bodyStyle={styles.bodyPadding} style={{ height: '100%' }}>
      <Row gutter={[12, 12]}>
        <Col offset={2} span={11}>
          <Title level={4}>Productos: {data?.orderId?.order?.details?.length || 0}</Title>
        </Col>
        <Col span={11}>
          <Title level={4}>Total: {totalProducts}</Title>
        </Col>
        <Col span={24}>
          <List size="small" style={styles.listResumenStyle}>
            {(totalProducts || 0) > 0 ? (
              data?.orderId?.order?.details?.map((detail, key) => (
                <ItemResume
                  number={key + 1}
                  key={detail?.product?._id}
                  detail={detail as DetailOrder}
                  addProductOrder={addProductOrder}
                />
              ))
            ) : (
              <Empty />
            )}
          </List>
        </Col>
        <Col span={24}>
          <Row>
            <Col md={15} lg={16}>
              <Title level={3} style={styles.titleLineSize}>
                Cliente:
              </Title>
              <Title level={5} style={styles.titleLineStyle}>
                {data?.orderId?.order?.customer?.firstName}{' '}
                {data?.orderId?.order?.customer?.lastName}
              </Title>
              <Title level={5} style={styles.titleLine}>
                {data?.orderId?.order?.customer?.documentType?.abbreviation}{' '}
                {data?.orderId?.order?.customer?.document}
              </Title>
            </Col>
            <Col md={8} lg={6}>
              <Row gutter={[25, 16]} style={{ textAlign: 'right' }}>
                <Col span={24}>
                  <Button
                    onClick={() => setModalCustomerVisible(true)}
                    icon={<UserOutlined />}
                    shape="round"
                    size="small"
                    type="primary"
                    ghost
                  >
                    Cambiar
                  </Button>
                </Col>
                <Col span={24}>
                  <Space>
                    <Tag color="volcano">{data?.orderId?.order?.customer?.customerType?.name}</Tag>
                    <Tag color="success">
                      {data?.orderId?.order?.customer?.active ? (
                        <CheckOutlined />
                      ) : (
                        <CloseCircleOutlined />
                      )}
                    </Tag>
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Divider style={styles.dividerStyle} />
        <Col span={24}>
          <Row>
            <Col span={12}>
              <Title style={styles.titleLine} level={4}>
                Subtotal:
              </Title>
              <Title style={styles.titleLine} level={4}>
                Descuento:
              </Title>
              <Title style={styles.titleLine} level={4}>
                Total:
              </Title>
            </Col>
            <Col span={12} style={styles.titleLineRight}>
              <Title style={styles.titleLine} level={4}>
                {numeral(data?.orderId?.order?.summary?.subtotal).format('$ 0,0')}
              </Title>
              <Title style={styles.titleLine} level={4}>
                {numeral(data?.orderId?.order?.summary?.discount).format('$ 0,0')}
              </Title>
              <Title style={styles.titleLine} level={4}>
                {numeral(data?.orderId?.order?.summary?.total).format('$ 0,0')}
              </Title>
            </Col>
          </Row>
        </Col>
        <Divider style={styles.dividerStyle} />
        <Col span={24} style={{ marginTop: 20, bottom: 25 }}>
          <Row gutter={[10, 10]} align="middle" justify="center">
            <Col lg={10} xl={10}>
              <Button
                icon={<DollarOutlined />}
                type="primary"
                disabled={(data?.orderId?.order?.summary?.total || 0) <= 0}
                onClick={() => setModalPaymentVisible(true)}
                style={styles.payButtonStyle}
              >
                PAGAR
              </Button>
            </Col>
            <Col lg={12} xl={12} style={styles.alignPrint}>
              <Row gutter={[0, 15]} justify="center">
                <Col span={24}>
                  <Button
                    ghost
                    shape="round"
                    icon={<PrinterOutlined />}
                    onClick={() => handlePrint()}
                    size="small"
                    type="primary"
                  >
                    Imprimir
                  </Button>
                </Col>
                <Col span={24}>
                  <Button
                    onClick={() => history.push('/pos/sales')}
                    style={{ borderRadius: 5 }}
                    shape="round"
                    size="small"
                    type="primary"
                    icon={<SaveOutlined />}
                  >
                    Guardar
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <ModalPayment
          paymentsSave={data?.orderId?.order?.payments}
          credit={data?.orderId?.credit}
          summary={data?.orderId?.order?.summary as SummaryOrder}
          editOrder={editOrder}
          visible={modalPaymentVisible}
          onCancel={onCloseModalPayment}
        />
      </Row>
      <div style={{ display: 'none' }}>
        <OrderProduction data={orderCurrentData} ref={orderRef} />
      </div>
    </Card>
  );
};

export default Resumen;
