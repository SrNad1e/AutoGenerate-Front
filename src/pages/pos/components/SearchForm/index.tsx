import { BarcodeOutlined, DeleteFilled } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Form, Input, InputNumber, Popconfirm, Row } from 'antd';

import ShopItem from '../ItemShop';

import styles from '../styles';

const FormItem = Form.Item;

const SearchProduct = () => {
  return (
    <>
      <Card bordered size="small">
        <Form layout="inline">
          <Row gutter={[20, 0]} align="middle" style={styles.inputWidth}>
            <Col span={2}>
              <BarcodeOutlined style={styles.fontSizeMajor} />
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
                <InputNumber min={1} size="small" style={styles.inputNumberWidth} />
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
      <Row>
        <Col md={12} xl={12}>
          <ShopItem />
        </Col>
      </Row>
    </>
  );
};

export default SearchProduct;
