import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Col, Image, InputNumber, List, Row, Tooltip, Typography } from 'antd';
import numeral from 'numeral';

import type { DetailOrder } from '@/graphql/graphql';

const ListItem = List.Item;
const { Text, Title } = Typography;

const ItemResume = ({}: DetailOrder) => {
  return (
    <ListItem>
      <Card
        bordered={false}
        bodyStyle={{
          padding: 0,
        }}
      >
        <Row align="middle" gutter={6}>
          <Col
            span={24}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Tooltip title="Eliminar">
              <Button danger type="link" shape="circle" icon={<CloseOutlined type="" />} />
            </Tooltip>
          </Col>
          <Col lg={2}>
            <Title level={4}>10</Title>
          </Col>
          <Col lg={4}>
            <Image
              preview={false}
              fallback=""
              src="https://i.pinimg.com/736x/03/4b/de/034bde783ea726b922100c86547831e8.jpg"
              alt="Azula"
            />
          </Col>
          <Col lg={7}>
            <Row>
              <Col span={24} style={{ lineHeight: 0 }}>
                <Text>Susana</Text>
              </Col>
              <Col span={24}>
                <Text italic>10010101</Text>
              </Col>
              <Col span={24}>
                <Text>
                  <Text strong>Talla:</Text> L
                </Text>
              </Col>
              <Col span={24}>
                <Text>
                  <Text strong>Color: </Text> Rojo
                </Text>
              </Col>
            </Row>
          </Col>
          <Col lg={6}>
            <InputNumber defaultValue={1} style={{ width: 70 }} min={1} />
          </Col>
          <Col lg={5}>
            <Row style={{ lineHeight: 1, textAlign: 'right' }}>
              <Col span={24}>
                <Text>{numeral(10000).format('$ 0,0')}</Text>
              </Col>
              <Col span={24}>
                <Text italic delete>
                  {numeral(2000).format('$ 0,0')}
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </ListItem>
  );
};

export default ItemResume;
