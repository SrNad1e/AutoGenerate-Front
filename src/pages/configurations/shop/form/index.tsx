import type { Shop } from '@/graphql/graphql';
import { Checkbox, Col, Form, Input, InputNumber, Modal, Row, Space, Typography } from 'antd';
import { useState } from 'react';
import styles from '../styles';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import {
  DollarOutlined,
  DropboxOutlined,
  HomeOutlined,
  PhoneOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import SelectWarehouses from '@/components/SelectWarehouses';

const FormItem = Form.Item;
const { Text } = Typography;

type Props = {
  visible: boolean;
  onCancel: () => void;
  shop: Shop;
};

const ShopForm = ({ visible, onCancel, shop }: Props) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });

  const isNew = !shop?._id;

  const [form] = Form.useForm();

  /**
   * @description Cierra el modal, resetea los campos del form y al alerta de error
   */
  const closeAndClear = async () => {
    await onCancel();
    form.resetFields();
  };

  /**
   * @description cierra la alerta y resetea los campos del form
   */
  const closeAlertInformation = () => {
    setAlertInformation({
      message: '',
      type: 'error',
      visible: false,
    });
    closeAndClear();
  };

  return (
    <Modal
      visible={visible}
      width={400}
      okText={isNew ? 'Crear' : 'Actualizar'}
      onCancel={closeAndClear}
      onOk={isNew ? () => {} : () => {}}
      cancelText="Cancelar"
      destroyOnClose
      title={isNew ? 'Crear Usuario' : 'Actualizar Usuario'}
    >
      <Form form={form} layout="vertical" style={styles.centerForm}>
        <Row>
          <Col span={24}>
            <FormItem
              name="address"
              label={
                <Space>
                  <HomeOutlined />
                  <Text>Dirección</Text>
                </Space>
              }
            >
              <Input />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="name"
              label={
                <Space>
                  <ShopOutlined />
                  <Text>Nombre</Text>
                </Space>
              }
            >
              <Input placeholder="Ingrese nombre de la tienda" />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="defaultWarehouseId"
              label={
                <Space>
                  <DropboxOutlined />
                  <Text>Bodega por Defecto</Text>
                </Space>
              }
            >
              <SelectWarehouses />
            </FormItem>
            <FormItem
              name="warehouseMainId"
              label={
                <Space>
                  <DropboxOutlined />
                  <Text>Bodega Principal</Text>
                </Space>
              }
            >
              <SelectWarehouses />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="phone"
              label={
                <Space>
                  <PhoneOutlined />
                  <Text>Teléfono</Text>
                </Space>
              }
            >
              <Input />
            </FormItem>
            <FormItem
              name="goal"
              label={
                <Space>
                  <DollarOutlined />
                  <Text>Meta</Text>
                </Space>
              }
            >
              <InputNumber />
            </FormItem>
            <FormItem>
              <Checkbox>¿Es Centro de distribución?</Checkbox>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default ShopForm;
