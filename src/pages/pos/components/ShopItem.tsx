import { BarcodeOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import numeral from 'numeral';

const ShopItem = (product: PRODUCT.Product) => {
  return (
    <Card
      style={{ borderRadius: 5, minHeight: 380, margin: 10 }}
      bodyStyle={{ padding: 0, borderRadius: 5 }}
    >
      <Row>
        <Col xxl={12} lg={12} style={{ overflowX: 'hidden' }}>
          <img
            style={{ borderRadius: 5, height: 360 }}
            src={'https://i.pinimg.com/564x/15/a7/42/15a742d487f1106f5fef26d3ae0a1057.jpg'}
          />
        </Col>
        <Col
          xxl={12}
          lg={12}
          style={{ display: 'flex', flexDirection: 'column', padding: 10, lineHeight: 1.9 }}
        >
          <Text style={{ fontSize: 11, fontWeight: 'bold', lineHeight: 1.4 }}>Referencia</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1 }}>
            {product?.reference}
          </Text>
          <Text style={{ fontSize: 14, fontStyle: 'italic' }}>{product?.description}</Text>
          <Row>
            <Col span={9}>
              <Text>
                <Text style={{ fontWeight: 'bold' }}>Talla</Text> {product?.size?.value}
              </Text>
            </Col>
            <Col span={11}>
              <Text style={{ display: 'flex', overflowX: 'hidden' }}>
                <span style={{ fontWeight: 'bold', marginRight: 3 }}>Color</span>{' '}
                {product?.color?.name}
              </Text>
            </Col>
            <Col
              span={4}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <div
                style={{
                  backgroundColor: product?.color?.html,
                  borderRadius: '50%',
                  height: 20,
                  width: 20,
                  border: 'solid 1px black',
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={10} style={{ height: 30, display: 'flex', alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>Precio</Text>
            </Col>
            <Col span={14} style={{ fontSize: 20, display: 'flex', justifyContent: 'right' }}>
              <Text>{numeral(product?.price).format('$ 0,0')}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <BarcodeOutlined />
            </Col>
            <Col span={20} style={{ display: 'flex', justifyContent: 'right' }}>
              <Text style={{ fontSize: 14 }}>{product?.barcode}</Text>
            </Col>
          </Row>

          <Row
            style={{ fontSize: 20, display: 'flex', justifyContent: 'center', marginBottom: 10 }}
          >
            {((product?.stock && product?.stock[0]?.quantity) || 0) > 0 ? (
              <Row>
                <Col span={14}>
                  <Text style={{ fontWeight: 'bold' }}>Unidades Disponibles</Text>
                </Col>
                <Col span={10} style={{ fontSize: 30, display: 'flex', justifyContent: 'right' }}>
                  <Text>{product?.stock && product?.stock[0].quantity}</Text>
                </Col>
                <Input
                  min={1}
                  value={product?.stock && product?.stock[0].quantity}
                  onChange={(e: any) => e.target.value}
                  style={{
                    display: 'flex',
                    width: 60,
                    fontSize: 30,
                    marginTop: 20,
                    textAlign: 'center',
                    left: 70,
                  }}
                />
              </Row>
            ) : (
              <Text
                style={{
                  fontSize: 30,
                  marginTop: 25,
                  marginBottom: 25,
                  lineHeight: 1.4,
                  paddingTop: 20,
                }}
              >
                SIN STOCK
              </Text>
            )}
          </Row>
          <Row
            style={{
              fontSize: 20,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              disabled={!(((product?.stock && product?.stock[0]?.quantity) || 0) > 0)}
              style={{ width: '80%' }}
              type="primary"
              onClick={() => {}}
            >
              Agregar
            </Button>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default ShopItem;
