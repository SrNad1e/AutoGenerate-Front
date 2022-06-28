/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Col, Row } from 'antd';
import { useHistory, useModel } from 'umi';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import { useCreateOrder, useGetOrdersByPos } from '@/hooks/order.hooks';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import type { Order } from '@/graphql/graphql';
import { StatusOrder } from '@/graphql/graphql';
import SaveOrder from '../components/SaveOrder';
import AlertInformation from '@/components/Alerts/AlertInformation';

import style from './styles';

const PosList = () => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const history = useHistory();

  const { initialState } = useModel('@@initialState');

  const [getOrders, { data, loading, error }] = useGetOrdersByPos();
  const [createOrder] = useCreateOrder();

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
   * @description cierra la alerta y el modal
   */
  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  /**
   * @description crea la nueva orden
   */
  const onClick = async () => {
    try {
      const response = await createOrder({
        variables: {
          input: {
            status: StatusOrder.Open,
          },
        },
      });
      if (response?.data?.createOrder) {
        history.push(`/pos/sales/${response?.data?.createOrder?._id}`);
      }
    } catch (e: any) {
      showError(e?.message);
    }
  };

  useEffect(() => {
    if (initialState?.currentUser) {
      getOrders();
    }
  }, []);

  useEffect(() => {
    if (error) {
      showError(error?.message);
    }
  }, [error]);

  return (
    <Row gutter={[12, 12]}>
      <Col span={24} style={style.orders}>
        <Row gutter={[12, 12]} style={style.container}>
          <Col span={5}>
            <Card loading={loading} onClick={onClick} hoverable style={style.card}>
              <Row>
                <Col span={7}>
                  <ShoppingCartOutlined style={style.icon} />
                </Col>
                <Col span={17}>
                  <Button shape="round" type="primary" size="large">
                    Nuevo Pedido
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={24}>
            <Row gutter={[16, 16]}>
              {data?.ordersByPointOfSale?.map((order) => (
                <Col key={order?._id}>
                  <SaveOrder {...(order as Order)} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Card>Estadisticas</Card>
      </Col>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </Row>
  );
};

export default PosList;
