import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import { useState } from 'react';
import styles from './styles.less';

export type Props = {
  visible: boolean;
  onCancel: () => void;
};

const FormItem = Form.Item;

const ModalChangeClient = ({ visible, onCancel }: Props) => {
  const [newClient, setNewClient] = useState(false);

  const renderSearchClient = () => (
    <>
      <Form>
        <FormItem>
          <Input.Search
            style={{ width: '90%' }}
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

  const formLayout = {
    labelCol: { xs: 12, className: styles.formLabel },
    wrapperCol: { xs: 12, className: styles.formInput },
    labelAlign: 'left',
    className: styles.formItem,
  };

  const renderNewClient = () => (
    <Form>
      <div className={styles.formCustomer}>
        <FormItem label="Tipo de Documento" {...formLayout}>
          <Select style={{ width: '100%' }} size="large">
            <Option key="CC" value="CC">
              C.C.
            </Option>
            <Option key="CC" value="nit">
              NIT
            </Option>
          </Select>
        </FormItem>
        <FormItem label="Documento" required {...formLayout}>
          <Input autoFocus style={{ width: '100%' }} size="large" />
        </FormItem>
        <FormItem label="Nombres" required {...formLayout}>
          <Input autoFocus style={{ width: '100%' }} size="large" />
        </FormItem>
        <FormItem label="Apellidos" required {...formLayout}>
          <Input autoFocus style={{ width: '100%' }} size="large" />
        </FormItem>
        <FormItem label="Telefono" {...formLayout}>
          <Input autoFocus style={{ width: '100%' }} size="large" />
        </FormItem>
        <FormItem label="Email" {...formLayout}>
          <Input autoFocus style={{ width: '100%' }} size="large" />
        </FormItem>
      </div>
      <FormItem>
        <Row style={{ marginTop: 15 }}>
          <Col span={12}>
            <Button onClick={() => setNewClient(false)}>Cancelar</Button>
          </Col>
          <Col span={4} offset={8}>
            <Button type="primary" htmlType="submit">
              Registrar
            </Button>
          </Col>
        </Row>
      </FormItem>
    </Form>
  );

  return (
    <Modal
      title={newClient ? 'Registro Cliente' : 'Buscar Cliente'}
      visible={visible}
      footer={null}
      onCancel={onCancel}
      destroyOnClose
    >
      {newClient ? renderNewClient() : renderSearchClient()}
    </Modal>
  );
};

export default ModalChangeClient;
