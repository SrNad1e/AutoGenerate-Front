import {
  BorderlessTableOutlined,
  CalendarOutlined,
  DollarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Tooltip, Typography } from 'antd';
import numeral from 'numeral';

import styles from '../styles';

const { Text } = Typography;

const SaveOrder = () => {
  return (
    <Card onClick={() => {}} hoverable style={styles.cardStyle}>
      <Row gutter={[12, 0]}>
        <Col>
          <Tooltip title={'Numero de pedido'}>
            <BorderlessTableOutlined style={styles.iconSaveStyle} />
          </Tooltip>
        </Col>
        <Col span={6}>
          <Text strong>{1}</Text>
        </Col>
        <Col>
          <Tooltip title={'Valor del pedido'}>
            <DollarOutlined style={styles.iconSaveStyle} />
          </Tooltip>
        </Col>
        <Col>
          <Text strong>{numeral(10000).format('0,0')}</Text>
        </Col>
      </Row>
      <Row gutter={[12, 0]} style={styles.marginContentCard}>
        <Col>
          <Tooltip title={'Cliente'}>
            <UserOutlined style={styles.iconSaveStyle} />
          </Tooltip>
        </Col>
        <Col span={12}>
          <Text strong>{`Nombre Apellido`}</Text>
          <Text strong> CC. {'00110011'}</Text>
        </Col>
      </Row>
      <Row style={styles.marginContentCard}>
        <Col span={4}>
          <Tooltip title={'Fecha de creacion'}>
            <CalendarOutlined style={styles.iconSaveStyle} type="icon-Calendar_dates" />
          </Tooltip>
        </Col>
        <Col span={20}>
          <Text strong>{'12/04/2022'}</Text>
        </Col>
      </Row>
    </Card>
  );
};

export default SaveOrder;
