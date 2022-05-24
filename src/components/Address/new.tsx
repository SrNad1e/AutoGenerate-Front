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
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <FormItem label="Dirección">
              <Row align="middle">
                <Col span={4}>
                  <Input style={styles.inputWidth} />
                </Col>
                <Col span={1}>-</Col>
                <Col span={4}>
                  <Input style={styles.directionInput} />
                </Col>
                <Col span={1}>#</Col>
                <Col span={4}>
                  <Input style={styles.directionInput} />
                </Col>
                <Col span={1}>-</Col>
                <Col span={4}>
                  <Input style={styles.directionInput} />
                </Col>
                <Col span={1}>-</Col>
                <Col span={4}>
                  <Input style={styles.directionInput} />
                </Col>
              </Row>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Barrio" labelCol={{ span: 4 }}>
              {' '}
              <Input style={styles.inputWidth} />
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
          <Col span={12}>
            <FormItem label="Es Principal?" colon={false}>
              <Checkbox />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default NewAddress;
