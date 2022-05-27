import { Form, InputNumber, Modal, Row, Col, Switch, Tabs } from 'antd';
import moment from 'moment';

import BoxCount from '../../reports/boxCount';
import CashRegister from '../../reports/cashRegister';

import styles from '../styles';

const FormItem = Form.Item;
const { TabPane } = Tabs;

type Props = {
  visible: boolean;
  onCancel: () => void;
  onOk?: () => void;
};

const EditClose = ({ visible, onCancel, onOk }: Props) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title={`Actualizar cierre - ${moment().format('DD/MM/YYYY')} - ${'Louis Vuitton XVI'}`}
      okText="Actualizar"
      cancelText="Cancelar"
      onOk={onOk}
    >
      <Form layout="vertical">
        <Row>
          <Col xs={12} lg={7}>
            <FormItem label="Efectivo">
              <InputNumber
                style={styles.inputNumberWidth}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                value={2}
              />
            </FormItem>
          </Col>
          <Col xs={12} lg={7}>
            <FormItem label="Costo operacional">
              <InputNumber
                style={styles.inputNumberWidth}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                value={1}
              />
            </FormItem>
          </Col>
          <Col xs={12} lg={6}>
            <FormItem label="Comprobantes">
              <InputNumber value={1} />
            </FormItem>
          </Col>
          <Col xs={12} lg={4}>
            <FormItem label="Verificado">
              <Switch />
            </FormItem>
          </Col>
        </Row>
        <Tabs type="card">
          <TabPane tab="Cierre" key="1">
            <div style={styles.displayFormat}>
              <CashRegister />
            </div>
          </TabPane>
          <TabPane tab="Arqueo" key="2">
            <div style={styles.displayFormat}>
              <BoxCount />
            </div>
          </TabPane>
        </Tabs>
      </Form>
    </Modal>
  );
};

export default EditClose;
