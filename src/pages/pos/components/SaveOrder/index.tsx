import { useHistory } from 'umi';
import { BorderlessTableOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Col, Row, Tooltip, Typography } from 'antd';
import numeral from 'numeral';

import type { Order } from '@/graphql/graphql';

import styles from '../styles';
import moment from 'moment';

const { Text, Title } = Typography;

const SaveOrder = ({ _id, number, updatedAt, customer, summary }: Order) => {
  const history = useHistory();

  const onClick = () => {
    history.push(`/pos/${_id}`);
  };

  return (
    <Card onClick={onClick} hoverable style={styles.orderSave}>
      <Row gutter={[0, 10]}>
        <Col span={10}>
          <Row gutter={12} align="middle">
            <Col>
              <Tooltip title="Numero de pedido">
                <BorderlessTableOutlined style={styles.icon} />
              </Tooltip>
            </Col>
            <Col>
              <Text strong>{number}</Text>
            </Col>
          </Row>
        </Col>
        <Col span={14}>
          <Row gutter={12} align="middle">
            <Col>
              <Tooltip title="Fecha de creacion">
                <CalendarOutlined style={styles.icon} type="icon-Calendar_dates" />
              </Tooltip>
            </Col>
            <Col>
              <Text strong>{moment(updatedAt).format(FORMAT_DATE)}</Text>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={12} align="middle">
            <Col>
              <Tooltip title="Cliente">
                <UserOutlined style={styles.icon} />
              </Tooltip>
            </Col>
            <Col>
              <Row>
                <Col span={24}>
                  {customer?.firstName} {customer?.lastName}
                </Col>
                <Col span={24}>
                  <Text strong>
                    {customer?.documentType?.abbreviation} {customer?.document}
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="center" style={styles.marginRow}>
            <Col>
              <Title level={3}>{numeral(summary?.total).format('$ 0,0')}</Title>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default SaveOrder;
