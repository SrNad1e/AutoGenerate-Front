import { Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select, Switch, Tabs } from 'antd';
import locale from 'antd/es/date-picker/locale/es_ES';
import 'moment/locale/es-mx';

import Address from '@/components/Address';

import styles from '../styles';
import { WhatsAppOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const { TabPane } = Tabs;
const { Option } = Select;

type Props = {
  visible: boolean;
  onCancel: () => void;
};

const FormCustmer = ({ visible, onCancel }: Props) => {
  return (
    <Modal
      visible={visible}
      title="Crear Cliente"
      width={470}
      cancelText="Cancelar"
      okText="Crear"
      onCancel={onCancel}
    >
      <Tabs>
        <TabPane tab="Datos" key="1">
          <Form>
            <Row gutter={20}>
              <Col span={20}>
                <FormItem label="Documento" labelCol={{ span: 7 }}>
                  <Input
                    addonBefore={
                      <Select bordered={false} size="small" defaultValue={'CC'}>
                        <Option value="CC">CC</Option>
                        <Option value="NIT">NIT</Option>
                        <Option value="TI">TI</Option>
                      </Select>
                    }
                  />
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem label="Nombre" labelCol={{ span: 7 }}>
                  <Input />
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem label="Apellido" labelCol={{ span: 7 }}>
                  <Input />
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem label="Correo" labelCol={{ span: 7 }}>
                  <Input />
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem label="Teléfono" labelCol={{ span: 7 }}>
                  <Input suffix={'whatsapp' && <WhatsAppOutlined />} />
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem label="Nacimiento" labelCol={{ span: 7 }}>
                  <DatePicker
                    locale={locale}
                    placeholder="Seleccione Fecha"
                    style={styles.dateWidth}
                  />
                </FormItem>
              </Col>
              <Col span={18}>
                <FormItem label="Tipo de Cliente" labelCol={{ span: 8 }}>
                  <Select>
                    <Option value="Distribuidor">Distribuidor</Option>
                    <Option value="Mayorista">Mayorista</Option>
                    <Option value="Detal">Detal</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span={8} offset={4}>
                <FormItem label="Por Defecto">
                  <Checkbox />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="Activo">
                  <Switch />
                </FormItem>
              </Col>
            </Row>
          </Form>
        </TabPane>
        <TabPane tab="Direcciones" key="2">
          <Address />
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default FormCustmer;
