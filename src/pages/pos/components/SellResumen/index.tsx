/* eslint-disable react-hooks/exhaustive-deps */
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DollarOutlined,
  PlusOutlined,
  PrinterOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  List,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import numeral from 'numeral';
import { useParams } from 'umi';
import { useEffect, useState } from 'react';

import SelectCustomer from '../SelectCustomer';
import ModalPayment from '../Payment';
import ItemResume from './item';
import { useGetOrder, useUpdateOrder } from '@/hooks/order.hooks';
import type { DetailOrder, Product, UpdateOrderInput } from '@/graphql/graphql';

const { Title } = Typography;

export type Params = {
  addProductOrder: (product: Product, quantity: number) => void;
};

const Resumen = ({ addProductOrder }: Params) => {
  const [modalCustomerVisible, setModalCustomerVisible] = useState(false);
  const [modalPaymentVisible, setModalPaymentVisible] = useState(false);

  const { id } = useParams<Partial<{ id: string }>>();

  const [getOrder, { data }] = useGetOrder();

  const totalProducts = data?.orderId?.details?.reduce((sum, detail) => detail?.quantity + sum, 0);

  const [updateOrder] = useUpdateOrder();

  const editOrder = (params: UpdateOrderInput) => {
    try {
      if (id) {
        updateOrder({
          variables: {
            id,
            input: params,
          },
        });
      }
      setModalCustomerVisible(false);
    } catch (e) {}
  };

  /**
   * @description cierra el modal de cambio de cliente
   */
  const closeModalCustomer = () => {
    setModalCustomerVisible(false);
  };

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
    <Card
      bodyStyle={{
        padding: '10px',
      }}
    >
      <Row gutter={[12, 12]}>
        <Col offset={2} span={11}>
          <Title level={4}>Productos: {data?.orderId?.details?.length || 0}</Title>
        </Col>
        <Col span={11}>
          <Title level={4}>Total: {totalProducts}</Title>
        </Col>
        <Col span={24}>
          <List
            size="small"
            style={{
              height: '55vh',
              overflow: 'scroll',
              borderBottom: 'solid 1px black',
            }}
          >
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
            <Col span={16}>
              <Title level={3} style={{ lineHeight: 1 }}>
                Cliente:
              </Title>
              <Title level={5} style={{ lineHeight: 1, overflow: 'hidden', height: '17.6px' }}>
                {data?.orderId?.customer?.firstName} {data?.orderId?.customer?.lastName}
              </Title>
              <Title level={5} style={{ lineHeight: 0 }}>
                {data?.orderId?.customer?.documentType?.abbreviation}{' '}
                {data?.orderId?.customer?.document}
              </Title>
            </Col>
            <Col span={6}>
              <Row gutter={[24, 16]}>
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
                  <Tooltip title={'activo' ? 'Activo' : 'Inactivo'}>
                    <Tag color={'activo' ? '#87d068' : 'red'}>
                      {'activo' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                    </Tag>
                  </Tooltip>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Divider
          style={{
            backgroundColor: 'black',
            margin: '5px 0',
          }}
        />
        <Col span={24}>
          <Row>
            <Col span={12}>
              <Title
                style={{
                  lineHeight: 0,
                }}
                level={4}
              >
                Total:
              </Title>
              <Title
                style={{
                  lineHeight: 0,
                }}
                level={4}
              >
                Subtotal:
              </Title>
              <Title
                style={{
                  lineHeight: 0,
                }}
                level={4}
              >
                Descuento:
              </Title>
              <Title
                style={{
                  lineHeight: 0,
                }}
                level={4}
              >
                Envío:
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
                {numeral(data?.orderId?.summary?.total).format('$ 0,0')}
              </Title>
              <Title
                style={{
                  lineHeight: 0,
                }}
                level={4}
              >
                {numeral(data?.orderId?.summary?.subtotal).format('$ 0,0')}
              </Title>
              <Title
                style={{
                  lineHeight: 0,
                }}
                level={4}
              >
                {numeral(data?.orderId?.summary?.discount).format('$ 0,0')}
              </Title>
              <Title
                style={{
                  lineHeight: 0,
                }}
                level={4}
              >
                {numeral(0).format('$ 0,0')}
              </Title>
            </Col>
          </Row>
        </Col>
        <Divider
          style={{
            backgroundColor: 'black',
            margin: '5px 0',
          }}
        />
        <Col span={24}>
          <Row gutter={12}>
            <Col span={12}>
              <Button
                icon={<DollarOutlined />}
                type="primary"
                disabled={(data?.orderId?.summary?.total || 0) <= 0}
                onClick={() => setModalPaymentVisible(true)}
                style={{
                  fontSize: 30,
                  width: '100%',
                  height: 'auto',
                }}
              >
                PAGAR
              </Button>
            </Col>
            <Col span={12}>
              <Space direction="vertical">
                <Button ghost shape="round" icon={<PlusOutlined />} size="small" type="primary">
                  Agregar Envio
                </Button>
                <Button ghost shape="round" icon={<PrinterOutlined />} size="small" type="primary">
                  Imprimir
                </Button>
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
      <ModalPayment visible={modalPaymentVisible} onCancel={onCloseModalPayment} />
      <SelectCustomer
        editOrder={editOrder}
        visible={modalCustomerVisible}
        onCancel={closeModalCustomer}
      />
    </Card>
  );
};

export default Resumen;
