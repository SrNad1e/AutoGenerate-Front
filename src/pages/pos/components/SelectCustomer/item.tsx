import { Button, Col, Row, Tag, Tooltip, Typography } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

import type { Customer, UpdateOrderInput } from '@/graphql/graphql';

import styles from '../styles';

const { Text } = Typography;

export type Props = {
  customer: Customer;
  editOrder: (params: UpdateOrderInput) => void;
};

const Item = ({ customer, editOrder }: Props) => {
  return (
    <Row style={styles.maxWidth}>
      <Col span={16}>
        <Row>
          <Col span={24}>
            <Text>
              {customer?.firstName} {customer?.lastName}
            </Text>
          </Col>
          <Col span={24}>
            <Text>
              {customer?.documentType?.abbreviation} {customer?.document}
            </Text>
          </Col>
        </Row>
      </Col>
      <Col span={8}>
        <Row>
          <Col
            span={24}
            style={{
              display: 'flex',
              justifyContent: 'right',
              alignItems: 'center',
            }}
          >
            <Tag color="volcano">{customer?.customerType?.name}</Tag>
            <Tooltip title="Agregar">
              <Button
                onClick={() => editOrder({ customerId: customer?._id })}
                type="primary"
                icon={<LoginOutlined />}
              />
            </Tooltip>
          </Col>
          <Col span={24}>
            <Text>{customer?.phone}</Text>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Item;
