import { Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select, Switch } from 'antd';
import locale from 'antd/es/date-picker/locale/es_ES';
import 'moment/locale/es-mx';

import styles from '../styles';

const { Option } = Select;
const FormItem = Form.Item;

type Props = {
  visible: boolean;
  onCancel: () => void;
};

const EditCustomer = ({ visible, onCancel }: Props) => {
  const datatest = {
    customer: { name: 'Jotaro', lastName: 'Kujo', document: 1001010010 },
    email: 'jotarokujo@gmail.com',
    active: true,
    createdAt: '2022-05-04T18:10:20.727Z',
    phone: 313043299,
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      cancelText="Cancelar"
      okText="Editar"
      title="Editar Cliente"
    >
      <Form>
        <Row gutter={20}>
          <Col span={20}>
            <FormItem label="Documento" labelCol={{ span: 7 }}>
              <Input
                defaultValue={datatest.customer.document}
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
              <Input defaultValue={datatest?.customer.name} />
            </FormItem>
          </Col>
          <Col span={20}>
            <FormItem label="Apellido" labelCol={{ span: 7 }}>
              <Input defaultValue={datatest.customer.lastName} />
            </FormItem>
          </Col>
          <Col span={20}>
            <FormItem label="Correo" labelCol={{ span: 7 }}>
              <Input defaultValue={datatest.email} />
            </FormItem>
          </Col>
          <Col span={20}>
            <FormItem label="Teléfono" labelCol={{ span: 7 }}>
              <Input defaultValue={datatest.phone} />
            </FormItem>
          </Col>
          <Col span={20}>
            <FormItem label="Nacimiento" labelCol={{ span: 7 }}>
              <DatePicker locale={locale} style={styles.dateWidth} />
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
              <Switch defaultChecked={datatest.active} />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditCustomer;
