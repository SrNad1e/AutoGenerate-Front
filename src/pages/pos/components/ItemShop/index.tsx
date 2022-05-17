import { BarcodeOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Image, InputNumber, Row, Space, Typography } from 'antd';
import numeral from 'numeral';

import DefaultImage from '@/assets/default.webp';

const { Text, Title } = Typography;

const ShopItem = () => {
  return (
    <Card
      style={{
        width: 380,
        borderRadius: 10,
      }}
      bodyStyle={{
        padding: 0,
      }}
    >
      <Row gutter={12}>
        <Col span={12}>
          <Image
            style={{
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            preview={false}
            fallback={DefaultImage}
            src={''}
          />
        </Col>
        <Col span={12} style={{ margin: '20px 0' }}>
          <Row gutter={12}>
            <Col span={24}>
              <Space size={1} direction="vertical">
                <Title
                  style={{
                    lineHeight: 0,
                  }}
                  level={4}
                >
                  {'Susana'}
                </Title>
                <Text
                  style={{
                    lineHeight: 0,
                  }}
                  italic
                >
                  {'Brasier'}
                </Text>
              </Space>
            </Col>
            <Col span={24}>
              <Row>
                <Col lg={8} sm={24}>
                  <Space>
                    <Text strong>Talla:</Text>
                    <Text>{'M'}</Text>
                  </Space>
                </Col>
                <Col lg={16} sm={24}>
                  <Space>
                    <Text strong>Color:</Text>
                    <Text>{'Blue'}</Text>
                    <Avatar
                      size="small"
                      style={{
                        backgroundColor: 'blue',
                        borderRadius: '50%',
                        border: 'solid 1px black',
                      }}
                    />
                  </Space>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Space>
                <Text>Precio:</Text>
                <Text>{numeral(10000).format('$ 0,0')}</Text>
              </Space>
            </Col>
            <Col span={24}>
              <Space>
                <BarcodeOutlined />
                <Text>{10010101}</Text>
              </Space>
            </Col>
            <Col span={24}>
              <Row>
                <Col span={24}>
                  <Title
                    style={{
                      textAlign: 'center',
                    }}
                    level={3}
                  >
                    Inventario
                  </Title>
                </Col>
                <Col span={24}>
                  <Title
                    style={{
                      textAlign: 'center',
                    }}
                    level={2}
                  >
                    {10}
                  </Title>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Space
                style={{
                  width: '100%',
                }}
                align="center"
                direction="vertical"
              >
                <InputNumber
                  defaultValue={1}
                  controls={false}
                  min={1}
                  style={{
                    fontSize: 25,
                  }}
                />
                <Button disabled={false} type="primary" onClick={() => {}}>
                  Agregar
                </Button>
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default ShopItem;
