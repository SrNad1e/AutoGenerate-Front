import { Alert, Form, Input, Modal, Switch } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

import { useState } from 'react';
import AlertInformation from '../Alerts/AlertInformation';
import type { Props as PropsAlertInformation } from '@/components/Alerts/AlertInformation';
import { useCreateColor, useUpdateColor } from '@/hooks/color.hooks';
import AlertLoading from '../Alerts/AlertLoading';
import ImageAdmin from '../ImageAdmin';

export type Props = {
  modalVisible: boolean;
  current?: Partial<COLOR.Color>;
  onCancel: () => void;
  error?: string | null;
  onOk?: () => void;
};

const CreateColors = ({ current, modalVisible, onCancel }: Props) => {
  const [alertInformation, setAlertInformation] = useState<PropsAlertInformation>({
    message: '',
    type: 'error',
    visible: false,
  });
  const [error, setError] = useState('');

  const [form] = Form.useForm();
  const isNew = !current?._id;

  /** Funciones ejecutadas por los hooks */

  /**
   * @description funcion usada por los hooks para mostrar la alerta de creacion
   */
  const resultCreate = () => {
    setAlertInformation({
      message: 'Color creado correctamente',
      type: 'success',
      visible: true,
    });
  };

  /**
   * @description funcion usada por los hooks para mostrar la alerta de actualizacion
   */
  const resultUpdate = (dataColor: Partial<COLOR.Color>) => {
    setAlertInformation({
      message: `Color ${dataColor.name} ha sido actualizado correctamente`,
      type: 'success',
      visible: true,
    });
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

  /** Fin de Funciones ejecutadas por los hooks */

  /** Hooks para manejo de consultas */

  const { createColor, loadingCreate } = useCreateColor(resultCreate, showError);
  const { updateColor, loadingUpdate } = useUpdateColor(resultUpdate, showError);

  /** Fin de Hooks para manejo de consultas */

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
   * @description ejecuta la mutation para actualizar un color
   */
  const editColor = () => {
    const values = form.getFieldsValue();
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
      if (!isNew) {
        updateColor({
          variables: {
            input: values,
            id: current?._id,
          },
        });
      }
    }
  };

  /**
   * @description ejecuta la mutation para crear un nuevo color
   */
  const createNewColor = async () => {
    try {
      const values = await form.validateFields();
      delete values.active;
      if (isNew) {
        createColor({
          variables: {
            input: values,
          },
        });
      }
    } catch (e) {}
  };

  return (
    <Modal
      okText="Aceptar"
      cancelText="Cancelar"
      destroyOnClose
      title={isNew ? 'Nuevo' : 'Editar'}
      visible={modalVisible}
      onCancel={() => closeAndClear()}
      onOk={() => (isNew ? createNewColor() : editColor())}
    >
      <Form form={form} initialValues={current}>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          label="Color"
          name="name"
          rules={[{ required: true, message: 'Nombre obligatorio', min: 1 }]}
        >
          <Input placeholder="" autoFocus maxLength={45} />
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          label="Nombre interno"
          name="name_internal"
          rules={[{ required: true, message: 'Nombre interno obligatorio', min: 1 }]}
        >
          <Input placeholder="" maxLength={100} />
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          label="Activo"
          name="active"
          valuePropName="checked"
        >
          <Switch />
        </FormItem>
        <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} label="Color" name="html">
          <Input type="Color" />
        </FormItem>
        <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Imagen" name="image">
          <ImageAdmin />
        </FormItem>
        {error && <Alert type="error" message={error} showIcon />}
      </Form>
      <AlertInformation {...alertInformation} onCancel={closeAlertInformation} />
      <AlertLoading visible={loadingCreate || loadingUpdate} message="Guardando Color" />
    </Modal>
  );
};

export default CreateColors;
