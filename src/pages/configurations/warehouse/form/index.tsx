import type { Warehouse } from '@/graphql/graphql';
import { DropboxOutlined, NumberOutlined } from '@ant-design/icons';
import { Col, Form, Input, InputNumber, Modal, Row, Space, Switch, Typography } from 'antd';
import { useState } from 'react';
import styles from '../styles';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import { useCreateWarehouse } from '@/hooks/warehouse.hooks';

const FormItem = Form.Item;
const { Text } = Typography;

type Props = {
  visible: boolean;
  onCancel: () => void;
  warehouseData: Partial<Warehouse>;
};

const WarehouseForm = ({ onCancel, visible, warehouseData }: Props) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const isNew = !warehouseData._id;

  const [form] = Form.useForm();

  const [createWarehouse /*paramsCreateWarehouse*/] = useCreateWarehouse();
  /**
   * @description Cierra el modal, resetea los campos del form y al alerta de error
   */
  const closeAndClear = async () => {
    await onCancel();
    form.resetFields();
  };

  /**
   * @description funcion usada por los hooks para mostrar los errores
   * @param message mensaje de error a mostrar
   */
  const showError = (message: string) => {
    setAlertInformation({
      message,
      type: 'error',
      visible: true,
    });
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

  /**
   * @description ejecuta la mutation para crear una nueva talla
   */
  const createNewWarehouse = async () => {
    const values = await form.validateFields();
    try {
      const response = await createWarehouse({
        variables: {
          input: values,
        },
      });
      if (response?.data?.createWarehouse) {
        setAlertInformation({
          message: `Bodega ${response?.data?.createWarehouse?.name} creada correctamente`,
          type: 'success',
          visible: true,
        });
      }
    } catch (e: any) {
      showError(e?.message);
    }
  };

  return (
    <Modal
      visible={visible}
      width={400}
      okText={isNew ? 'Crear' : 'Actualizar'}
      onCancel={closeAndClear}
      onOk={isNew ? () => createNewWarehouse() : () => {}}
      cancelText="Cancelar"
      destroyOnClose
      title={isNew ? 'Crear Bodega' : 'Actualizar Bodega'}
      cancelButtonProps={{
        style: { borderRadius: 5 },
      }}
      okButtonProps={{ style: { borderRadius: 5 } }}
    >
      <Form form={form} layout="vertical" style={styles.centerForm}>
        <Row>
          <Col span={24}>
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
                  <DropboxOutlined />
                  <Text>Nombre</Text>
                </Space>
              }
            >
              <Input placeholder="Ingrese nombre" />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="max"
              label={
                <Space>
                  <NumberOutlined />
                  <Text>Máximo Stock</Text>
                </Space>
              }
            >
              <InputNumber controls={false} min={1} />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: 'Este campo no puede estar vacio',
                },
              ]}
              name="min"
              label={
                <Space>
                  <NumberOutlined />
                  <Text>Minimo Stock</Text>
                </Space>
              }
            >
              <InputNumber controls={false} min={1} />
            </FormItem>
            {!isNew && (
              <FormItem valuePropName="checked" name="active" label="Activo">
                <Switch checked />
              </FormItem>
            )}
          </Col>
        </Row>
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
    </Modal>
  );
};

export default WarehouseForm;
