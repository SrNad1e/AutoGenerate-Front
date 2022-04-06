import { BarcodeOutlined, DeleteFilled } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Form, Input, InputNumber, Popconfirm, Row } from 'antd';
import { useState } from 'react';
import ShopItems from './ShopItems';

const FormItem = Form.Item;

const SearchProduct = () => {
  const [product] = useState<Partial<PRODUCT.Product>>({});
  return (
    <div style={{ height: '95vh' }}>
      <Card bordered size="small">
        <Row>
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
              </Col>
              <Col span={2} style={{ display: 'flex' }}>
                <FormItem>
                  <InputNumber min={1} size="small" style={{ width: 50 }} />
                </FormItem>
              </Col>
              <Col span={2} style={{ height: 30, marginRight: 20 }}>
                <FormItem>
                  <Button size="small" htmlType="submit" type="primary">
                    Agregar
                  </Button>
                </FormItem>
              </Col>
              <Col span={2} style={{ display: 'flex' }}>
                <Popconfirm
                  title="¿Estás seguro que deseas cancelar el carrito?"
                  onConfirm={() => history.back()}
                  okText="Si, cancelar"
                  cancelText="No"
                >
                  <Button danger type="primary" icon={<DeleteFilled />}>
                    Cancelar
                  </Button>
                </Popconfirm>
              </Col>
            </Col>
          </Form>
        </Row>
      </Card>
      <Row>
        <Col xxl={8} lg={12}>
          <ShopItems product={product} />
        </Col>
      </Row>
    </div>
  );
};

export default SearchProduct;
