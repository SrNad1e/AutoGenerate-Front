import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Col, Image, InputNumber, List, Row, Tooltip, Typography } from 'antd';
import numeral from 'numeral';

import type { DetailOrder, Product } from '@/graphql/graphql';

import DefaultImage from '@/assets/default.webp';

import styles from '../styles';

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
      <Card bordered={false} bodyStyle={styles.cardNoPadding}>
        <Row align="middle" gutter={3}>
          <Col span={24} style={styles.colEnd}>
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
          <Col lg={1}>
            <Title level={4}>{number}</Title>
          </Col>
          <Col lg={3}>
            <Image
              preview={false}
              fallback={DefaultImage}
              src={`${CDN_URL}/${product?.images && product?.images[0]?.urls?.webp?.medium}`}
              alt="Product"
            />
          </Col>
          <Col lg={9}>
            <Row>
              <Col span={24} style={styles.titleLine}>
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
          <Col lg={6}>
            <InputNumber
              onChange={onChange}
              value={quantity}
              style={styles.inputNumberWidth}
              min={1}
            />
          </Col>
          <Col lg={5}>
            <Row style={styles.rowStyle}>
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
