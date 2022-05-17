import { BarcodeOutlined, DeleteFilled } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Form, Input, InputNumber, Popconfirm, Row } from 'antd';

import ShopItem from '../ItemShop';

const FormItem = Form.Item;

const SearchProduct = () => {
  return (
    <Row>
      <Col span={24}>
        <Card bordered size="small">
          <Form layout="inline">
            <Row gutter={[20, 0]} align="middle">
              <Col span={2}>
                <BarcodeOutlined
                  style={{
                    fontSize: 30,
                  }}
                />
              </Col>
              <Col span={8}>
                <FormItem>
                  <Input size="small" placeholder="Código, Referencia" autoFocus />
                </FormItem>
              </Col>
              <Col span={4}>
                <Checkbox>Sin Stock</Checkbox>
              </Col>
              <Col span={2}>
                <FormItem>
                  <InputNumber
                    min={1}
                    size="small"
                    controls={false}
                    style={{
                      width: 50,
                    }}
                  />
                </FormItem>
              </Col>
              <Col span={4}>
                <FormItem>
                  <Button size="small" htmlType="submit" type="primary">
                    Agregar
                  </Button>
                </FormItem>
              </Col>
              <Col span={4}>
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
            </Row>
          </Form>
        </Card>
      </Col>
      <Col span={24}>
        <Row
          style={{
            padding: 10,
          }}
          gutter={[16, 16]}
        >
          <Col>
            <ShopItem />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SearchProduct;
