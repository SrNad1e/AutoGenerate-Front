import { DollarCircleOutlined, ShopOutlined, SolutionOutlined } from '@ant-design/icons';
import { Col, Form, Input, InputNumber, Modal, Row, Select, Space, Typography } from 'antd';

import styles from '../styles';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;

type Props = {
  visible: boolean;
  onCancel: () => void;
};
const ExpensesForm = ({ visible, onCancel }: Props) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title="Crear Egreso"
      okText="Crear"
      cancelText="Cancelar"
    >
      <Form layout="vertical">
        <Row>
          <Col span={12}>
            <FormItem
              label={
                <Space>
                  <ShopOutlined />
                  <Text>Caja</Text>
                </Space>
              }
            >
              <Select placeholder="Seleccione Caja" style={styles.InputFormWIdth}>
                <Option value="Caja 1">Caja 1</Option>
                <Option value="Caja 2">Caja 2</Option>
                <Option value="Caja 3">Caja 3</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label={
                <Space>
                  <DollarCircleOutlined />
                  <Text>Valor</Text>
                </Space>
              }
            >
              <InputNumber
                style={styles.InputFormWIdth}
                min={1}
                step={100}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              label={
                <Space>
                  <SolutionOutlined />
                  <Text>Concepto</Text>
                </Space>
              }
            >
              <TextArea />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ExpensesForm;
