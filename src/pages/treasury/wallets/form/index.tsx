import {
  DollarOutlined,
  IdcardOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Col, Divider, Form, Input, InputNumber, Modal, Row, Select, Space, Switch } from 'antd';

import styles from './styles';

const FormItem = Form.Item;
const { Option } = Select;

type Props = {
  visible: boolean;
  onCancel: () => void;
  wallets: any;
};

const WalletsForm = ({ visible, onCancel, wallets }: Props) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title={wallets?.id ? 'Editar Cartera' : 'Crear Cartera'}
      okText={wallets?.id ? 'Editar' : 'Crear'}
      cancelText="Cancelar"
      width={400}
    >
      <Form layout="vertical">
        <Row justify="center" gutter={20}>
          {!wallets?.id && (
            <Col span={18}>
              <FormItem label={<Space>{<UserSwitchOutlined />} Cliente </Space>}>
                <Select allowClear showSearch placeholder="Seleccione el Cliente">
                  <Option value="1">Jotaro Koru</Option>
                  <Option value="2">Dio Brandon</Option>
                  <Option value="3">Angelo Lagusa</Option>
                </Select>
              </FormItem>
            </Col>
          )}
          <Col span={18}>
            <FormItem label={<Space>{<IdcardOutlined />} Documento </Space>}>
              <Input defaultValue={wallets?.id ? wallets.document : ''} />
            </FormItem>
          </Col>
          <Col span={18}>
            <FormItem label={<Space>{<UserOutlined />} Nombre </Space>}>
              <Input defaultValue={wallets?.id ? wallets.name : ''} />
            </FormItem>
          </Col>
          <Col span={18}>
            <FormItem label={<Space>{<DollarOutlined />} Cupo </Space>}>
              <InputNumber
                defaultValue={wallets?.id ? wallets.coupon : 0}
                step={100}
                min={0}
                style={styles.inputNumberWidth}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem>
              <Divider>
                <Switch checkedChildren="Activo" unCheckedChildren="Inactivo" defaultChecked />
              </Divider>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default WalletsForm;
