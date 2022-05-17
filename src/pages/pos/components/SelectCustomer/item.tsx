import { Button, Col, Row, Tag, Tooltip, Typography } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

import type { Customer, UpdateOrderInput } from '@/graphql/graphql';

const { Text } = Typography;

export type Props = {
  customer: Customer;
  editOrder: (params: UpdateOrderInput) => void;
};

const Item = ({
  customer: { _id, firstName, lastName, document, documentType, customerType, phone },
  editOrder,
}: Props) => {
  return (
    <Row
      style={{
        width: '100%',
      }}
    >
      <Col span={18}>
        <Row>
          <Col span={24}>
            <Text>
              {firstName} {lastName}
            </Text>
          </Col>
          <Col span={24}>
            <Text>
              {documentType?.abbreviation} {document}
            </Text>
          </Col>
        </Row>
      </Col>
      <Col span={6}>
        <Row>
          <Col span={24}>
            <Tag color="volcano">{customerType?.name}</Tag>
            <Tooltip title="Agregar">
              <Button
                onClick={() => editOrder({ customerId: _id })}
                type="primary"
                icon={<LoginOutlined />}
              />
            </Tooltip>
          </Col>
          <Col span={24}>
            <Text>{phone}</Text>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Item;
