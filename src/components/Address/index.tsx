import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, Row, Select, Checkbox } from 'antd';
import { useState } from 'react';

import NewAddress from './new';

import styles from './styles';

const FormItem = Form.Item;
const { Option } = Select;

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
      <Form layout="vertical">
        <Row>
          <Col span={24}>
            <FormItem label="Dirección">
              <Row align="middle" gutter={[0, 20]}>
                <Col span={5}>
                  <Input placeholder="Carrera" style={styles.directionInput} />
                </Col>
                <Col span={5}>
                  <Input placeholder="52" style={styles.directionInput} />
                </Col>
                <Col span={1}>#</Col>
                <Col span={5}>
                  <Input placeholder="84a" style={styles.directionInput} />
                </Col>
                <Col span={1}>-</Col>
                <Col span={5}>
                  <Input placeholder="22" style={styles.directionInput} />
                </Col>
                <Col span={10}>
                  <Input placeholder="Ejemplo: 2do Piso" style={styles.directionInput} />
                </Col>
                <Col span={10}>
                  <Input placeholder="Ejemplo: El Guayabo" style={styles.directionInput} />
                </Col>
                <Col span={4}>
                  <FormItem label="¿Es Principal?" colon={false}>
                    <Checkbox defaultChecked={deliveryAddress?.isMain} />
                  </FormItem>
                </Col>
              </Row>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Nombre del Contacto">
              <Input defaultValue={deliveryAddress?.name} style={styles.inputWidth} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Telefóno del Contacto">
              <Input defaultValue={deliveryAddress?.phone} style={styles.inputWidth} />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <NewAddress visible={visibleCreate} onCancel={closeCreate} />
    </>
  );
};

export default Address;
