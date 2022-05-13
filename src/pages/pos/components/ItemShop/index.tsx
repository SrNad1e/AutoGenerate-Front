import { BarcodeOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Divider, Image, InputNumber, Row, Typography } from 'antd';
import numeral from 'numeral';
import { useState } from 'react';

import styles from '../styles';

const { Text } = Typography;

const ShopItem = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <Card style={styles.cardItem} bodyStyle={styles.bodyPadding}>
      <Row>
        <Col lg={12} md={12}>
          <Image
            preview={false}
            style={styles.imageStyle}
            src={'https://i.pinimg.com/564x/15/a7/42/15a742d487f1106f5fef26d3ae0a1057.jpg'}
          />
        </Col>
        <Col lg={12} md={12} style={styles.itemsDirection}>
          <Text style={styles.titleStyle}>{'Susana'}</Text>
          <Text italic>{'Brasier'}</Text>
          <Row>
            <Col span={9}>
              <Text>
                <Text style={styles.fontStyle}>Talla</Text> {'M'}
              </Text>
            </Col>
            <Col span={10}>
              <Text>
                <Text style={styles.fontStyle}>Color</Text> {'Blue'}
              </Text>
            </Col>
            <Col span={5}>
              <Avatar
                size="small"
                style={{
                  backgroundColor: 'blue',
                  borderRadius: '50%',
                  border: 'solid 1px black',
                }}
              />
            </Col>
          </Row>
          <Row align="middle">
            <Col md={12} lg={12}>
              <Text style={styles.fontStyle}>Precio</Text>
            </Col>
            <Col md={12} lg={12}>
              <Text style={styles.textTotal}>{numeral(10000).format('$ 0,0')}</Text>
            </Col>
          </Row>
          <Row>
            <Col md={16} lg={16}>
              <BarcodeOutlined />
            </Col>
            <Col md={8} lg={8}>
              <Text>{10010101}</Text>
            </Col>
          </Row>
          <Row gutter={[0, 20]} align="middle">
            {1 || 0 > 0 ? (
              <>
                <Col span={18}>
                  <Text style={styles.textTotal}>Inventario:</Text>
                </Col>
                <Col span={6}>
                  <Text style={styles.fontSizeMajor}>{10}</Text>
                </Col>
                <Col span={12}>
                  <InputNumber
                    min={1}
                    value={quantity}
                    onChange={(n) => setQuantity(n)}
                    bordered={false}
                    style={styles.centerInputNumber}
                  />
                </Col>
              </>
            ) : (
              <Col span={24}>
                <Divider />
                <Text style={styles.textTotal}>SIN INVENTARIO</Text>
              </Col>
            )}
            <Col span={24} style={styles.centeredContent}>
              <Button style={styles.buttonWidth} disabled={false} type="primary" onClick={() => {}}>
                Agregar
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default ShopItem;
