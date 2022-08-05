import { useEffect, useState } from 'react';
import { Alert, Col, Form, Input, InputNumber, Modal, Row, Space, Switch, Typography } from 'antd';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import AlertLoading from '../Alerts/AlertLoading';
import { useCreateSize, useUpdateSize } from '@/hooks/size.hooks';
import type { Size } from '@/graphql/graphql';
import { FontSizeOutlined, SortAscendingOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const { Text } = Typography;

export type Props = {
  modalVisible: boolean;
  current?: Partial<Size>;
  onCancel: () => void;
};

const CreateSizes = ({ current, modalVisible, onCancel }: Props) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [error, setError] = useState<string | null>(null);

  const [form] = Form.useForm();

  const [createSize, paramsCreate] = useCreateSize();
  const [updateSize, paramsUpdate] = useUpdateSize();

  const isNew = !current?._id;

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
   * @description Cierra el modal, resetea los campos del form y al alerta de error
   */
  const closeAndClear = async () => {
    await onCancel();
    setError('');
    form.resetFields();
  };

  /**
   * @description cierra la alerta y el modal
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
   * @description ejecuta la mutation para actualizar una talla
   */
  const editSize = async () => {
    const values = await form.validateFields();
    try {
      let errorLocal = 'No hay cambios para aplicar';

      Object.keys(values).forEach((i) => {
        if (values[i] !== (current && current[i])) {
          errorLocal = '';
          return;
        }
      });
      if (errorLocal) {
        setError(errorLocal);
      } else {
        const response = await updateSize({
          variables: {
            input: values,
            id: current?._id || '',
          },
        });
        if (response?.data?.updateSize) {
          setAlertInformation({
            message: `Talla ${response?.data?.updateSize?.value} actualizada correctamente`,
            type: 'success',
            visible: true,
          });
        }
      }
    } catch (e: any) {
      showError(e?.message);
    }
  };

  /**
   * @description ejecuta la mutation para crear una nueva talla
   */
  const createNewSize = async () => {
    const values = await form.validateFields();
    try {
      delete values.active;
      const response = await createSize({
        variables: {
          input: values,
        },
      });
      if (response?.data?.createSize) {
        setAlertInformation({
          message: `Talla ${response?.data?.createSize?.value} creada correctamente`,
          type: 'success',
          visible: true,
        });
      }
    } catch (e: any) {
      showError(e?.message);
    }
  };

  useEffect(() => {
    setError(null);
  }, [modalVisible]);

  return (
    <Modal
      okText={isNew ? 'Crear' : 'Actualizar'}
      cancelText="Cancelar"
      destroyOnClose
      title={isNew ? 'Crear Talla' : 'Actualizar Talla'}
      visible={modalVisible}
      onCancel={() => closeAndClear()}
      onOk={() => (isNew ? createNewSize() : editSize())}
      okButtonProps={{
        style: { borderRadius: 5 },
        loading: paramsCreate.loading || paramsUpdate.loading,
      }}
      cancelButtonProps={{
        style: { borderRadius: 5 },
        loading: paramsCreate.loading || paramsUpdate.loading,
      }}
    >
      <Form
        form={form}
        initialValues={current}
        layout="vertical"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Row>
          <Col span={24}>
            <FormItem
              label={
                <Space>
                  <FontSizeOutlined />
                  <Text>Valor</Text>
                </Space>
              }
              name="value"
              rules={[{ required: true, message: 'Nombre obligatorio', min: 1 }]}
            >
              <Input placeholder="" autoFocus maxLength={45} style={{ width: '80%' }} />
            </FormItem>
            <FormItem
              label={
                <Space>
                  <SortAscendingOutlined />
                  <Text>Ordenamiento</Text>
                </Space>
              }
              name="weight"
              rules={[{ required: true, message: 'La posición es obligatoria' }]}
            >
              <InputNumber controls={false} />
            </FormItem>
            <FormItem
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
              label="Activo"
              name="active"
              valuePropName="checked"
            >
              <Switch defaultChecked />
            </FormItem>
            {error && <Alert type="error" message={error} showIcon />}
          </Col>
        </Row>
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <AlertLoading visible={paramsCreate?.loading} message="Creando Talla" />
      <AlertLoading visible={paramsUpdate?.loading} message="Actualizando Talla" />
    </Modal>
  );
};

export default CreateSizes;
