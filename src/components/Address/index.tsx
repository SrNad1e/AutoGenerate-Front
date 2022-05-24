import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, Row, Select, Typography, Checkbox } from 'antd';
import { useState } from 'react';

import NewAddress from './new';

import styles from './styles';

const FormItem = Form.Item;
const { Option } = Select;
const { Title } = Typography;

type Props = {
  deliveryAddress?: any;
};

const Address = ({ deliveryAddress }: Props) => {
  const [visibleCreate, setVisibleCreate] = useState(false);

  const closeCreate = () => {
    setVisibleCreate(false);
  };

  return (
    <>
      {deliveryAddress ? (
        <>
          <Divider style={styles.dividerMargin}>
            <Select defaultValue="Direccion Guardada #1">
              <Option value="Direccion Guardada #1">Direccion Guardada #1</Option>
              <Option value="Direccion Guardada #2">Direccion Guardada #2</Option>
              <Option value="Direccion Guardada #3">Direccion Guardada #3</Option>
            </Select>
            <Divider type="vertical" />
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setVisibleCreate(true)}>
              Crear
            </Button>
          </Divider>
          <Form layout="horizontal">
            <Row gutter={[0, 10]}>
              <Col span={24}>
                <FormItem label="Dirección">
                  <Row align="middle">
                    <Col span={4}>
                      <Input defaultValue="Carrera" style={styles.directionInput} />
                    </Col>
                    <Col span={1}>-</Col>
                    <Col span={4}>
                      <Input defaultValue="52" style={styles.directionInput} />
                    </Col>
                    <Col span={1}>#</Col>
                    <Col span={4}>
                      <Input defaultValue="84a" style={styles.directionInput} />
                    </Col>
                    <Col span={1}>-</Col>
                    <Col span={4}>
                      <Input defaultValue="22" style={styles.directionInput} />
                    </Col>
                    <Col span={1}>-</Col>
                    <Col span={4}>
                      <Input defaultValue="2do Piso" style={styles.directionInput} />
                    </Col>
                  </Row>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="Barrio" labelCol={{ span: 4 }}>
                  {' '}
                  <Input defaultValue={deliveryAddress.city} style={styles.inputWidth} />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="Nombre">
                  <Input defaultValue={deliveryAddress.name} style={styles.inputWidth} />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="Telefóno">
                  <Input defaultValue={deliveryAddress?.phone} style={styles.inputWidth} />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="Es Principal?" colon={false}>
                  <Checkbox defaultChecked={deliveryAddress.isMain} />
                </FormItem>
              </Col>
            </Row>
          </Form>
        </>
      ) : (
        <Title level={3}>No registra dirección</Title>
      )}
      <NewAddress visible={visibleCreate} onCancel={closeCreate} />
    </>
  );
};

export default Address;
