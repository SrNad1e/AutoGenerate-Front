import { BarcodeOutlined, DeleteFilled } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Form, Input, InputNumber, Popconfirm, Row } from 'antd';
import ShopItem from './ShopItem';

const FormItem = Form.Item;

const SearchProduct = () => {
  const product: PRODUCT.Product = {
    stock: [
      {
        quantity: 3,
        warehouse: {
          name: 'Bodega 1',
        },
      },
    ],
    barcode: '7700000471390',
    color: {
      name: 'Estampado',
    },
    size: {
      value: 'XL',
    },
    reference: {
      name: '2020',
      description: 'Cachetero esmeralda',
      price: 8000,
    },
  };

  return (
    <div style={{ height: '95vh' }}>
      <Card bordered size="small">
        <Row style={{ height: 30 }}>
          <Form layout="vertical">
            <Col span={24} style={{ display: 'flex', height: 30 }}>
              <BarcodeOutlined style={{ fontSize: 25, paddingTop: 2 }} />
              <FormItem style={{ marginLeft: 25, width: 500 }}>
                <Input
                  style={{ width: '100%' }}
                  size="small"
                  placeholder="Código - Referencia"
                  autoFocus
                />
              </FormItem>
              <Col span={4} style={{ display: 'flex', marginTop: 5, marginLeft: 10 }}>
                <Checkbox>Sin Stock</Checkbox>
                <Col span={2} style={{ marginLeft: 10, bottom: 5 }}>
                  <FormItem>
                    <InputNumber min={1} size="small" style={{ width: 50 }} />
                  </FormItem>
                </Col>
              </Col>
              <Col span={4} style={{ marginLeft: 25 }}>
                <FormItem>
                  <Button size="small" htmlType="submit" type="primary">
                    Agregar
                  </Button>
                </FormItem>
              </Col>
            </Col>
          </Form>
          <Col
            span={24}
            style={{
              display: 'flex',
              position: 'relative',
              justifyContent: 'flex-end',
              bottom: 30,
            }}
          >
            <Popconfirm
              title="¿Estás seguro que deseas cancelar el carrito?"
              onConfirm={() => history.back()}
              okText="Si, cancelar"
              cancelText="No"
            >
              <Button danger type="primary" style={{ borderRadius: 10 }} icon={<DeleteFilled />}>
                Cancelar
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      </Card>
      <Row>
        <Col xxl={8} lg={12}>
          <ShopItem {...product} />
        </Col>
      </Row>
    </div>
  );
};

export default SearchProduct;
