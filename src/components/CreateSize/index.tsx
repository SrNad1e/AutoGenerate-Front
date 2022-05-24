import { useState } from 'react';
import { Alert, Form, Input, Modal, Switch } from 'antd';

import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import AlertInformation from '@/components/Alerts/AlertInformation';
import AlertLoading from '../Alerts/AlertLoading';
import { useCreateSize, useUpdateSize } from '@/hooks/size.hooks';
import type { Size } from '@/graphql/graphql';

const FormItem = Form.Item;

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
    try {
      const values = await form.validateFields();
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
    try {
      const values = await form.validateFields();
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

  return (
    <Modal
      okText="Aceptar"
      cancelText="Cancelar"
      destroyOnClose
      title={isNew ? 'Nuevo' : 'Editar'}
      visible={modalVisible}
      onCancel={() => closeAndClear()}
      onOk={() => (isNew ? createNewSize() : editSize())}
    >
      <Form form={form} initialValues={current}>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          label="Nombre"
          name="value"
          rules={[{ required: true, message: 'Nombre obligatorio', min: 1 }]}
        >
          <Input placeholder="" autoFocus maxLength={45} />
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
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <AlertLoading visible={paramsCreate?.loading} message="Creando Talla" />
      <AlertLoading visible={paramsUpdate?.loading} message="Actualizando Talla" />
    </Modal>
  );
};

export default CreateSizes;
