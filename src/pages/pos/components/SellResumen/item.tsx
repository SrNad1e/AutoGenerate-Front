import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Col, Image, InputNumber, List, Row, Tooltip, Typography } from 'antd';
import numeral from 'numeral';

import type { DetailOrder, Product } from '@/graphql/graphql';

import DefaultImage from '@/assets/default.webp';

const ListItem = List.Item;
const { Text, Title } = Typography;

export type Params = {
  detail: DetailOrder;
  number: number;
  addProductOrder: (product: Product, quantity: number) => void;
};

const ItemResume = ({
  detail: { discount, price, product, quantity },
  number,
  addProductOrder,
}: Params) => {
  const onChange = (value: number) => {
    if (value && value !== quantity) {
      addProductOrder(product, value - quantity);
    }
  };

  const deleteProduct = () => {
    addProductOrder(product, 0);
  };

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
              <Button
                onClick={deleteProduct}
                danger
                type="link"
                shape="circle"
                icon={<CloseOutlined type="" />}
              />
            </Tooltip>
          </Col>
          <Col lg={2}>
            <Title level={4}>{number}</Title>
          </Col>
          <Col lg={4}>
            <Image
              preview={false}
              fallback={DefaultImage}
              src={`${CDN_URL}/${product?.images && product?.images[0]?.urls?.webp?.medium}`}
              alt="Product"
            />
          </Col>
          <Col lg={8}>
            <Row>
              <Col span={24} style={{ lineHeight: 0 }}>
                <Text>{product?.reference?.name}</Text>
              </Col>
              <Col span={24}>
                <Text italic>{product?.barcode}</Text>
              </Col>
              <Col span={24}>
                <Text>
                  <Text strong>Talla:</Text> {product?.size?.value}
                </Text>
              </Col>
              <Col span={24}>
                <Text>
                  <Text strong>Color: </Text> {product?.color?.name}
                </Text>
              </Col>
            </Row>
          </Col>
          <Col lg={5}>
            <InputNumber onChange={onChange} value={quantity} style={{ width: 70 }} min={1} />
          </Col>
          <Col lg={5}>
            <Row style={{ lineHeight: 1, textAlign: 'right' }}>
              <Col span={24}>
                <Text>{numeral(price * quantity - discount).format('$ 0,0')}</Text>
              </Col>
              <Col span={24}>
                {discount > 0 && (
                  <Text italic delete>
                    {numeral(price * quantity).format('$ 0,0')}
                  </Text>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </ListItem>
  );
};

export default ItemResume;
