import { BarcodeOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Image, InputNumber, Row, Space, Typography } from 'antd';
import numeral from 'numeral';
import { useState } from 'react';

import type { Product } from '@/graphql/graphql';

import DefaultImage from '@/assets/default.webp';

import styles from '../styles';

const { Text, Title } = Typography;

export type Params = {
  product: Product;
  addProductOrder: (product: Product, quantity: number) => void;
};

const ShopItem = ({ product, addProductOrder }: Params) => {
  const [quantity, setQuantity] = useState(1);
  const { images, reference, size, color, barcode, stock } = product;

  const onClick = () => {
    addProductOrder(product, quantity);
  };

  return (
    <Card style={styles.cardItem} bodyStyle={styles.cardNoPadding}>
      <Row gutter={12}>
        <Col span={13}>
          <Image
            style={styles.borderStyle}
            preview={false}
            fallback={DefaultImage}
            src={`${CDN_URL}/${images && images[0]?.urls?.webp?.medium}`}
          />
        </Col>
        <Col span={11} style={styles.marginItem}>
          <Row gutter={12}>
            <Col span={24}>
              <Space size={1} direction="vertical">
                <Title style={styles.lineMargin} level={4}>
                  {reference?.description}
                </Title>
                <Text style={styles.linePlus} italic>
                  {reference?.name}
                </Text>
              </Space>
            </Col>
            <Col span={24}>
              <Row gutter={24}>
                <Col sm={24}>
                  <Space>
                    <Text strong>Talla:</Text>
                    <Text>{size.value}</Text>
                  </Space>
                </Col>
                <Col sm={24}>
                  <Space>
                    <Text strong>Color:</Text>
                    <Text>{color?.name}</Text>
                    <Avatar
                      size="small"
                      src={`${CDN_URL}/${color?.image?.urls?.webp?.small}`}
                      style={{
                        backgroundColor: color?.html,
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
                <Text>{numeral(reference?.price).format('$ 0,0')}</Text>
              </Space>
            </Col>
            <Col span={24}>
              <Space>
                <BarcodeOutlined />
                <Text>{barcode}</Text>
              </Space>
            </Col>
            <Col span={24}>
              <Row>
                <Col span={24}>
                  <Title style={styles.textCenter} level={3}>
                    Inventario
                  </Title>
                </Col>
                <Col span={24}>
                  <Title style={styles.textCenter} level={2}>
                    {stock && stock[0]?.quantity > 0 ? stock[0]?.quantity : 'Sin Stock'}
                  </Title>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Space style={styles.maxWidth} align="center" direction="vertical">
                <InputNumber
                  value={quantity}
                  controls={false}
                  min={1}
                  style={styles.inputNumberSize}
                  onChange={(e) => setQuantity(e)}
                />
                <Button disabled={false} type="primary" onClick={onClick}>
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
