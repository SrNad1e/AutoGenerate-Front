/* eslint-disable react-hooks/exhaustive-deps */
import { DollarOutlined, PrinterOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Empty, List, Row, Tag, Typography } from 'antd';
import numeral from 'numeral';
import { useParams } from 'umi';
import { useEffect, useState } from 'react';

import ModalPayment from '../Payment';
import ItemResume from './item';
import { useGetOrder } from '@/hooks/order.hooks';
import type { DetailOrder, Product, SummaryOrder, UpdateOrderInput } from '@/graphql/graphql';

import styles from '../styles';

const { Title } = Typography;

export type Params = {
  addProductOrder: (product: Product, quantity: number) => void;
  editOrder: (params: UpdateOrderInput) => void;
  setModalCustomerVisible: (flag: boolean) => void;
};

const Resumen = ({ addProductOrder, editOrder, setModalCustomerVisible }: Params) => {
  const [modalPaymentVisible, setModalPaymentVisible] = useState(false);

  const { id } = useParams<Partial<{ id: string }>>();

  const [getOrder, { data }] = useGetOrder();

  const totalProducts = data?.orderId?.details?.reduce((sum, detail) => detail?.quantity + sum, 0);

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

  return (
    <Card bodyStyle={styles.bodyPadding}>
      <Row gutter={[12, 12]}>
        <Col offset={2} span={11}>
          <Title level={4}>Productos: {data?.orderId?.details?.length || 0}</Title>
        </Col>
        <Col span={11}>
          <Title level={4}>Total: {totalProducts}</Title>
        </Col>
        <Col span={24}>
          <List size="small" style={styles.listResumenStyle}>
            {(totalProducts || 0) > 0 ? (
              data?.orderId?.details?.map((detail, key) => (
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
                {data?.orderId?.customer?.firstName} {data?.orderId?.customer?.lastName}
              </Title>
              <Title level={5} style={styles.titleLine}>
                {data?.orderId?.customer?.documentType?.abbreviation}{' '}
                {data?.orderId?.customer?.document}
              </Title>
            </Col>
            <Col md={8} lg={6}>
              <Row gutter={[25, 16]}>
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
                  <Tag color="volcano">{data?.orderId?.customer?.customerType?.name}</Tag>
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
                {numeral(data?.orderId?.summary?.subtotal).format('$ 0,0')}
              </Title>
              <Title style={styles.titleLine} level={4}>
                {numeral(data?.orderId?.summary?.discount).format('$ 0,0')}
              </Title>
              <Title style={styles.titleLine} level={4}>
                {numeral(data?.orderId?.summary?.total).format('$ 0,0')}
              </Title>
            </Col>
          </Row>
        </Col>
        <Divider style={styles.dividerStyle} />
        <Col span={24}>
          <Row gutter={10}>
            <Col md={14} lg={16}>
              <Button
                icon={<DollarOutlined />}
                type="primary"
                disabled={(data?.orderId?.summary?.total || 0) <= 0}
                onClick={() => setModalPaymentVisible(true)}
                style={styles.payButtonStyle}
              >
                PAGAR
              </Button>
            </Col>
            <Col md={10} lg={8} style={styles.alignPrint}>
              <Button ghost shape="round" icon={<PrinterOutlined />} size="small" type="primary">
                Imprimir
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <ModalPayment
        summary={data?.orderId?.summary as SummaryOrder}
        editOrder={editOrder}
        visible={modalPaymentVisible}
        onCancel={onCloseModalPayment}
      />
    </Card>
  );
};

export default Resumen;
