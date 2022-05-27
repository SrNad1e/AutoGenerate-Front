import { Checkbox, Col, Form, Input, Modal, Row } from 'antd';

import styles from './styles';

const FormItem = Form.Item;

type Props = {
  visible: boolean;
  onCancel: () => void;
};

const NewAddress = ({ visible, onCancel }: Props) => {
  return (
    <Modal
      visible={visible}
      title="Crear Dirección"
      cancelText="Cancelar"
      okText="Aceptar"
      onCancel={onCancel}
      width={700}
    >
      {' '}
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
                    <Checkbox />
                  </FormItem>
                </Col>
              </Row>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Nombre">
              <Input style={styles.inputWidth} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Telefóno">
              <Input style={styles.inputWidth} />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default NewAddress;
