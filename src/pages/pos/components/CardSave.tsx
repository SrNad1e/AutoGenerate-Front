import {
  BorderlessTableOutlined,
  createFromIconfontCN,
  DollarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Card, Row, Typography, Col, Tooltip } from 'antd';
//import { Link } from 'umi'
import AlertInformation from '@/components/Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { useEffect, useState } from 'react';
import { useGetOrdersByPos } from '@/hooks/order.hooks';
import numeral from 'numeral';
//import moment from 'moment';
import AlertLoading from '@/components/Alerts/AlertLoading';
import { useModel } from 'umi';

//import style from './styles.less';

export type PropsCardSave = {
  order: ORDER.Order;
};

const { Title } = Typography;

const IconCalendar = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3311362_w3mpog6u5bi.js',
  extraCommonProps: {},
});

const CardSave = (order: ORDER.Order) => {
  const [orders, setOrders] = useState<Partial<ORDER.Order[]>>([]);
  const [propsAlertInformation, setPropsAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    visible: false,
    type: 'error',
  });

  const { initialState } = useModel('@@initialState');

  const getOrders = (data: Partial<ORDER.Order[]>) => {
    setOrders(data);
  };

  const closeAlertError = () => {
    setPropsAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
  };

  const showError = (message: string) => {
    setPropsAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
  };

  const { getOrdersByPos, loading } = useGetOrdersByPos(getOrders, showError);

  const loadingData = () => {
    getOrdersByPos({
      variables: {
        id: initialState?.currentUser?.pointOfSale?._id,
      },
    });
  };

  useEffect(() => {
    loadingData();
  }, []);

  return (
    <Card hoverable style={{ borderRadius: '10px', borderColor: '#dc9575', marginTop: 30 }}>
      <Row gutter={[12, 0]}>
        <Col span={3}>
          <Tooltip title={'Numero de pedido'}>
            <BorderlessTableOutlined style={{ fontSize: '25px', color: '#dc9575' }} />
          </Tooltip>
        </Col>
        <Col span={9}>
          <Title level={5}>{order?.number}</Title>
        </Col>
        <Col span={3}>
          <Tooltip title={'Valor del pedido'}>
            <DollarOutlined style={{ fontSize: '25px', color: '#dc9575' }} />
          </Tooltip>
        </Col>
        <Col span={9}>
          <Title level={5}>{numeral(order?.summary?.total).format('$ 0,0')}</Title>
        </Col>
      </Row>
      {orders}
      <Row gutter={[12, 0]} style={{ marginTop: 10 }}>
        <Col>
          <Tooltip title={'Cliente'}>
            <UserOutlined style={{ fontSize: 25, color: '#dc9575' }} />
          </Tooltip>
        </Col>
        <Col>
          <Title level={5} style={{ margin: 0 }}>
            {`${order.customer?.firstName} ${order?.customer?.lastName}`}
          </Title>
          <Title level={5} style={{ margin: 0 }}>
            {' '}
            CC. {order?.customer?.document}
          </Title>
        </Col>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col span={3}>
          <Tooltip title={'Fecha de creacion'}>
            <IconCalendar style={{ fontSize: 25 }} type="icon-Calendar_dates" />
          </Tooltip>
        </Col>
        <Col span={9}>
          <Title level={5}>{order.createdAt}</Title>
        </Col>
      </Row>
      <AlertInformation {...propsAlertInformation} onCancel={closeAlertError} />
      <AlertLoading message="Cargando datos" visible={loading} />
    </Card>
  );
};

export default CardSave;
