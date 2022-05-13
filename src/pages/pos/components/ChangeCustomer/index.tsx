import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, Modal, Row, Select } from 'antd';
import { useState } from 'react';

import styles from '../styles';

export type Props = {
  visible: boolean;
  onCancel: () => void;
};

const FormItem = Form.Item;
const { Option } = Select;

const ModalChangeClient = ({ visible, onCancel }: Props) => {
  const [newClient, setNewClient] = useState(false);

  const renderSearchClient = () => (
    <>
      <Form>
        <FormItem>
          <Input.Search
            enterButton="Buscar"
            size="large"
            autoFocus
            placeholder="Nombre o Identificación"
          />
        </FormItem>
      </Form>
      <Button icon={<PlusOutlined />} type="primary" onClick={() => setNewClient(true)}>
        Crear Cliente
      </Button>
    </>
  );

  const renderNewClient = () => (
    <Form layout="vertical">
      <FormItem label="Tipo de Documento">
        <Select style={styles.inputWidth} size="large">
          <Option key="CC" value="CC">
            C.C.
          </Option>
          <Option key="CC" value="nit">
            NIT
          </Option>
        </Select>
      </FormItem>
      <FormItem label="Documento" required>
        <Input autoFocus style={styles.inputWidth} size="large" />
      </FormItem>
      <FormItem label="Nombres" required>
        <Input style={styles.inputWidth} size="large" />
      </FormItem>
      <FormItem label="Apellidos" required>
        <Input style={styles.inputWidth} size="large" />
      </FormItem>
      <FormItem label="Telefono">
        <Input style={styles.inputWidth} size="large" />
      </FormItem>
      <FormItem label="Email">
        <Input style={styles.inputWidth} size="large" />
      </FormItem>
      <Divider />
      <Row>
        <Col span={12}>
          <Button onClick={() => setNewClient(false)}>Cancelar</Button>
        </Col>
        <Col span={4} offset={8}>
          <Button type="primary" htmlType="submit">
            Registrar
          </Button>
        </Col>
      </Row>
    </Form>
  );

  return (
    <Modal
      title={newClient ? 'Registro Cliente' : 'Buscar Cliente'}
      visible={visible}
      footer={false}
      onCancel={onCancel}
      destroyOnClose
    >
      {newClient ? renderNewClient() : renderSearchClient()}
    </Modal>
  );
};

export default ModalChangeClient;
