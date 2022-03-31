import {
  DollarCircleFilled,
  ShoppingCartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Card, Row, Typography, Col } from 'antd';
import moment from 'moment';
import numeral from 'numeral';
//import { Link } from 'umi'

export type PropsCardSave = {
  order: ORDER.Order;
};

const { Text, Title } = Typography;

const CardSave = ({ order }: PropsCardSave) => {
  return (
    <Card
      hoverable
      style={{ borderRadius: '10px', borderColor: '#dc9575' }}
      bodyStyle={{ margin: 0, padding: 10 }}
    >
      <Row style={{ display: 'flex', alignItems: 'center' }}>
        <Col span={3}>
          <ShoppingCartOutlined style={{ fontSize: 30 }} />
        </Col>
        <Col span={9}>
          <Text>{moment(order?.createdAt).format('YYYY/MM/DD')}</Text>
        </Col>
        <Col span={3}>
          <DollarCircleFilled style={{ fontSize: 30, display: 'flex', justifyContent: 'right' }} />
        </Col>
        <Col span={9} style={{ display: 'flex', justifyContent: 'right' }}>
          <Title level={4} style={{ marginBottom: 0 }}>
            {numeral(order?.summary?.total).format('$ 0,0')}
          </Title>
        </Col>
      </Row>
      <Row style={{ display: 'flex', alignItems: 'center' }}>
        <Col span={3}>
          <UserOutlined style={{ fontSize: 30 }} />
        </Col>
        <Col span={9}>
          <Text>{order?.user?.name}</Text>
        </Col>
      </Row>
      <Row style={{ display: 'flex', alignItems: 'center' }}>
        <Col span={3}>
          <TeamOutlined style={{ fontSize: 30 }} />
        </Col>
        <Col span={21}>
          <Button
            style={{ width: '100%', textAlign: 'left' }}
            type="primary"
            size="small"
          >{`${order?.customer?.firstName} ${order?.customer?.lastName} / ${order?.customer?.document} `}</Button>
        </Col>
      </Row>
    </Card>
  );
};

export default CardSave;
