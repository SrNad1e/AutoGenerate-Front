import { Button, Card, Row, Tooltip } from 'antd';
import Col from 'antd/es/grid/col';
//import { apiUrl } from '@/../config/defaultSettings';
//import { useState, useEffect } from 'react';
//import request from '@/utils/request';
//import { stringify } from 'qs';
import {
  BorderlessTableOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import { useHistory } from 'umi';

//const { Text } = Typography;

export type PropsOrderSave = {
  newOrder: () => void;
};

const OrderSave = ({ newOrder }: PropsOrderSave) => {
  /*const [OrdersOpen, setOrdersOpen] = useState([]);
  const [OrdersReserved, setOrdersReserved] = useState([]);*/

  const history = useHistory();
  /**
   * obtiene los carritos
   */
  /*const getCarts = async () => {
    const paramsOpen = {
      status: 'open',
      $limit: 50,
    };
    const responseOpen = (paramsOpen);
    if (!responseOpen) {
      setOrdersOpen(responseOpen);
    }

    const paramsReserved = {
      status: 'reserved',
      $limit: 50,
    };
    const responseReserved = (paramsReserved);
    if (!responseReserved) {
      setOrdersReserved(responseReserved);
    }
  };

  useEffect(() => {
    getCarts();
  }, []);*/

  return (
    <Row style={{ padding: 50 }}>
      <Col span={24} style={{ minHeight: '25vh' }}>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card
              onClick={() => newOrder()}
              hoverable
              style={{ borderRadius: '10px', borderColor: '#dc9575' }}
              bodyStyle={{ margin: 0, padding: 20 }}
            >
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col span={9}>
                  <ShoppingCartOutlined style={{ fontSize: 50, color: '#dc9575' }} />
                </Col>
                <Col span={15}>
                  <Button
                    shape="round"
                    style={{ width: '100%', height: 50 }}
                    type="primary"
                    onClick={() => history.push('/pos/123456')}
                  >
                    Nuevo Pedido
                  </Button>
                </Col>
              </Row>
            </Card>
            <Card hoverable style={{ borderRadius: '10px', borderColor: '#dc9575', marginTop: 30 }}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col span={3}>
                  <Tooltip title={'Fecha de creacion'}>
                    <ShoppingCartOutlined style={{ fontSize: 25, color: '#dc9575' }} />
                  </Tooltip>
                </Col>
                <Col span={9}>
                  <Title level={5}>31/03/2022</Title>
                </Col>
                <Col span={3}>
                  <Tooltip title={'Cliente'}>
                    <UserOutlined style={{ fontSize: 25, color: '#dc9575' }} />
                  </Tooltip>
                </Col>
                <Col span={9}>
                  <Title level={5}>Jose Luis - CC. 1007512311</Title>
                </Col>
              </Row>
              <Row style={{ display: 'flex' }}>
                <Col span={3}>
                  <Tooltip title={'Numero de pedido'}>
                    <BorderlessTableOutlined style={{ fontSize: '25px', color: '#dc9575' }} />
                  </Tooltip>
                </Col>
                <Col span={9}>
                  <Title level={5}>Pedido No.1</Title>
                </Col>
                <Col span={3}>
                  <Tooltip title={'Valor del pedido'}>
                    <DollarOutlined style={{ fontSize: '25px', color: '#dc9575' }} />
                  </Tooltip>
                </Col>
                <Col span={9} style={{}}>
                  <Title level={5} style={{}}>
                    $50.000
                  </Title>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default OrderSave;
