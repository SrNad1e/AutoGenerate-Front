import {
  BorderlessTableOutlined,
  createFromIconfontCN,
  DollarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Card, Row, Typography, Col, Tooltip } from 'antd';
//import { Link } from 'umi'

import style from './styles.less';

export type PropsCardSave = {
  order: ORDER.Order;
};

const { Title } = Typography;

const CardSave = () => {
  const IconCalendar = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3311362_w3mpog6u5bi.js',
    extraCommonProps: {},
  });

  return (
    <Card hoverable style={{ borderRadius: '10px', borderColor: '#dc9575', marginTop: 30 }}>
      <Row gutter={[12, 0]}>
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
        <Col span={9}>
          <Title level={5}>$50.000</Title>
        </Col>
      </Row>
      <Row gutter={[12, 0]} style={{ marginTop: 10 }}>
        <Col>
          <Tooltip title={'Cliente'}>
            <UserOutlined style={{ fontSize: 25, color: '#dc9575' }} />
          </Tooltip>
        </Col>
        <Col>
          <Title level={5} style={{ margin: 0 }}>
            Jose Luis Rodriguez
          </Title>
          <Title level={5} style={{ margin: 0 }}>
            {' '}
            CC. {'1007512204'}
          </Title>
        </Col>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col span={3}>
          <Tooltip title={'Fecha de creacion'}>
            <IconCalendar className={style.icon} type="icon-Calendar_dates" />
          </Tooltip>
        </Col>
        <Col span={9}>
          <Title level={5}>31/03/2022</Title>
        </Col>
      </Row>
    </Card>
  );
};

export default CardSave;
