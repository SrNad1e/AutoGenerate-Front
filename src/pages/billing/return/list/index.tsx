import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Divider, Form, Input, Row, Select, Space, Typography } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
const { Text } = Typography;

const ReturnList = () => {
  return (
    <PageContainer>
      <Card>
        <Form>
          <Row gutter={[10, 0]}>
            <Col span={5}>
              <FormItem label="Código Pedido">
                <Input />
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem label="Código Cupón">
                <Input />
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem label="Código Factura">
                <Input />
              </FormItem>
            </Col>
            <Col span={7}>
              <FormItem label="Tienda">
                <Select showSearch placeholder="Seleccione una tienda">
                  <Option value="Gucci">Gucci</Option>
                  <Option value="Toulouse">Toulouse</Option>
                  <Option>Louis Vuitton</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem>
                <Space>
                  <Button icon={<SearchOutlined />} type="primary" htmlType="submit">
                    Buscar
                  </Button>
                  <Button htmlType="button" onClick={() => {}}>
                    Limpiar
                  </Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Divider style={{ margin: 0 }} />
        <Row>
          <Col span={18}>
            <Button icon={<PlusOutlined />} shape="round" color="primary">
              Nuevo
            </Button>
          </Col>
          <Col span={6}>
            <Space>
              <Text strong>Total Encontrados:</Text>
              <Text>{10}</Text>
              <Text strong>Pagina</Text>
              <Text>1/1</Text>
            </Space>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default ReturnList;
