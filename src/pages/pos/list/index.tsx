/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Col, Row } from 'antd';
import { useHistory } from 'umi';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

import { useCreateOrder, useGetOrdersByPos } from '@/hooks/order.hooks';
import { useGetCurrentUser } from '@/hooks/user.hooks';
import type { Order } from '@/graphql/graphql';
import SaveOrder from '../components/SaveOrder';

import style from './styles';

const PosList = () => {
  const history = useHistory();

  const currentUser = useGetCurrentUser();
  const [getOrders, { data, loading }] = useGetOrdersByPos();
  const [createOrder] = useCreateOrder();

  /**
   * @description crea la nueva orden
   */
  const onClick = async () => {
    try {
      const response = await createOrder({
        variables: {
          input: {
            status: 'open',
          },
        },
      });
      if (response?.data?.createOrder) {
        history.push(`/pos/${response?.data?.createOrder?._id}`);
      }
    } catch (error: any) {}
  };

  useEffect(() => {
    if (currentUser?.data?.currentUser) {
      getOrders({
        variables: {
          id: currentUser?.data?.currentUser?.pointOfSale?._id || '',
        },
      });
    }
  }, []);

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
            {data?.ordersByPointOfSale?.map((order) => (
              <SaveOrder key={order?._id} {...(order as Order)} />
            ))}
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Card>Estadisticas</Card>
      </Col>
    </Row>
  );
};

export default PosList;
